# WebsitePilot examples

## Sample requests (copy / adapt)

- `sample_request.json` — full-tier run with explicit template
  override, all stages on. Good for integration-testing the full
  pipeline against a real prospect.
- `light_tier_request.json` — low-value lead, demo disabled,
  audit + strategy + close only. Fast turnaround path.
- `sample_template_select.json` — body for
  `POST /api/agents/website/templates/select`. Previews which
  templates the selector would pick without running the full
  pipeline.

## How to fire them

```bash
# Full pipeline (SSE)
curl -N -X POST http://localhost:8000/api/agents/website/run \
  -H "content-type: application/json" \
  -d @sample_request.json

# Template preview
curl -X POST http://localhost:8000/api/agents/website/templates/select \
  -H "content-type: application/json" \
  -d @sample_template_select.json

# List every template in the library
curl http://localhost:8000/api/agents/website/templates
```

## Saved bundles

Drop sanitized WebsitePilot bundles here so future runs can learn
what worked — especially:

- Bundles that closed deals (note the tier + template picks)
- Bundles where visual QA caught a brand mismatch
- Bundles where the close pitch's option structure (A / B / C) drove
  a specific outcome

File naming: `YYYY-MM-<company-slug>-<tier>.md`.
