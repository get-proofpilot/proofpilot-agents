# GBPPilot

ProofPilot's Google Business Profile strategist. Produces a full branded
GBP strategy document covering categories, services, products, reviews,
posts, NAP, geo-relevance, and a website mirroring roadmap.

See `skill/SKILL.md` for the full operating doctrine and
`prompts/gbp_system.md` for the distilled Claude system prompt.

## Quick run

```bash
curl -N -X POST https://proofpilot-agents.up.railway.app/api/agents/gbp/run \
  -H "content-type: application/json" \
  -d '{
    "client_name": "All Thingz Electric",
    "domain": "allthingzelectric.com",
    "business_name": "All Thingz Electric",
    "primary_city": "Chandler, AZ",
    "core_services": "panel upgrades, EV chargers, residential rewires",
    "competitors": "competitor1.com, competitor2.com"
  }'
```

## Files

- `manifest.py` — agent metadata
- `engine.py` — orchestrator + light evidence collector
- `schemas.py` — Pydantic I/O
- `prompts/gbp_system.md` — engine system prompt
- `skill/SKILL.md` + `skill/references/` — full doctrine (source of truth)
- `router.py` — FastAPI routes
- `tests/` — smoke tests
