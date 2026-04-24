---
name: pilot-morning-briefing
description: >-
  Use when running the 8AM AZ morning briefing cron or when Matthew asks
  "what's on today?" Composes Viktor-style daily briefing with calendar,
  email highlights, AMPED lead status, and proactive action offers. Posts
  to Matthew DM. The one scheduled touchpoint that always fires on weekday
  mornings. Also load for debugging morning briefing issues.
---

# Pilot Morning Briefing Skill

## Purpose
Compose and deliver a Viktor-style daily morning briefing to Matthew via Slack DM. This is the flagship proactive behavior that makes Pilot feel like a real coworker.

## Trigger
Cron job: 8 AM AZ (15:00 UTC) daily. Can also be run on demand.

## Required Skills to Load
Always load these alongside this skill:
- `pilot-api-reference` — exact curl commands and tool slugs
- `pilot-communication` — formatting rules, tone, Viktor standard
- `pilot-company` — clients, channels, business context
- `pilot-team` — ownership, reviewer lanes, communication fit

## Data Gathering (Parallel Where Possible)

### 1. Google Calendar (today's events)

**USE `GOOGLECALENDAR_EVENTS_LIST`** (not FIND_EVENT or FIND_EVENTS — those return "Tool not found" as of Apr 2026).

```bash
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/GOOGLECALENDAR_EVENTS_LIST" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"arguments": {"calendar_id": "primary", "timeMin": "DATE_T00:00:00-07:00", "timeMax": "NEXT_DATE_T23:59:59-07:00", "maxResults": 15}, "entity_id": "***REDACTED_COMPOSIO_ENTITY***"}' \
  -o /tmp/gcal_raw.json
```
**CRITICAL**: The `calendar_id: "primary"` argument is REQUIRED. Args are `timeMin`/`timeMax` (camelCase), not `time_min`/`time_max`.

**Fetch today + tomorrow in one call**: Set `timeMax` to end of tomorrow. Matthew benefits from seeing what's coming the next day (especially Friday previewing the weekend, or Thursday previewing Friday calls). Separate today vs tomorrow in the output with a "Tomorrow:" line.

**Response path**: `data.items[]` (simple array). Each event has `start.dateTime`, `end.dateTime`, `summary`, `status`. Sort by `start.dateTime` before displaying.

**Wrapper pitfall (Apr 10 2026):** Composio v3 execute responses may have `success: null` even when the call worked and `data.items[]` is populated. Do not treat a null/absent `success` field as failure. Check for `error` and inspect `data.items` directly.

**Calendar cleanup pitfall (Apr 15 2026):** The returned `data.items[]` can still include stale recurring-series artifacts and duplicate-looking rows even when your `timeMin` / `timeMax` window is correct. Before writing the briefing, post-filter locally to the exact Arizona day(s) you care about and dedupe on `(start, end, summary)` so old recurring meetings and duplicated webinar rows do not pollute the schedule section.

**Morning briefing calendar pitfall (Apr 16 2026):** Calendar pulls can include low-signal items that are technically on the day but should not drive the briefing headline, especially:
- midnight or all-day placeholders (for example a `12:00 AM` project review block)
- Reclaim-generated lunch / walk / personal commitments
- generic evening build blocks that matter less than the next live meeting

Use the schedule section to surface the *actionable daytime commitments and decision points*, not every raw calendar row. Personal/Reclaim blocks can stay in your private reasoning for spacing awareness, but only mention them if they materially affect a meeting handoff or create a real time squeeze.

**On Fridays**: Also fetch Saturday's calendar so Matthew can see weekend commitments. Use a second call with Saturday's date range.
**On Saturdays/Sundays**: Extend `timeMax` through Monday to show the Monday preview. A "Monday Preview" section is a natural addition for weekend briefings and gives Matthew a heads-up on what's coming.

### 2. Calendly (today's bookings with invitee details)
```bash
# Step 1: Get events
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/CALENDLY_LIST_EVENTS" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"arguments": {"user": "https://api.calendly.com/users/5c324794-9144-4ef4-b786-9d1bf32b9e12", "organization": "https://api.calendly.com/organizations/c06ba6ea-f6cf-489e-93b1-fdf891f4d55e", "min_start_time": "DATE_ISO", "max_start_time": "NEXT_DATE_ISO", "count": 20, "status": "active"}, "entity_id": "***REDACTED_COMPOSIO_ENTITY***"}'

# Step 2: For each event, get invitees (extract UUID from event URI last path segment)
# Arg key is "uuid" NOT "event_uuid"
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/CALENDLY_LIST_EVENT_INVITEES" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"arguments": {"uuid": "EVENT_UUID"}, "entity_id": "***REDACTED_COMPOSIO_ENTITY***"}'
```
Tag each Calendly event as AMPED or ProofPilot based on event name.

