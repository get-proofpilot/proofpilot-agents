# WebsitePilot Workspaces

Durable source snapshots for WebsitePilot runs that should travel with
the `proofpilot-agents` repo.

## Lanes

- `codex/<client-slug>/` stores Codex-authored WebsitePilot runs.
- `claude/<client-slug>/` stores Claude Code / Gemini-authored WebsitePilot runs.

These lane names are internal only. Public demo URLs should always use
clean client slugs, such as `https://demo.proofpilotapps.com/richardson-pest/`.

## What To Commit

- `artifacts/` research, strategy, design spec, and QA notes.
- `demo/` source code, package files, and public assets.
- `qa-screenshots/` visual verification output.

Do not commit `node_modules/`, `dist/`, `.env`, or temporary server/cache
files.
