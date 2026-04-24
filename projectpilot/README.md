# ProjectPilot

ProofPilot's PM + launch-control agent. Runs sweep-style checks across
clients to catch drift **before** it misses.

See `skill/SKILL.md` for the full operating doctrine.

## Sweeps

| `sweep_type`        | Checks                                                                 |
|---------------------|------------------------------------------------------------------------|
| `pm_control`        | Stalled approvals, handoff gaps, routing nudges, workload imbalance    |
| `gbp_compliance`    | Weekly GBP post state per client (live Maps verification)              |
| `page_flow`         | Copy → dev → QA → launch handoff + post-launch live verification       |
| `review_response`   | Unanswered-review aging (7-day watch / 14-day escalate)                |

## Quick run

```bash
curl -N -X POST https://proofpilot-agents.up.railway.app/api/agents/project/sweep \
  -H "content-type: application/json" \
  -d '{"sweep_type": "gbp_compliance"}'
```

## Persistent state

Tracker is saved to `$DOCS_DIR/projectpilot/state.json`. Fetch current
state via `GET /api/agents/project/state`.

## Files

- `engine.py` — sweep orchestrator
- `state.py` — persistent tracker
- `prompts/{pm,gbp_sweep,page_flow,review_response}_system.md`
- `skill/` — full SKILL.md + references (doctrine source of truth)