### 3. Gmail (unread, last 1-2 days)
```bash
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/GMAIL_FETCH_EMAILS" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"arguments": {"max_results": 30, "query": "is:unread newer_than:2d"}, "entity_id": "***REDACTED_COMPOSIO_ENTITY***"}' \
  -o /tmp/gmail_raw.json
```
Parse from disk. Headers are in `payload.headers[]` (From, Subject, Date). Body snippet in `messageText`.

### 4. Slack Channels (quick scan)
Hit these channels with `conversations.history` (limit=8-12):
- PM Team (C0AFPA546F3)
- Approvals (C09FUEHE2A3)
- AMPED Lead Gen (C0ACGKRB272)
- AMPED Buyer Leads (C0AGVHV1AA1) — critical for weekend runs, new qualified buyer leads can be the only reason the briefing should fire
- Cedar Gold (C0AC89HP4N4) — or whichever client is hottest
- Matthew DM (D0AQ9PB64L8) — check what Pilot already sent today to avoid duplication

For morning scans, use an overnight `oldest` window rather than just the latest 5 messages so you catch early-morning lead alerts that land before the briefing fires.

**AMPED lead alert pitfall (Apr 21 2026):** do NOT blanket-filter bot-originated Slack messages in `#amped-new-leads`. The new lead alerts can arrive from bot ID `B0AFRK3LE7Q`, and those are often the highest-value overnight signals in the whole briefing. Parse the message `blocks` as well as `text` so you capture structured fields like:
- Name
- Location
- Phone
- Priority / score
- Timeline
- Assigned To
- Lead Cost

The plain text header only gives the name and city. The Block Kit fields are where the useful assignment and urgency context lives.

### 5. Thread Following (overnight context)
After scanning channel messages, check `reply_count` on each message. For threads with replies (reply_count > 0), fetch `conversations.replies` to understand the full context. This reveals:
- Whether Matthew already responded to something (skip it in briefing or mark as "cleared")
- Whether a question is still unanswered
- The actual status of a discussion (not just the opening message)

Pattern: scan channels first with `conversations.history`, note timestamps of messages with `reply_count > 0`, then batch-fetch replies for those threads. This avoids reporting stale items Matthew already handled.

**PITFALL (Apr 9, 2026):** When calling `conversations.replies`, you MUST use the exact `ts` value from the `conversations.history` response. Do NOT hardcode or estimate timestamps. Extract `ts` from the history JSON, store it, and pass it directly. Using wrong timestamps silently returns empty results (no error, just no messages). Pattern: parse history, collect `{ts, reply_count}` for threads, then loop `conversations.replies?ts={exact_ts}` for each.

### 6. Pilot Tasks
Read `~/pilot-tasks.json` on VPS (or check if accessible locally).

## Pitfalls (Learned April 2026)

### CRITICAL: Delivery Pattern (deliver: local + self-posting)
This cron uses `deliver: local`. The final response is saved to a local file and NOT sent to Slack. The agent must post to Matthew's DM itself using the Slack API. This is the unified brain architecture: the brain that gathers data is the same brain that decides whether and how to speak.

**Correct posting pattern:** build explicit Block Kit and post it with `slack_post.py` so the briefing looks like a polished coworker message, not a cron dump.

Preferred builder now:
```python
import json, subprocess

payload = {
    "title": "Thursday Morning, April 9",
    "summary": "Three meetings today, plus one money item worth seeing before the first call.",
    "schedule": ["*9:00 AM* , AMPED strategy call", "*10:30 AM* , Cedar Gold review"],
    "inbox": ["Railway deployment for amped-nightly-analyze crashed again overnight."],
    "moving": ["*Cedar Gold* , homepage QA complete, IRA pages at 6 of 8."],
    "priorities": ["Review Cedar Gold staging", "Decide on AMPED lead follow-up"],
    "footer": "Pilot morning briefing · Arizona time"
}
with open("/tmp/briefing_data.json", "w") as f:
    json.dump(payload, f)

subprocess.run([
    "python3",
    "/root/.hermes/skills/productivity/pilot-api-reference/scripts/render_pilot_message.py",
    "--type", "morning_briefing",
    "--input", "/tmp/briefing_data.json",
    "--output", "/tmp/briefing_blocks.json",
], check=True)
```
Then post it:
```bash
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/slack_post.py \
  D0AQ9PB64L8 --blocks-file /tmp/briefing_blocks.json --fallback-text "Morning briefing"
```
Use explicit blocks so dividers, context lines, and section hierarchy render consistently.

