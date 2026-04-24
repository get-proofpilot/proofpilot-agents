# WebsitePilot

ProofPilot's combined website sales agent. Takes one lead from
discovery to close-ready proof by shipping a bundle: sales audit +
strategy blueprint + live demo homepage + close pitch.

See `ARCHITECTURE.md` for the pipeline diagram, `skill/SKILL.md` for
the full operating doctrine, and `templates/README.md` for the
style-family design library.

## Quick run

```bash
curl -N -X POST https://proofpilot-agents.up.railway.app/api/agents/website/run \
  -H "content-type: application/json" \
  -d '{
    "company_name": "All Thingz Electric",
    "domain": "allthingzelectric.com",
    "service": "electrician",
    "location": "Chandler, AZ",
    "competitor_domains": "competitor1.com, competitor2.com",
    "primary_cta": "Request Estimate",
    "lead_value": "$45,000/mo",
    "tier": "full"
  }'
```

## Pick templates without running the full pipeline

```bash
curl -X POST https://proofpilot-agents.up.railway.app/api/agents/website/templates/select \
  -H "content-type: application/json" \
  -d '{
    "page_type": "homepage",
    "service": "restoration",
    "keyword": "water damage restoration phoenix",
    "notes": "Need warmth, trust, grounded craftsmanship."
  }'
```

## Files

- `engine.py` — 7-stage pipeline
- `bundle.py` — tier shaping + handoff block
- `schemas.py` — Pydantic I/O
- `prompts/` — system prompts (3)
- `templates/` — 14-profile design library + selector + sync script
  - `registry.json` — template profiles
  - `sources/` — curated source-code mirrors (6 archetypes)
- `visual_qa.py` — Playwright + Claude vision compare loop
- `skill/` — full operating doctrine (SKILL.md + references + related)
- `tests/` — pytest smoke tests
