# dsh-prompt-optimizer

DeepSeek Harness (DSH) 提示词优化插件 — 通过 LLM 优化提示词，使其更清晰、更具体、更可执行。

安装：
```sh
dsh plugin --profile web add dsh-prompt-optimizer
```

## 功能

- **`/optimize` 命令** — 在 DSH 对话中输入 `/optimize 你的提示词` 即可获取优化版本
- **`optimize_prompt` MCP 工具** — AI 代理自动调用优化提示词
- **自动优化模式** — 每次发送消息前自动优化提示词
- **可配置** — API Key、Base URL、模型名称均可在设置中配置
- **双语支持** — 设置界面支持中文和英文

## 配置

在 DSH **设置 → 提示词优化** 中配置：
- `apiKey` — LLM 提供商 API Key
- `baseUrl` — API 地址（默认：`https://apihub.agnes-ai.com/v1`）
- `model` — 模型名称（默认：`agnes-2.0-flash`）
- `autoOptimize` — 开关自动优化功能

## 实时预览

设置页面包含实时预览功能 — 输入原始提示词，立即查看优化效果。

## 链接

- **GitHub**: https://github.com/goodie1972/prompt-optimizer
- **Gitee**: https://gitee.com/uprobao/prompt-optimizer
- **PyPI**: https://pypi.org/project/prompt-optimizer-mcp/
- **在线演示**: https://goodie1972.github.io/prompt-optimizer/demo.html

## 许可证

MIT
