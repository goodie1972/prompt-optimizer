# prompt-optimizer-mcp v1.2.1

> **作者 / Author:** goodie1972
> **GitHub:** https://github.com/goodie1972/prompt-optimizer
> **PyPI:** https://pypi.org/project/prompt-optimizer-mcp/1.1.1/

---

## 简介 / Introduction

**中文：** 一个 ZCode 提示词优化 MCP 工具包，提供 `optimize_prompt` MCP 工具和 `/optimize` 命令，通过 LLM 优化提示词，使其更清晰、更具体、更可执行。

**English:** A ZCode prompt optimizer MCP package that provides the `optimize_prompt` MCP tool and `/optimize` command. It uses LLM to refine prompts, making them clearer, more specific, and more actionable.

---

## 安装 / Installation

### 中文

```bash
pip install prompt-optimizer-mcp
```

### English

```bash
pip install prompt-optimizer-mcp
```

---

## 在 ZCode 中使用 / Usage in ZCode

### 中文

安装后在 ZCode 的 MCP 配置中添加：

### English

After installation, add the following to your ZCode MCP configuration:

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

---

## 配置 / Configuration

### 中文

在 `~/.zcode/mcp/prompt-optimizer/.env` 中设置 API Key：

```env
OPTIMIZE_API_KEY=你的key
OPTIMIZE_BASE_URL=https://你的地址/v1
OPTIMIZE_MODEL=模型名
```

或直接设置环境变量：

```env
AGNES_API_KEY=...
# 或 / or
OPENAI_API_KEY=...
```

### English

Set your API Key in `~/.zcode/mcp/prompt-optimizer/.env`:

```env
OPTIMIZE_API_KEY=your-api-key
OPTIMIZE_BASE_URL=https://your-endpoint/v1
OPTIMIZE_MODEL=model-name
```

Or set environment variables directly:

```env
AGNES_API_KEY=...
# or
OPENAI_API_KEY=...
```

---

## 使用 / Usage

### 中文

**作为 MCP 工具：** AI 在对话中自动调用 `optimize_prompt` 工具：

```python
optimize_prompt(prompt="写一个Python脚本读取CSV")
# 返回：写一个Python脚本，读取指定路径的CSV文件...
```

**作为命令行工具：** 启动 MCP 服务器：

```bash
prompt-optimizer-mcp
```

### English

**As an MCP tool:** The AI automatically invokes the `optimize_prompt` tool during conversations:

```python
optimize_prompt(prompt="Write a Python script to read a CSV file")
# Returns: Write a Python script that reads a CSV file from a specified path...
```

**As a CLI tool:** Start the MCP server:

```bash
prompt-optimizer-mcp
```

---

## 更新日志 / Changelog

### v1.1.1
- **中文：** 文档更新为双语（中英文）；添加 GitHub 和 PyPI 链接
- **English:** Documentation updated to bilingual (Chinese/English); added GitHub and PyPI links

### v1.2.0
- **中文：** 添加多工具支持：ZCode、Claude Code、Codec CLI、Reasonix、DSH、MimoCode、OpenCode
- **English:** Added multi-tool support: ZCode, Claude Code, Codex CLI, Reasonix, DSH, MimoCode, OpenCode
- **中文：** DSH npm 包已准备好提交到 dsh-market
- **English:** DSH npm package ready for dsh-market submission
- **中文：** 更新文档包含多工具安装指南
- **English:** Updated documentation with tool-specific installation guides
- **中文：** 添加 Gitee 中国镜像以加速国内访问
- **English:** Added Gitee mirror for China mainland users

### v1.2.1
- **中文：** 修复递归优化问题：在命令输出中添加标记和说明，防止使用 /optimize 命令时无限循环。
- **English:** Fixed recursive optimization issue: added marker and instruction to prevent infinite loops when using /optimize command repeatedly.
---

## 链接 / Links

- **GitHub 仓库 / Repository:** https://github.com/goodie1972/prompt-optimizer
- **PyPI 包 / Package:** https://pypi.org/project/prompt-optimizer-mcp/1.2.1/
- **问题反馈 / Issues:** https://github.com/goodie1972/prompt-optimizer/issues

---

## 许可证 / License

MIT