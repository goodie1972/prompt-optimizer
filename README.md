# 🔮 Prompt Optimizer

A plugin for AI-assisted development tools that provides:
- `/optimize` command
- `optimize_prompt` MCP tool
- Skill definition

Refines your prompts to be clearer, more specific, and more actionable.

## Supported Tools

| Tool | Plugin Directory | Configuration |
|------|------------------|---------------|
| **ZCode** | `~/.zcode/cli/plugins/custom/prompt-optimizer/` | Settings → Plugin Management → Discover → Add repo URL |
| **Claude Code** | `~/.claude/plugins/prompt-optimizer/` | `claude plugins install` or manual copy |
| **Codex CLI** | `~/.codex/plugins/prompt-optimizer/` | `codex plugin install` or manual copy |
| **Reasonix** | `~/.reasonix/skills/prompt-optimizer/` | Automatic skill discovery |
| **DSH** | `tools/dsh/npm/` (npm package, dsh-market ready) | `dsh plugin --profile web add dsh-prompt-optimizer` |
| **MimoCode** | `~/.mimocode/plugins/prompt-optimizer/` | Settings → Plugins |
| **OpenCode** | `~/.opencode/mcp-servers/prompt-optimizer/` | MCP server configuration |

## Installation

### Option 1: GitHub (International Users)
```bash
git clone https://github.com/goodie1972/prompt-optimizer.git
```

### Option 2: Gitee (China Mainland, Accelerated)
```bash
git clone https://gitee.com/uprobao/prompt-optimizer.git
```

### Option 3: PyPI Package
```bash
pip install prompt-optimizer-mcp
```

## Tool-Specific Installation

### 🎯 ZCode
1. Copy the entire `prompt-optimizer` folder to:
   ```
   ~/.zcode/cli/plugins/custom/prompt-optimizer/
   ```
2. In ZCode, go to **Settings → Plugin Management → Discover** → Click `⊕` → Enter the repo URL:
   - GitHub: `https://github.com/goodie1972/prompt-optimizer`
   - Gitee: `https://gitee.com/uprobao/prompt-optimizer`
3. Enable the plugin.
4. Configure your API key in `~/.zcode/mcp/prompt-optimizer/.env`.

### 🎯 Claude Code
1. Copy the entire `prompt-optimizer` folder to:
   ```
   ~/.claude/plugins/prompt-optimizer/
   ```
2. Restart Claude Code or run:
   ```bash
   claude plugins install
   ```
3. The `/optimize` command and `optimize_prompt` MCP tool will be available.

### 🎯 Codex CLI
1. Copy the entire `prompt-optimizer` folder to:
   ```
   ~/.codex/plugins/prompt-optimizer/
   ```
2. Restart Codex or run:
   ```bash
   codex plugin install
   ```
3. The `/optimize` command and `optimize_prompt` MCP tool will be available.

### 🎯 Reasonix
1. Copy the `skills/prompt-optimizer` folder to:
   ```
   ~/.reasonix/skills/prompt-optimizer/
   ```
2. Restart Reasonix. The skill will be auto-discovered.
3. Use the `optimize_prompt` skill in your workflows.

### 🎯 DSH
1. Install via npm (recommended — appears in dsh-market):
   ```bash
   dsh plugin --profile web add dsh-prompt-optimizer
   ```
2. Or install from the repo:
   ```bash
   cd tools/dsh/npm
   npm install
   dsh plugin --profile web add .
   ```
3. The `/optimize` command, `optimize_prompt` MCP tool, and Settings page (Settings → Prompt Optimizer) will be available.

> **dsh-market submission**: The DSH npm package is ready to be submitted to [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) via PR. See `tools/dsh/awesome-dsh-plugin-entry.yml` for the registry entry.

### 🎯 MimoCode
1. Copy the entire `prompt-optimizer` folder to:
   ```
   ~/.mimocode/plugins/prompt-optimizer/
   ```
2. In MimoCode Settings → Plugins, enable the plugin.
3. The `/optimize` command and `optimize_prompt` MCP tool will be available.

### 🎯 OpenCode
1. Copy the `mcp/server.py` file to:
   ```
   ~/.opencode/mcp-servers/prompt-optimizer/server.py
   ```
2. Create a config file:
   ```json
   {
     "mcpServers": {
       "prompt-optimizer": {
         "command": "python",
         "args": ["~/.opencode/mcp-servers/prompt-optimizer/server.py"],
         "env": {}
       }
     }
   }
   ```
3. Restart OpenCode. The `optimize_prompt` MCP tool will be available.

## Configuration

For all tools that use the MCP server:
```
~/.zcode/mcp/prompt-optimizer/.env
```
or environment variables:
- `OPTIMIZE_API_KEY` + `OPTIMIZE_BASE_URL` + `OPTIMIZE_MODEL`
- Or any known provider key (e.g., `OPENAI_API_KEY`, `DEEPSEEK_API_KEY`, `AGNES_API_KEY`)

## Usage

### As a Command
In any supported tool's chat interface:
```
/optimize Your raw prompt here
```

### As an MCP Tool
In your tool's AI workflow, call:
```python
optimize_prompt(prompt="Your raw prompt here")
```

## Changelog

### v1.2.0
- Added multi-tool support: ZCode, Claude Code, Codex CLI, Reasonix, DSH, MimoCode, OpenCode
- DSH npm package with dsh-market registry ready
- Updated documentation with tool-specific installation guides
- Added Gitee mirror for China mainland users

### v1.1.1
- Documentation updated to bilingual (Chinese/English)

### v1.1.0
- Compatible with mcp 2.0.0 (`FastMCP` → `MCPServer`)

### v1.0.0
- Initial release

## Links

- **GitHub**: https://github.com/goodie1972/prompt-optimizer
- **Gitee**: https://gitee.com/uprobao/prompt-optimizer
- **PyPI**: https://pypi.org/project/prompt-optimizer-mcp/
- **Live Demo**: https://goodie1972.github.io/prompt-optimizer/demo.html
- **Issues**: https://github.com/goodie1972/prompt-optimizer/issues

## License

MIT © goodie1972
