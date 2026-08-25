# Prompt Optimizer 插件 / Plugin v1.1.0

> **作者 / Author:** goodie1972
> **GitHub:** https://github.com/goodie1972/prompt-optimizer
> **PyPI:** https://pypi.org/project/prompt-optimizer-mcp/1.1.0/

---

## 简介 / Introduction

**中文：** ZCode 提示词优化插件，提供 `/optimize` 命令和 `optimize_prompt` MCP 工具，让 AI 在对话中自动优化提示词，使其更清晰、更具体、更可执行。

**English:** A ZCode prompt optimizer plugin that provides the `/optimize` command and `optimize_prompt` MCP tool. It leverages AI to automatically refine prompts during conversations, making them clearer, more specific, and more actionable.

---

## 安装 / Installation

### 中文

将整个 `prompt-optimizer` 文件夹复制到：

```
~/.zcode/cli/plugins/custom/prompt-optimizer/
```

在 ZCode 中启用：**Settings → Plugin Management → Installed → prompt-optimizer → Enable**

### English

Copy the entire `prompt-optimizer` folder to:

```
~/.zcode/cli/plugins/custom/prompt-optimizer/
```

Enable it in ZCode: **Settings → Plugin Management → Installed → prompt-optimizer → Enable**

---

## 配置 / Configuration

### 中文

在 `~/.zcode/mcp/prompt-optimizer/.env` 中设置 API Key（参考 `.env.example`）。

支持的服务商：Agnes、DeepSeek、OpenAI、DashScope、SenseNova、SiliconFlow、Zhipu、Moonshot、Gemini、NVIDIA、Anthropic 等。

### English

Set your API Key in `~/.zcode/mcp/prompt-optimizer/.env` (see `.env.example` for reference).

Supported providers: Agnes, DeepSeek, OpenAI, DashScope, SenseNova, SiliconFlow, Zhipu, Moonshot, Gemini, NVIDIA, Anthropic, and more.

---

## 使用 / Usage

### 中文

- **命令行：** `/optimize 你的提示词`
- **自然对话：** `帮我优化一下这个提示词：xxx`
- **MCP 工具：** AI 在对话中自动调用 `optimize_prompt` 工具

### English

- **Command:** `/optimize your prompt`
- **Natural conversation:** `Please optimize this prompt: xxx`
- **MCP tool:** The AI automatically invokes the `optimize_prompt` tool during conversations

---

## 组件 / Components

| 组件 / Component | 类型 / Type | 说明 / Description |
|---|---|---|
| `optimize` | Command | `/optimize` 命令 / Command |
| `optimize_prompt` | MCP Tool | 通过 LLM 优化提示词 / Optimize prompts via LLM |
| `prompt-optimizer` | Skill | 触发场景说明 / Trigger scenario description |

---

## 更新日志 / Changelog

### v1.1.1
- **中文：** 文档更新为双语（中英文）；添加 GitHub 和 PyPI 链接
- **English:** Documentation updated to bilingual (Chinese/English); added GitHub and PyPI links

### v1.1.0
- **中文：** 兼容 mcp 2.0.0（`FastMCP` → `MCPServer`）；依赖更新：`mcp>=2.0.0`
- **English:** Compatible with mcp 2.0.0 (`FastMCP` → `MCPServer`); dependency updated: `mcp>=2.0.0`

### v1.0.0
- **中文：** 初始发布
- **English:** Initial release

---

## 链接 / Links

- **GitHub 仓库 / Repository:** https://github.com/goodie1972/prompt-optimizer
- **PyPI 包 / Package:** https://pypi.org/project/prompt-optimizer-mcp/1.1.0/
- **问题反馈 / Issues:** https://github.com/goodie1972/prompt-optimizer/issues