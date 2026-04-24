# StrategyPilot

SEO strategy document agent. Produces a 13-section roadmap document
covering footprint, competitive landscape, page systems, site
architecture, 90-day rollout, and ROI model.

## Endpoint

`POST /api/agents/strategy` → SSE stream + `.docx` export

## Inputs

| Field | Required | Description |
|---|---|---|
| `domain` | yes | Client site |
| `service` | yes | Service vertical |
| `location` | yes | City, State |
| `competitors` | no | Comma-separated competitor domains |
| `notes` | no | Additional context |

## Stages

1. Audit handoff review (research ledger, ranking tables, page inventory, competitor notes)
2. Footprint (site classification + page inventory)
3. Competitive (SERP patterns + competitor page systems + gaps)
4. Page Systems (12-category taxonomy, prioritized)
5. ROI (3-scenario funnel model)
6. Synthesis (13-section markdown document)

StrategyPilot turns evidence into a page system. It should not invent pages from
a generic checklist; recommendations must trace to audit evidence, SERP patterns,
competitor page systems, or clearly labeled assumptions.

## Local Helper

```bash
python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py --help
```
