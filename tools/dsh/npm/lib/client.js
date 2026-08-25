window.__ModuleLoader__.load({
  id: "dsh-prompt-optimizer",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    var React = require("react");

    var CSS_ID = "dsh-prompt-optimizer/styles";
    if (typeof document !== "undefined" && !document.querySelector('style[data-plugin-css="' + CSS_ID + '"]')) {
      var tag = document.createElement("style");
      tag.dataset.plugin = "dsh-prompt-optimizer";
      tag.dataset.pluginCss = CSS_ID;
      tag.textContent = [
        ".dshpo { display: flex; flex-direction: column; gap: 14px; width: 100%; max-width: 760px; }",
        ".dshpo-field { display: flex; flex-direction: column; gap: 4px; }",
        ".dshpo-field-label { font-size: 12px; font-weight: 600; color: var(--dsw-alias-label-secondary, #646a73); }",
        ".dshpo-input { padding: 8px 10px; border: 1px solid var(--dsw-alias-divider, rgba(128,128,128,.25)); border-radius: 6px; font: inherit; font-size: 13px; background: transparent; color: var(--dsw-alias-label-primary, #1f2329); }",
        ".dshpo-textarea { min-height: 80px; resize: vertical; }",
        ".dshpo-btn { padding: 6px 14px; border: none; border-radius: 6px; font: inherit; font-size: 12px; font-weight: 600; cursor: pointer; background: rgba(98,115,255,.15); color: #6273ff; }",
        ".dshpo-result { padding: 12px; border: 1px solid rgba(128,128,128,.25); border-radius: 8px; font-size: 13px; line-height: 1.5; background: rgba(0,0,0,.15); white-space: pre-wrap; max-height: 240px; overflow-y: auto; }",
        ".dshpo-switch-row { display: flex; align-items: center; gap: 8px; font-size: 13px; }"
      ].join("\n");
      document.head.appendChild(tag);
    }

    var NS = "dsh-prompt-optimizer";
    var zh = { nav: "提示词优化", desc: "通过 LLM 优化提示词，使其更清晰、更具体、更可执行。", apiKey: "API Key", baseUrl: "Base URL", model: "模型", autoOptimize: "自动优化", autoOptimizeHelp: "每次发送前自动优化", previewTitle: "预览：输入原始提示词，查看优化效果", rawPrompt: "原始提示词", optimize: "✨ 优化", optimized: "优化后" };
    var en = { nav: "Prompt Optimizer", desc: "Optimize prompts via LLM to make them clearer, more specific, more actionable.", apiKey: "API Key", baseUrl: "Base URL", model: "Model", autoOptimize: "Auto-optimize", autoOptimizeHelp: "Auto-optimize every outgoing prompt", previewTitle: "Preview: type a raw prompt and see the optimized result", rawPrompt: "Raw prompt", optimize: "✨ Optimize", optimized: "Optimized" };

    var inject = ["slots", "locale", "settings"];

    function apply(ctx) {
      var t = ctx.locale.bind(NS);
      ctx.effect(function () { ctx.locale.register(NS, { zh: zh, en: en }); }, "dsh-prompt-optimizer: i18n");

      ctx.slots.inject("settings.section", function () {
        return ctx.slots.register({
          name: "settings.section",
          id: "prompt-optimizer-settings",
          order: 10,
          label: function () { return t("nav"); },
          locale: NS,
          inject: function () { return { t: t }; }
        }, PromptOptimizerSection);
      });
    }

    function PromptOptimizerSection(props) {
      var t = props.t;
      var keyState = React.useState("");
      var key = keyState[0]; var setKey = keyState[1];
      var urlState = React.useState("https://apihub.agnes-ai.com/v1");
      var url = urlState[0]; var setUrl = urlState[1];
      var modelState = React.useState("agnes-2.0-flash");
      var model = modelState[0]; var setModel = modelState[1];
      var autoOptState = React.useState(false);
      var autoOpt = autoOptState[0]; var setAutoOpt = autoOptState[1];
      var rawState = React.useState("");
      var raw = rawState[0]; var setRaw = rawState[1];
      var resultState = React.useState("");
      var result = resultState[0]; var setResult = resultState[1];
      var loadingState = React.useState(false);
      var loading = loadingState[0]; var setLoading = loadingState[1];

      React.useEffect(function () {
        fetch("/settings/prompt-optimizer").then(function (r) { return r.json(); }).then(function (s) {
          if (s && s.apiKey) setKey(s.apiKey);
          if (s && s.baseUrl) setUrl(s.baseUrl);
          if (s && s.model) setModel(s.model);
          if (typeof s.autoOptimize === "boolean") setAutoOpt(s.autoOptimize);
        }).catch(function () {});
      }, []);

      function saveSetting(field, value) {
        fetch("/settings/prompt-optimizer", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ field: field, value: value })
        }).catch(function () {});
      }

      async function handleOptimize() {
        if (!raw.trim()) return;
        setLoading(true); setResult("");
        try {
          var resp = await fetch("/dsh-prompt-optimizer/optimize", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: raw.trim() })
          });
          var data = await resp.json();
          setResult(data.result || "");
        } catch (e) { setResult("Error: " + e.message); }
        setLoading(false);
      }

      return React.createElement("div", { className: "dshpo" },
        React.createElement("div", { style: { fontSize: "13px", color: "var(--dsw-alias-label-secondary, #646a73)", lineHeight: "1.5" } }, t("desc")),
        React.createElement("div", { className: "dshpo-field" },
          React.createElement("label", { className: "dshpo-field-label" }, t("apiKey")),
          React.createElement("input", { type: "password", className: "dshpo-input", value: key, onChange: function (e) { setKey(e.target.value); saveSetting("apiKey", e.target.value); } })),
        React.createElement("div", { className: "dshpo-field" },
          React.createElement("label", { className: "dshpo-field-label" }, t("baseUrl")),
          React.createElement("input", { className: "dshpo-input", value: url, onChange: function (e) { setUrl(e.target.value); saveSetting("baseUrl", e.target.value); } })),
        React.createElement("div", { className: "dshpo-field" },
          React.createElement("label", { className: "dshpo-field-label" }, t("model")),
          React.createElement("input", { className: "dshpo-input", value: model, onChange: function (e) { setModel(e.target.value); saveSetting("model", e.target.value); } })),
        React.createElement("div", { className: "dshpo-switch-row" },
          React.createElement("input", { type: "checkbox", checked: autoOpt, onChange: function (e) { setAutoOpt(e.target.checked); saveSetting("autoOptimize", e.target.checked); } }),
          React.createElement("span", null, t("autoOptimize")),
          React.createElement("span", { style: { fontSize: "11px", color: "var(--dsw-alias-label-tertiary, #646a73)" } }, t("autoOptimizeHelp"))),
        React.createElement("div", null,
          React.createElement("div", { style: { fontWeight: "600", fontSize: "13px", marginBottom: "8px" } }, t("previewTitle")),
          React.createElement("textarea", { className: "dshpo-input dshpo-textarea", value: raw, onChange: function (e) { setRaw(e.target.value); }, style: { marginBottom: "8px" } }),
          React.createElement("div", { style: { marginBottom: "10px" } },
            React.createElement("button", { className: "dshpo-btn", disabled: loading || !raw.trim(), onClick: handleOptimize }, (loading ? "Loading..." : "") + t("optimize"))),
          result ? React.createElement("div", { className: "dshpo-result" },
            React.createElement("div", { style: { fontSize: "11px", fontWeight: "600", color: "var(--dsw-alias-label-secondary, #646a73)", marginBottom: "4px" } }, t("optimized")),
            React.createElement("div", null, result)) : null)
      );
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  }
});
