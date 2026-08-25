<p align="center">
  <h1 align="center">🔮 Prompt Optimizer</h1>
  <p align="center">ZCode 提示词优化插件 — 让 AI 帮你写出更好的提示词</p>
  <p align="center"><i>A ZCode plugin that refines your prompts using AI — clearer, more specific, more actionable.</i></p>
</p>

<p align="center">
  <a href="https://pypi.org/project/prompt-optimizer-mcp/"><img src="https://img.shields.io/pypi/v/prompt-optimizer-mcp?label=PyPI" alt="PyPI"></a>
  <a href="https://github.com/goodie1972/prompt-optimizer"><img src="https://img.shields.io/github/v/release/goodie1972/prompt-optimizer" alt="GitHub"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/goodie1972/prompt-optimizer" alt="License"></a>
</p>

---

## ✨ 功能 / Features

| 中文 | English |
|------|---------|
| 输入原始提示词，AI 自动优化 | Feed in a raw prompt, get an AI-polished version |
| 支持 `/optimize` 命令 | `/optimize` slash command |
| 支持 `optimize_prompt` MCP 工具 | `optimize_prompt` MCP tool for AI auto-invocation |
| 自动读取 ZCode 当前激活的模型配置 | Auto-detects your active model in ZCode |
| 支持 10+ 模型服务商 | 10+ provider support (OpenAI, DeepSeek, Agnes, etc.) |

---

## 🚀 快速开始 / Quick Start

### 安装 / Install

**方法一：通过 ZCode 插件市场（推荐）**

在 ZCode 中打开 **Settings → Plugin Management → Discover**，点击 **** 按钮，输入：



ZCode 会自动扫描仓库并安装插件。

**方法二：pip 安装**

```bash
pip install prompt-optimizer-mcp
```

然后在 ZCode 的 **Settings → MCP** 中添加服务器：

```json
{
  "mcpServers": {
    "prompt-optimizer": {
      "command": "prompt-optimizer-mcp",
      "env": {}
    }
  }
}
```

**方法二：ZCode 插件安装**

1. 将本项目克隆或下载到本地：

```bash
git clone https://github.com/goodie1972/prompt-optimizer.git
```

2. 将 `prompt-optimizer` 目录下的内容放入 ZCode 插件目录：

```
~/.zcode/cli/plugins/custom/prompt-optimizer/
```

3. 在 ZCode 中启用：**Settings → Plugin Management → Installed → prompt-optimizer → Enable**

### 配置 API Key / Configure API Key

在 `~/.zcode/mcp/prompt-optimizer/.env` 中创建并写入：

```env
# 直接指定
OPTIMIZE_API_KEY=sk-your-key
OPTIMIZE_BASE_URL=https://api.openai.com/v1
OPTIMIZE_MODEL=gpt-4o

# 或者使用已有服务商的环境变量（自动识别）
# AGNES_API_KEY=...
# DEEPSEEK_API_KEY=...
# OPENAI_API_KEY=...
```

> **提示：** 如果 `.env` 未配置，插件会自动读取 ZCode 当前激活的模型配置（`.aiagent.json` 中的 active provider）。

### 使用 / Usage

```
# 在 ZCode 对话中输入：
/optimize 写一个Python脚本读取CSV文件

# 或者自然对话方式：
帮我优化一下这个提示词：写一个Python脚本读取CSV文件
```

---

## 📖 详细说明 / Details

### 工作原理 / How It Works

1. 用户输入原始提示词
2. 插件通过 OpenAI 兼容协议调用 LLM
3. LLM 对提示词进行优化：更清晰、更具体、更可执行
4. 返回优化后的提示词

### 配置优先级 / Config Priority

```
OPTIMIZE_* 环境变量 (.env)  >  ZCode 激活模型配置 (.aiagent.json)  >  默认值 (Agnes)
```

### 支持的模型服务商 / Supported Providers

Agnes · DeepSeek · OpenAI · DashScope · SenseNova · SiliconFlow · Zhipu · Moonshot · Gemini · NVIDIA · Anthropic

---

## 📦 项目结构 / Project Structure

```
prompt-optimizer/
├── .zcode-plugin/          # ZCode 插件清单
├── commands/               # /optimize 命令定义
│   └── optimize.md
├── mcp/                    # MCP 服务器脚本
│   └── server.py
├── skills/                 # 技能定义
│   └── prompt-optimizer/
│       └── SKILL.md
├── pypi/                   # PyPI 包源码
│   └── package/
│       ├── pyproject.toml
│       └── src/prompt_optimizer_mcp/
│           ├── __init__.py
│           ├── cli.py
│           └── server.py
├── .env.example            # 环境变量模板
└── README.md
```

---

## 📋 更新日志 / Changelog

### v1.1.1
- 文档优化为中英文双语，添加 badges 和链接
- Documentation optimized to bilingual with badges and links

### v1.1.0
- 兼容 mcp 2.0.0（`FastMCP` → `MCPServer`）
- Compatible with mcp 2.0.0 (`FastMCP` → `MCPServer`)

### v1.0.0
- 初始发布 / Initial release

---

## 🔗 链接 / Links

- **GitHub:** https://github.com/goodie1972/prompt-optimizer
- **PyPI:** https://pypi.org/project/prompt-optimizer-mcp/
- **Issues:** https://github.com/goodie1972/prompt-optimizer/issues

---

## 📄 许可证 / License

MIT © goodie1972