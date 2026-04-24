# Viktor PM Source Notes, Apr 11 2026

This reference distills the direct source disclosure into concrete implementation anchors.

## Watcher schedule disclosed
- Heartbeat: 8am, 11am, 2pm, 5pm
- PM Digest: 4pm Mon/Wed/Fri
- SEO Page QA Watcher: hourly
- Meeting Intelligence: 3x/day
- Cedar Gold Pulse: Mon/Wed/Fri 9am

## Aging thresholds disclosed
- Ready for review older than 48h
- In progress with no movement for 7 days
- Monthly task still to do after the 15th
- SEO report past the 7th business day

## Respond filter disclosed
- Direct @mention -> respond
- DM -> respond
- Open action gap only Viktor can close in a thread -> respond
- Everything else -> silence

## Long-task ack disclosed
The ack should tell the human:
- what systems are being pulled
- how long it will probably take
- where the result will appear

## PM phrases disclosed
- warm stuck-task nudge
- reviewer reminder
- monthly-task radar flag
- overdue SEO report support offer
- missing-task callout
- multi-client rollup prioritization line

## Sections 9-14 implementation anchors

### 9. Post-meeting task capture
- Post-capture runs 30 minutes to 4 hours after a meeting ends
- Pull notes from Granola for Matthew, Fireflies for Marcos
- Extract commitments, deliverables, assigned work, and timing promises
- Check ClickUp semantically, not just by exact title
- If all action items are already covered, post nothing
- If uncaptured items exist, post in the client channel offering to create tasks

### 10. GBP workflow
- GBP work is high-volume and easy to miss because the real bottleneck often lives in Slack, not ClickUp
- Writer drafts in Google Doc
- Slack share says GBP posts ready for review
- Reviewer approves in `#for-approvals` or the client channel
- Publish to GBP
- Only then mark ClickUp complete
- PM digest must check both ClickUp and Slack approval state

### 11. Channels you cannot post in
- `#amped-lead-gen` -> external / Slack Connect, read only
- `#amped-buyer-leads` -> external / Slack Connect, read only
- `#amped-new-leads` -> internal, can post
- `#cedar-content-platform` -> external / client-adjacent, read only
- Default rule: if Slack Connect or external users are present, assume read only until explicitly confirmed otherwise

### 12. SEO report bottleneck pattern
- Day 1-3: nothing
- Day 4-5: gentle writer check-in if report is not in progress
- Day 6-7 business days: surface to Marcos + Matthew if still not delivered
- Offer specific GA4 + GSC data help at any stage

### 13. State tracking across runs
- Per-cron `LEARNINGS.md`
- Workflow-specific JSON state files
- Global daily log
- Goal is to avoid duplicate nudges, duplicate work, and re-flagging already handled issues

### 14. Cedar Gold two-workstream management
- Workstream 1: SEO retainer, Jo Paula owner, Marcos or Matthew review depending on content vs strategy
- Workstream 2: website redesign / post-launch, Katelyn PM, Anthony design, Hammad build
- Same client, same space, same channel, but different owners, review lanes, and blocker patterns
- Content delays usually point to Jo Paula-side retainer pattern
- Build delays usually point to spec, design, dev, or QA handoff pattern

## Build principle
The hard part is not the code. The hard part is the habit:
- read context before acting
- update what you know after acting
- stay quiet when there is nothing worth saying
