# Prompt Optimizer 插件

ZCode 提示词优化插件。提供 `/optimize` 命令和 `optimize_prompt` MCP 工具，让 AI 在对话中自动优化提示词。

## 安装

将整个 `prompt-optimizer` 文件夹复制到：

```
~/.zcode/cli/plugins/custom/prompt-optimizer/
```

在 ZCode 中启用：**Settings → Plugin Management → Installed → prompt-optimizer → Enable**

## 配置

在 `~/.zcode/mcp/prompt-optimizer/.env` 中设置 API Key（参考 `.env.example`）。

## 使用

- **命令行**：`/optimize 你的提示词`
- **自然对话**：`帮我优化一下这个提示词：xxx`

## 包含组件

| 组件 | 类型 | 说明 |
|---|---|---|
| `optimize` | Command | `/optimize` 命令 |
| `optimize_prompt` | MCP Tool | 通过 LLM 优化提示词 |
| `prompt-optimizer` | Skill | 触发场景说明 |

## 作者

goodie1972