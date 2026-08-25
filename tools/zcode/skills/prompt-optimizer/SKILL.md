# Prompt Optimizer

优化用户提示词的 ZCode 插件：让 AI 在对话中自动调用 `optimize_prompt` 工具来改写提示词，使其更清晰、更具体、更可执行。

## 触发场景

当用户的请求符合以下模式时，AI 应主动调用 `optimize_prompt` 工具：

- "帮我优化一下这个提示词：xxx"
- "把 xxx 改写得更好"
- "完善这个 prompt：xxx"
- "重写下面的提示：xxx"

## 可用工具

### `optimize_prompt(prompt: str) -> str`

参数：
- `prompt`：待优化的原始提示词文本

返回：
- 优化后的提示词文本

## 使用示例

```
User: 帮我优化一下提示词：写一个Python脚本读取CSV

AI: [调用 optimize_prompt 工具]
    [返回：写一个Python脚本，读取指定路径的CSV文件...]
```

## 配置

本插件依赖 `.env` 文件中的 API Key 配置。在 `~/.zcode/mcp/prompt-optimizer/.env` 中设置：

```env
OPTIMIZE_API_KEY=你的key
OPTIMIZE_BASE_URL=https://api.example.com/v1
OPTIMIZE_MODEL=模型名
```

也支持通过 `AGNES_API_KEY`、`NVIDIA_API_KEY`、`OPENROUTER_API_KEY` 等环境变量自动识别。