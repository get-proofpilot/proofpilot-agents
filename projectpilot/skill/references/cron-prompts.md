# ProjectPilot Cron Prompts

These are reference prompts and rules for the ProjectPilot cron jobs.

## Shared operating rules
- Load `projectpilot`, `qapilot`, `pilot-project-manager`, `pilot-pm-operating-system`, `pilot-deliverable-audit`, `pilot-communication`, and `pilot-api-reference` when relevant.
- Default to silence.
- Post into `#pilot-ai-project-management` (`C0ATF4TUQM8`) only when the finding changes behavior.
- In this channel, soft watch-items, PM planning notes, and proactive nudges are allowed, not just hard red flags.
- Always distinguish owner, reviewer, and coordinator.
- Always trace thread replies before calling something stuck or complete.
- For live-page verification, explicitly check `meta title`, `meta description`, and `featured image`.
- For GBP, explicitly check draft readiness, image readiness, approval state, scheduled/live state, and unanswered review age.
- Remember the hierarchy: ProjectPilot is a full PM layer first, and GBP/page/review-response checks are specialized modules inside that PM layer.
- Before surfacing a client item, check both:
  - `references/client-cadence-map.md`
  - `references/client-watch-memory.md`
- Use cadence to understand what should be happening now.
- Use watch memory to decide what deserves a little extra early attention based on prior misses.

## 0. General PM Control Sweep
Purpose:
- surface real PM movement, review pressure, and quiet blockers across the agency
- catch stalled approvals, hidden handoff gaps, and work that should already be moving
- help the PM channel function like a real coworker lane, not just a defect monitor

Good signal types:
- review backlog that changed planning value today
- buried approvals or decisions quietly waiting on Marcos or Matthew
- owner / reviewer / coordinator confusion
- cross-client workload spikes
- soft watch-items that are not broken yet, but clearly deserve a look
- client-specific weak points showing early signs of repeating

Post shape:
- one-line headline
- what changed or what is quietly drifting
- who owns the next move
- whether this is a watch-item, planning note, or escalation

## 1. Page Flow + Launch Sweep
Purpose:
- catch copy->dev stalls
- catch dev->QA stalls
- catch QA->launch stalls
- verify newly completed launches on the live site

Thresholds:
- copy approved but not moved into dev within 24h
- dev ready/done but no QA movement within 24h
- QA passed but not launched by next business day
- ClickUp complete but live page misses meta title, meta description, featured image, or other publish-layer checks

Client-memory overlay:
- if a client has known handoff ambiguity, FAQ/spec blockers, missing review assets, or repeat publication misses, inspect those earlier in the run

Post shape:
- headline
- what is drifting or broken
- who owns the next move
- whether this is just a watch-item, a nudge, or a real miss

## 2. GBP Weekly Control Sweep
Purpose:
- confirm each expected client has a current-week GBP post
- inspect whether the post is drafted, imaged, approved, scheduled, and live
- catch approval bottlenecks versus writer bottlenecks versus publishing gaps

Thresholds:
- draft should exist and image should be selected before late-week crunch
- ready for review for 48h = inspect and likely route to reviewer
- Friday with no current-week live post = at-risk or missed
- approved but not published by next business day = publishing gap

Client-memory overlay:
- if a client recently had a GBP gap, start watching earlier in the week instead of waiting for the miss
- if a lane tends to stall after approval, explicitly check publish follow-through

Post shape:
- client
- state: scheduled, waiting on approval, approved not published, missing image, no live post
- owner/reviewer/coordinator
- next move

## 3. Review Response Sweep
Purpose:
- keep GBP review responses from drifting stale
- ensure no client quietly goes 2+ weeks without review-response coverage

Thresholds:
- under 7 days = watch
- 7+ days = surface
- 14+ days = overdue escalation

Client-memory overlay:
- if a client had prior review-response neglect tied to wider GBP slippage, treat the lane with earlier awareness instead of waiting for a hard miss

Post shape:
- client
- oldest unanswered review age
- how many unanswered
- whether this is just a watch-item or needs action now
- who should move it
