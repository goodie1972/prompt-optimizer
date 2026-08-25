# dsh-prompt-optimizer

Prompt optimizer for DeepSeek Harness (DSH) — `/optimize` command and `optimize_prompt` tool powered by LLM.

Install:
```sh
dsh plugin --profile web add dsh-prompt-optimizer
```

## Features

- **`/optimize` command** — Type `/optimize your prompt` in DSH chat to get an optimized version
- **`optimize_prompt` MCP tool** — AI agent calls it automatically to refine prompts
- **Auto-optimize mode** — Every outgoing prompt is optimized before the model sees it
- **Configurable** — API key, base URL, model name all settable from Settings → Prompt Optimizer
- **Bilingual** — Settings UI supports Chinese and English

## Configuration

Go to **Settings → Prompt Optimizer** in DSH to configure:
- `apiKey` — Your LLM provider API key
- `baseUrl` — API endpoint (default: `https://apihub.agnes-ai.com/v1`)
- `model` — Model name (default: `agnes-2.0-flash`)
- `autoOptimize` — Toggle automatic prompt optimization

## Live Preview

The settings page includes a live preview — type a raw prompt and see the optimized result instantly.

## Links

- **GitHub**: https://github.com/goodie1972/prompt-optimizer
- **Gitee**: https://gitee.com/uprobao/prompt-optimizer
- **PyPI**: https://pypi.org/project/prompt-optimizer-mcp/
- **Live Demo**: https://goodie1972.github.io/prompt-optimizer/demo.html

## License

MIT
