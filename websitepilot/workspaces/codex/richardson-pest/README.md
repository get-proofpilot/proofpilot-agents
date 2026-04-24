# Richardson Pest Management

Codex WebsitePilot run for Richardson Pest Management.

## Paths

- Artifacts: `artifacts/`
- Demo app: `demo/`
- QA screenshots: `qa-screenshots/`

## Preferred URL

```text
https://demo.proofpilotapps.com/richardson-pest/
```

The demo source is configured to build under that client slug path. The root demo domain should remain a neutral index/router.

Internal workspace paths may include `codex` to keep this process separate from Claude/Gemini runs, but public client URLs should never expose the agent/process name.

## Run Locally

```bash
cd demo
npm install
npm run dev -- --host 127.0.0.1 --port 5187
```

## Build

```bash
cd demo
npm run build
```
