# TOOLS — GBPPilot

## Model providers

| Provider  | Model                | Purpose                                 | Env var              |
|-----------|----------------------|-----------------------------------------|----------------------|
| Anthropic | claude-opus-4-20250514 | Strategy document synthesis (adaptive) | `ANTHROPIC_API_KEY` |

## Data / scraping

| Service      | Endpoints used                                | Purpose                        |
|--------------|-----------------------------------------------|--------------------------------|
| Firecrawl    | site scrape (via `agents.auditpilot`)         | Homepage + service page pull   |
| DataForSEO   | Labs `ranked_keywords`, `research_competitors`| Organic footprint + rivals     |
| Local Falcon | MCP (optional, not wired in yet)              | Geo-grid heat maps             |
| Browser      | Maps / Maps search URL inspection             | Live GBP surface verification  |

## Shared internal modules

| Module                                       | Why we need it              |
|----------------------------------------------|-----------------------------|
| `backend/utils/docx_generator.py`            | Branded `.docx` output       |
| `backend/utils/db.py`                        | Job persistence             |
| `backend/agents/auditpilot/data_collector.py`| Firecrawl scrape helper     |
| `backend/utils/dataforseo.py`                | Ranked keywords + competitors|

## Agent-specific storage

None required. State is transient per request — the branded docx lands
in Railway volume via the shared job persistence layer.

## Config / feature flags

No flags today. Live-evidence failures are non-fatal — they are
captured in `evidence.warnings` and the strategy still ships.
