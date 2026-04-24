# ReportPilot

ProofPilot's reporting agent. Produces monthly SEO reports, ad hoc
pulses, single-layer slices, and recovery reports with a 5-gate QA
verdict appended.

See `skill/SKILL.md` for the full operating doctrine and
`prompts/report_system.md` for the distilled Claude system prompt.

## Report types

| `report_type`     | Use when                                    |
|-------------------|---------------------------------------------|
| `monthly`         | Formal client reporting cycle               |
| `ad_hoc`          | Mid-month check, urgent question, pulse     |
| `single_layer`    | One slice only — SEO, GBP, content, etc.    |
| `recovery`        | A report is late, stale, or needs catch-up  |

## Quick run

```bash
curl -N -X POST https://proofpilot-agents.up.railway.app/api/agents/report/run \
  -H "content-type: application/json" \
  -d '{
    "client_name": "All Thingz Electric",
    "domain": "allthingzelectric.com",
    "report_type": "monthly",
    "reporting_window": "2026-03",
    "compare_window": "2026-02"
  }'
```

## Files

- `engine.py` — draft + QA orchestrator
- `data_sources.py` — failure-tolerant parallel pulls
- `prompts/{report,qa_gates}_system.md`
- `skill/SKILL.md` + `skill/references/` + `skill/templates/`