**Zone rule for long briefings:** keep the title + one-sentence summary + first high-signal section in Zone 1 so the message still works if Slack collapses the rest.
**Weekend logic:** On weekends, only post if there's something genuinely actionable (new lead, Monday prep, pending items). If nothing warrants attention, go [SILENT].

**Weekend sensitivity correction (Apr 18 2026):** if Matthew recently pushed back on noisy cron output in his DM, raise the bar even higher for Saturday/Sunday briefings. Weekend messages should be *tight heads-ups*, not full PM sweeps. Good weekend reasons to send:
- same-day call prep with real context to use on the call
- account/security issue that may need confirmation or cleanup
- money/revenue item that materially changes the day
- a Monday commitment that is easy to miss and worth seeing early

Do *not* turn a weekend briefing into a broad escalation recap, backlog dump, or another "Escalation Overview" style message. If the useful output is only 2 sections, keep it to 2 sections.

**Email/account-access rule (Apr 18 2026):** treat these as actionable even if they look like system email, because together they can indicate a real account-change event:
- Google account security alerts for a ProofPilot mailbox
- Google Ads access/invitation emails showing new admin users added
When both appear for the same client/account in the same overnight window, group them into one concise account-access heads-up instead of listing them separately.

**End local output with a log** of what was posted (key data points, timestamps) so future crons can session_search it and avoid duplicating.

### Composio + Python urllib = 403
Composio's API returns 403 Forbidden when called from Python's urllib (Cloudflare block). Always use `curl` via `terminal()` for Composio calls. Note: the Slack API works fine via urllib from Hermes container.

### Large API Responses Overflow execute_code
Gmail and GCal responses can exceed execute_code's 50KB stdout cap. Pattern:
1. Use `terminal()` with `curl -o /tmp/file.json` to save to disk
2. Parse with `terminal("python3 << 'PYEOF'\n...\nPYEOF")` heredoc that reads the file directly
3. Or write a script to `/tmp/parse_X.py` and run it

### JSON Parsing
Slack and Gmail responses contain control characters. Always use `json.loads(s, strict=False)`.

### Duplicate Sends
Check Matthew's DM history before sending. Cron watchers (AMPED lead watcher, context sync) may have already posted relevant info. Don't repeat what's already in the DM.

### Calendar Tool Slug Changes
As of Apr 2026, only `GOOGLECALENDAR_EVENTS_LIST` works. The `GOOGLECALENDAR_FIND_EVENT` and `GOOGLECALENDAR_FIND_EVENTS` slugs return "Tool not found". If it breaks again, search tools with: `curl -s "https://backend.composio.dev/api/v3/tools?search=google+calendar+events&limit=10" -H "x-api-key: ..."`

## Email Filtering (CRITICAL)
Out of 30 emails, typically only 2-3 are actionable. Apply these filters:

STRATEGY: Filter IN, not out. The inbox is 90%+ noise. Instead of maintaining an ever-growing skip list, look for the 2-3 emails that match the SURFACE criteria below. Everything else is skipped by default. Common noise: newsletters (@beehiiv.com, @substack.com, vidIQ, Hormozi, CreativeOS, Superhuman AI, The Hustle, The Rundown AI, LendingTree, VistaPrint, PragerU, Etsy, Mobbin, etc.), Edison quiz leads, ClickUp digests, GBP alerts, Fireflies, system notifications, promo emails.

**Filtering pitfall (Apr 21 2026):** do not classify newsletters as actionable just because the subject contains urgent-looking words like `today`, `plan`, `catch`, `reply`, or `code`. `Superhuman`, `The Rundown AI`, and similar AI-news senders can look action-oriented if you keyword-match naively. Sender identity outranks the subject line here. If it is a known newsletter/media sender, skip it unless Matthew explicitly asked to track that source.

ONLY SURFACE:
- Action items Matthew needs to handle
- Threads he owes replies on
- Money/sales items (invoices, payments, leads, ChartMogul recaps with notable changes)
- Deployment crashes or infrastructure alerts
- Important relationship follow-ups
- Calendly bookings (tag AMPED vs ProofPilot)

If zero actionable emails after filtering, skip the email section entirely. Never report skip counts.

## Briefing Format (Viktor-Style Block Kit)

Structure text so the gateway auto-converts to Block Kit with dividers between sections. Double-newline before each emoji section. Prose with inline bold metrics, not just bullet dumps.

