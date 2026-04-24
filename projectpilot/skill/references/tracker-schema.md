# ProjectPilot Tracker Schema

Use this as the persistent state model for ProjectPilot sweeps.

## Recommended top-level shape
```json
{
  "last_run": null,
  "pm_items": [],
  "gbp_items": [],
  "page_items": [],
  "review_response_items": [],
  "escalation_log": [],
  "cadence_map_version": "v1",
  "watch_memory_version": "v1"
}
```

## PM item
```json
{
  "client": "Dolce Electric",
  "asset_type": "pm",
  "cadence_profile": "weekly_gbp_retainer",
  "watchpoints": ["recent_gbp_gap", "publish_follow_through"],
  "clickup_task_id": "86pm1234",
  "owner": "Jo Paula",
  "reviewer": "Marcos",
  "coordinator": "Katelyn",
  "clickup_status": "ready for review",
  "slack_approval_status": "waiting_on_reviewer",
  "workflow_stage": "review",
  "last_live_check_date": "2026-04-16",
  "risk_state": "review_pressure",
  "next_action": "tag reviewer",
  "last_escalated_at": null,
  "notes": "Batch of new items landed today, review planning value changed"
}
```

## GBP item
```json
{
  "client": "Dolce Electric",
  "asset_type": "gbp",
  "cadence_profile": "weekly_gbp_retainer",
  "watchpoints": ["recent_gbp_gap", "review_response_followthrough"],
  "clickup_task_id": "86abc123",
  "owner": "Jo Paula",
  "reviewer": "Marcos",
  "coordinator": "Katelyn",
  "draft_link": "https://docs.google.com/...",
  "publish_week": "2026-W16",
  "clickup_status": "ready for review",
  "slack_approval_status": "waiting_on_reviewer",
  "image_status": "selected",
  "schedule_status": "not_scheduled",
  "live_check_date": "2026-04-16",
  "live_post_status": "at_risk",
  "risk_state": "approval_bottleneck",
  "next_action": "tag reviewer",
  "last_escalated_at": null
}
```

## Page item
```json
{
  "client": "ISS",
  "asset_type": "page",
  "cadence_profile": "qa_heavy_retainer",
  "watchpoints": ["missing_review_assets", "batch_template_misses"],
  "clickup_task_id": "86xyz789",
  "live_url": "https://example.com/page",
  "owner": "Hammad",
  "reviewer": "Marcos",
  "coordinator": "Katelyn",
  "workflow_stage": "qa_to_launch",
  "clickup_status": "complete",
  "slack_approval_status": "approved",
  "live_check_date": "2026-04-16",
  "http_status": 200,
  "meta_title_status": "present",
  "meta_description_status": "present",
  "featured_image_status": "missing",
  "launch_verification_status": "failed",
  "risk_state": "publication_miss",
  "next_action": "reopen attention",
  "last_escalated_at": null
}
```

## Review-response item
```json
{
  "client": "Saiyan Electric",
  "asset_type": "review_response",
  "cadence_profile": "midmonth_eom_review_check",
  "watchpoints": ["response_drift"],
  "listing_query": "Saiyan Electric Google reviews",
  "owner": "Jo Paula",
  "reviewer": "Marcos",
  "coordinator": "Katelyn",
  "oldest_unanswered_review_days": 9,
  "count_unanswered": 2,
  "live_check_date": "2026-04-16",
  "risk_state": "needs_response",
  "next_action": "surface in PM channel",
  "last_escalated_at": null
}
```

## Risk-state vocabulary
- `on_track`
- `watch`
- `review_pressure`
- `buried_approval`
- `coordinator_followup`
- `approval_bottleneck`
- `writer_delay`
- `publishing_gap`
- `asset_missing`
- `handoff_stall`
- `qa_gap`
- `launch_gap`
- `publication_miss`
- `needs_response`
- `overdue_response`

## Logging rule
Only re-post to Slack when one of these is true:
- risk state changed
- age crossed a threshold
- owner/reviewer changed
- the item resolved
- the issue materially worsened
- the planning value materially changed
