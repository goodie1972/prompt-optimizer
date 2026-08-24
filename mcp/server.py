"""MCP 服务器：提示词优化工具。

暴露一个 `optimize_prompt` 工具，供 ZCode 的 AI 在对话中自动调用。
读取 .aiagent.json 中当前激活的模型配置来调用 LLM 进行优化。

用法（在 ZCode 中配置 MCP 服务器）：
    command: python
    args: ["mcp_optimize_server.py"]
"""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path
from typing import Any

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("prompt-optimizer")


def _load_dotenv() -> None:
    """加载 .env 文件中的环境变量。

    固定读取 ~/.zcode/mcp/prompt-optimizer/.env（全局唯一配置）。
    """
    candidates = [
        Path.home() / ".zcode" / "mcp" / "prompt-optimizer" / ".env",
    ]
    for path in candidates:
        if path.is_file():
            try:
                for line in path.read_text(encoding="utf-8").splitlines():
                    line = line.strip()
                    if not line or line.startswith("#"):
                        continue
                    if "=" not in line:
                        continue
                    key, _, val = line.partition("=")
                    key = key.strip()
                    val = val.strip().strip("\"'")
                    # 解析 ${VAR_NAME} 引用
                    import re
                    val = re.sub(r"\$\{(\w+)\}", lambda m: os.getenv(m.group(1), m.group(0)), val)
                    if key and not os.getenv(key):
                        os.environ[key] = val
            except OSError:
                pass


def _find_project_root() -> Path:
    """从当前目录向上查找项目根（含 .aiagent.json 或 .git 的目录）。"""
    cwd = Path.cwd().resolve()
    for d in [cwd, *cwd.parents]:
        if (d / ".aiagent.json").is_file() or (d / ".git").is_dir():
            return d
    return cwd


def _load_active_provider() -> dict[str, Any] | None:
    """读取 .aiagent.json 找到当前激活的 provider 配置。"""
    root = _find_project_root()
    cfg_path = root / ".aiagent.json"
    if not cfg_path.is_file():
        return None
    try:
        data = json.loads(cfg_path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return None

    active = data.get("active_model", {})
    pid = active.get("provider_id", "")
    model = active.get("model", "")
    if not pid or not model:
        return None
    for p in data.get("providers", []):
        if p.get("id") == pid:
            return {
                "type": p.get("type", "openai_compat"),
                "base_url": p.get("base_url", ""),
                "api_key_env": p.get("api_key_env", ""),
                "model": model,
            }
    return None


_PROVIDER_ENV_KEYS = {
    "agnes": "AGNES_API_KEY",
    "deepseek": "DEEPSEEK_API_KEY",
    "dashscope": "DASHSCOPE_API_KEY",
    "sensenova": "SENSNOVA_API_KEY",
    "siliconflow": "SILICONFLOW_API_KEY",
    "openai": "OPENAI_API_KEY",
    "zhipu": "ZHIPU_API_KEY",
    "moonshot": "MOONSHOT_API_KEY",
    "gemini": "GOOGLE_API_KEY",
    "nvidia": "NVIDIA_API_KEY",
    "anthropic": "ANTHROPIC_API_KEY",
}


@mcp.tool(
    name="optimize_prompt",
    description="用 AI 优化提示词，使其更清晰、更具体、更可执行。传入原始提示词，返回优化后的版本。",
)
def optimize_prompt(prompt: str) -> str:
    """用当前激活的 LLM 优化提示词。

    Args:
        prompt: 待优化的原始提示词文本

    Returns:
        优化后的提示词文本
    """
    text = prompt.strip()
    if not text:
        return "（提示词为空，无需优化）"

    # 配置优先级：OPTIMIZE_* 环境变量 > .aiagent.json > 已知环境变量兜底
    base_url = os.getenv("OPTIMIZE_BASE_URL", "")
    model = os.getenv("OPTIMIZE_MODEL", "")
    api_key = os.getenv("OPTIMIZE_API_KEY", "")

    if not base_url or not model or not api_key:
        # 从 .aiagent.json 补全缺失项
        provider_cfg = _load_active_provider()
        if provider_cfg:
            if not base_url:
                base_url = provider_cfg.get("base_url", "")
            if not model:
                model = provider_cfg.get("model", "")
            if not api_key:
                env_key = provider_cfg.get("api_key_env", "")
                api_key = os.getenv(env_key, "") if env_key else ""

    if not api_key:
        # 尝试所有已知环境变量
        for key_env in _PROVIDER_ENV_KEYS.values():
            v = os.getenv(key_env, "")
            if v:
                api_key = v
                break

    if not api_key:
        return "错误：未找到 API 密钥。请在 .env 中设置 OPTIMIZE_API_KEY 或取消注释你需要的服务商配置。"

    if not base_url:
        base_url = "https://apihub.agnes-ai.com/v1"
    if not model:
        model = "agnes-2.0-flash"

    # 优化提示
    system_prompt = (
        "你是一个提示词优化专家。请在不改变原始意图和语言的前提下，"
        "把用户的提示词改得更清晰、更具体、更可执行。"
        "只输出优化后的提示词，不要解释，不要添加任何前缀或后缀。"
    )

    # 调 LLM（openai 兼容协议）
    try:
        from openai import OpenAI

        client = OpenAI(api_key=api_key, base_url=base_url)
        resp = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": text},
            ],
            temperature=0.5,
            max_tokens=1024,
        )
        result = resp.choices[0].message.content.strip()
        return result if result else "（优化结果为空）"
    except Exception as e:
        return f"优化失败: {e}"


if __name__ == "__main__":
    _load_dotenv()
    mcp.run(transport="stdio")