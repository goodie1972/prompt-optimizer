var name = "dsh-prompt-optimizer";
var inject = ["typert", "settings", "webServer"];

var PromptOptimizerSettingsSchema = {
  type: "object",
  required: [],
  properties: {
    enabled: { type: "boolean", default: true },
    apiKey: { type: "string" },
    baseUrl: { type: "string", default: "https://apihub.agnes-ai.com/v1" },
    model: { type: "string", default: "agnes-2.0-flash" },
    autoOptimize: { type: "boolean", default: false }
  }
};

var OPTIMIZER_SERVICE_KEY = "promptOptimizer";
var OPTIMIZER_INVOKE = "dsh-prompt-optimizer#" + OPTIMIZER_SERVICE_KEY + "/optimize";

function createOptimizeInvoke(settings) {
  return async function optimizePrompt(prompt) {
    var apiKey = settings && settings.apiKey;
    var baseUrl = (settings && settings.baseUrl) || "https://apihub.agnes-ai.com/v1";
    var model = (settings && settings.model) || "agnes-2.0-flash";

    if (!apiKey) {
      return "API key not configured. Go to Settings to set your API key.";
    }

    var systemPrompt =
      "You are a prompt optimization expert. Without changing the original intent or language, " +
      "rewrite the user's prompt to be clearer, more specific, and more actionable. " +
      "Only output the optimized prompt - no explanations, no prefixes or suffixes.";

    var response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt.trim() }
        ],
        temperature: 0.5,
        max_tokens: 1024
      })
    });

    var data = await response.json();
    var content = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    return content ? content.trim() : "(empty result)";
  };
}

var TYPERT_MANIFEST = {
  package: "dsh-prompt-optimizer",
  face: "host",
  schemas: [],
  model: {
    services: [
      {
        key: OPTIMIZER_SERVICE_KEY,
        exportName: "PromptOptimizer",
        description: "Optimize a raw prompt via LLM to make it clearer, more specific, and more actionable.",
        tags: [],
        members: [
          {
            kind: "method",
            name: "optimize",
            signature: "optimize(prompt: string): Promise<string>"
          }
        ],
        types: []
      }
    ],
    events: [],
    objects: []
  },
  invocations: [
    {
      id: OPTIMIZER_INVOKE,
      service: OPTIMIZER_SERVICE_KEY,
      namespace: OPTIMIZER_SERVICE_KEY,
      method: "optimize",
      invocation: { kind: "direct" },
      parameters: [
        {
          name: "prompt",
          wire: "prompt",
          source: "json",
          codec: { mode: "strict", typeSymbol: "string", schema: { type: "string" } }
        }
      ],
      result: {
        mode: "strict",
        typeSymbol: "dsh-prompt-optimizer#OptimizedPrompt",
        schema: { type: "string" }
      }
    }
  ]
};

function apply(ctx, config) {
  var settings = ctx.settings.register("prompt-optimizer", PromptOptimizerSettingsSchema, { applies: "live" });
  var currentSettings = settings.get();

  ctx.effect(function () {
    var dispose = ctx.typert.register(TYPERT_MANIFEST);
    return function () { void dispose(); };
  }, "dsh-prompt-optimizer: typert manifest");

  ctx.webServer.post("/dsh-prompt-optimizer/optimize", async function (req, res) {
    var body = JSON.parse(req.body);
    try {
      var result = await createOptimizeInvoke(currentSettings)(body.prompt);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ result: result }));
    } catch (e) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: e.message }));
    }
  });

  ctx.on("agent/created", function ({ agent }) {
    agent.ctx.effect(function () {
      var stop = agent.ctx.on("agent/pre-step", async function ({ messages, signal }, next) {
        if (!currentSettings.autoOptimize) {
          return next();
        }
        var userMsgs = messages.filter(function (m) {
          return m.role === "user" || m.source && m.source.kind === "user";
        });
        if (userMsgs.length === 0) return next();

        var lastMsg = userMsgs[userMsgs.length - 1];
        var text = typeof lastMsg.content === "string"
          ? lastMsg.content
          : Array.isArray(lastMsg.content)
            ? lastMsg.content.filter(function (p) { return p.type === "text"; }).map(function (p) { return p.text; }).join("\n")
            : "";
        if (!text || text.length < 10) return next();

        var optimized = await createOptimizeInvoke(currentSettings)(text);
        if (optimized && optimized.indexOf("API key") === 0) return next();

        return next({ messages: messages.map(function (m) {
          if (m === lastMsg && optimized) {
            if (typeof m.content === "string") return { ...m, content: optimized };
            return { ...m, content: [{ type: "text", text: optimized }] };
          }
          return m;
        }) });
      });
      return function () { stop(); };
    }, "dsh-prompt-optimizer: auto-optimize");
  });
}

export {
  apply,
  inject,
  name,
  PromptOptimizerSettingsSchema
};
