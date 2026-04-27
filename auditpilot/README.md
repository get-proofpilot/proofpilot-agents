# AuditPilot

Multi-stage sales audit agent. Crawls a prospect site, pulls DataForSEO
ranking data, runs the 8-dimension Strategic Brain, and synthesizes a
branded Sales Audit v2 document.

## Endpoint

`POST /api/agents/audit` → SSE stream + `.docx` export

## Inputs

| Field | Required | Description |
|---|---|---|
| `domain` | yes | Prospect's domain (e.g., `allthingzelectric.com`) |
| `service` | yes | Service vertical (e.g., `electrician`) |
| `location` | yes | City, State (e.g., `Chandler, AZ`) |
| `monthly_revenue` | no | Adds specificity to ROI section |
| `avg_job_value` | no | Adds specificity to ROI section |
| `notes` | no | Sales context |

## Stages

1. Target confirmation (business, domain, market, services, competitors)
2. Research ledger (Firecrawl inventory, sitemap/robots, schema, proof, conversion, local visibility)
3. Ranking reality check (10 money SERPs, indexed pages, DataForSEO domain intelligence)
4. Competitor and page-system research (20-25 query sweep when Sales Audit v2 depth is needed)
5. Strategic Brain (8 dimensions of invisibility)
6. Synthesis (Sales Audit v2 document)

AuditPilot is research-first. Do not draft the audit until the evidence ledger
can support the pain story, competitor story, and opportunity story.

## Local Helpers

```bash
python3 auditpilot/skill/scripts/firecrawl_agent.py --help
python3 auditpilot/skill/scripts/local_falcon.py --help
python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py --help
```
