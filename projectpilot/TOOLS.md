# TOOLS — ProjectPilot

## Model providers

| Provider  | Model                   | Purpose                | Env var              |
|-----------|-------------------------|------------------------|----------------------|
| Anthropic | claude-sonnet-4-20250514 | Sweep reasoning / findings | `ANTHROPIC_API_KEY` |

Sweeps don't need Opus — Sonnet is faster and the reasoning load is
"read tracker, produce findings", not deep synthesis.

## Data sources

| Source     | How                                | Purpose                          |
|------------|------------------------------------|----------------------------------|
| Vault YAML | `backend/vault_data/_clients-index.yaml` | Client roster + cadences  |
| ClickUp    | `backend/clickup_sync.py`          | Task status + progress per client|
| Slack      | (prompt-driven)                    | Approval truth                   |
| Maps       | (prompt-driven, browser-style)     | Publication truth                |

## Shared internal modules

| Module                          | Why                                 |
|---------------------------------|-------------------------------------|
| `backend/clickup_sync.py`       | Pull task progress per client       |
| `backend/utils/db.py`           | Job persistence (SSE → job row)     |

## Agent-specific storage

- `$DOCS_DIR/projectpilot/state.json` — persistent tracker across runs.
  Railway volume persists this.

## Config / feature flags

None. Sweep cadences (Mon/Wed/Fri AZ, etc.) are operator-driven —
ProjectPilot itself is on-demand per HTTP request. Use
`backend/scheduler/` to schedule recurring sweeps.