```
:sunrise: *Wednesday Morning, April 1*
3 meetings today, busiest block is 10-12. One deployment alert worth looking at, plus a strong ChartMogul recap.

:calendar: *Today's Schedule*
• *9:00 AM* — AMPED strategy call with Marcos
• *10:30 AM* — :star: Cedar Gold client review (Kevin + Katelyn joining)
• *2:00 PM* — ProofPilot internal standup
Back-to-back morning, so heads up on turnaround between the AMPED call and Cedar review.

:envelope: *Inbox*
Railway deployment for amped-nightly-analyze crashed again overnight. Intermittent since March 21, might be worth having Hammad check container memory limits.

ChartMogul March recap for Trust Beacon looks strong. MRR hit *$17K* (+$3.8K, +28.79%), *zero churn*. Top gains: Cedar Gold ($2K), Anthony Celestino ($1K), Pelican Coast ($800). Net cash flow *$38,250* (+20.85%).

:dart: *What's Moving*
*Cedar Gold* — Homepage QA complete, IRA pages at 6 of 8. Hub page forms are the blocker, Hammad starting Monday.
*Dolce Electric* — Rachalle finishing the service area pages today. Jo Paula has the FAQs queued for tomorrow.

:key: *Your Priorities*
1. Review Cedar Gold staging before the 10:30 client call
2. Decide on AMPED lead follow-up (2 flagged yesterday, still open)
3. Approve Dolce service area batch when Rachalle submits

Two client meetings, fresh money in the bank, and a Cedar Gold sprint tonight. Solid Wednesday.
```

*Key differences from old format:*
- Prose summary right after the header (not jumping straight to bullets)
- Inbox items written as conversational paragraphs with *bold key metrics* inline
- NO skip count footer (communication rules say never report how many emails were scanned/skipped)
- Project updates use prose, not just bullets: "*Cedar Gold* — Homepage QA complete, IRA pages at 6 of 8."
- No "Good morning, Matthew" greeting. Title is the date.

## Formatting Rules
- *Single asterisks* for bold (Slack). NEVER **double**.
- No em dashes. Use commas, periods, "and".
- Links: <https://url.com|display text>
- :star: emoji on the most important calendar event
- Prose with inline bold for metrics. Bullets only for parallel lists (schedule, priorities).
- No generic closers. End with a warm, natural one-liner that ties the day together (e.g. "Two client meetings, fresh money in the bank, and a Cedar Gold sprint tonight. Solid Thursday."). Not a skip count, not "let me know if you need anything."
- Do NOT put scan totals or filtered-email counts in the footer/context block either. `25 inbox emails filtered` is still a skip count, just dressed up. The footer should be timing/context only, not inbox math.
- If there's a win worth celebrating, weave it into the relevant section naturally.

## Deliverable Status Assessment (CRITICAL)

Never report a deliverable as "done" or "shipped" just because someone submitted it. Before reporting status on ANY deliverable:

1. **Trace the full thread**: After a team member posts "done" or "ready for review," check for follow-up messages. Did Matthew or Marcos give edit feedback? Did the client request changes?
2. **Edit feedback = not done**: If Matthew gave feedback requesting edits, the status is "needs edits" regardless of what ClickUp says. The deliverable is only complete when the *edited* version is resubmitted AND approved.
3. **Apply to all deliverable types**: SEO reports, content pages, audits, proposals, QA reviews, designs. The pattern is universal.
4. **Thread replies > ClickUp status**: ClickUp may show "Ready for Review" while the thread shows Matthew already reviewed it and requested changes. The thread is the source of truth.
5. **When in doubt, report as "in progress"**: It's better to under-report completeness than to tell Matthew something is done when it isn't. He'll correct you if it IS actually done.

This was learned Apr 8 2026: ISS March SEO report was reported as a gap ("check if reports went out") when in reality Jo Paula had submitted it on Apr 3, but the thread had 15 replies showing Matthew gave detailed edit feedback on Apr 4, followed up Apr 6, followed up again Apr 7, and gave more specific edits on Apr 8. A surface-level scan (5 messages, no thread tracing) missed ALL of this and incorrectly implied the report hadn't been done. The correct status was "needs edits from Jo Paula" (owner), not "unknown."

**On-demand audit rule**: When Matthew asks "audit my calendar" or "what am I missing," this same deliverable assessment applies. Pull 20-40 messages per channel (not 5) and trace threads with reply_count > 0 before reporting any deliverable status. The audit that triggered this lesson only pulled 5 messages per channel and never called conversations.replies, which is why it missed an entire 15-message thread of edit feedback.

## Edge Cases
- No events today: "Calendar's clear today. Good day to knock out reviews."
- Weekend: look ahead to Monday, lighter tone
- Kevin/team member sick: note it factually, don't dramatize
- Multiple Calendly calls: enrich each with invitee data, tag AMPED vs ProofPilot
- Back-to-back meetings: warn about turnaround time
- If other crons already sent lead intel to DM: reference it ("Lead intel posted earlier") don't duplicate

## Verification
After sending, confirm `ok: true` from Slack API response. Log the message timestamp.
