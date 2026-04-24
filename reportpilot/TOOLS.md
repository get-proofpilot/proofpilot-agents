# TOOLS — ReportPilot

## Model providers

| Provider  | Model                   | Purpose               | Env var              |
|-----------|-------------------------|-----------------------|----------------------|
| Anthropic | claude-opus-4-20250514  | Draft synthesis       | `ANTHROPIC_API_KEY`  |
| Anthropic | claude-sonnet-4-20250514 | 5-gate QA verdict    | `ANTHROPIC_API_KEY`  |

## Data sources

| Source        | How                                        | Status      |
|---------------|--------------------------------------------|-------------|
| GSC           | (stubbed pending OAuth wire-up)            | Not wired   |
| GA4           | (stubbed pending OAuth wire-up)            | Not wired   |
| DataForSEO    | `utils.dataforseo.get_domain_rank_overview` + `ranked_keywords` + `backlink_summary` | Wired |
| ClickUp       | `clickup_sync.get_client_progress`         | Wired       |
| Vault YAML    | `backend/vault_data/_clients-index.yaml` + per-client `context.md`, `recurring.yaml`, `roadmap.yaml` | Wired |
| Local Falcon  | (future) geo-grid context                   | Not wired   |

## Shared internal modules

| Module                          | Why                              |
|---------------------------------|----------------------------------|
| `backend/utils/dataforseo.py`   | Organic + backlink data           |
| `backend/utils/docx_generator.py` | Branded `.docx` output         |
| `backend/clickup_sync.py`       | ClickUp progress per client      |
| `backend/utils/db.py`           | Job persistence                  |

## Agent-specific storage

None. Report output lands in the standard `jobs` table via the shared
SSE → docx pipeline. Raw source pulls are not cached — every run hits
live data so the report reflects the current moment.

## Config / feature flags

- `REPORTPILOT_DISABLE_QA` (future): run draft-only for speed during
  internal testing. Never ship this flag to production.
