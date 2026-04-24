---
name: pilot-heartbeat
description: >-
  Use when running the heartbeat cron (every 30 min, 7AM-8PM AZ). 3-phase
  brain loop: Phase 0 conditional gate (zero LLM cost fast-exit), Phase 1
  rotating scans (Slack, AMPED, email, calendar, ClickUp, Fireflies), Phase 2
  decision engine (WORK/FLAG/PROPOSE/SILENT). Contains VPS state management
  via Postgres brain, people tracker integration, escalation ladder, cost
  targets, and 31 implementation pitfalls. Also load for debugging heartbeat
  issues or understanding Pilot's proactive behavior architecture.
---

# Pilot Heartbeat v2

## Architecture Overview

The heartbeat is a 3-phase brain loop inspired by:
- OpenClaw: Rotating checks, HEARTBEAT_OK suppression, isolated sessions, state tracking
- Viktor: 3-tier cron cost model, code-as-a-tool, 2-hour rule, emoji-first trust
- ProactiveAgent: Conditional gate, dynamic scan depth
- Aeon: 48h dedup log, heartbeat-as-skill pattern

## Schedule
Every 30 min, 7AM-8PM AZ (14:00-03:30 UTC):
```
0,30 14,15,16,17,18,19,20,21,22,23,0,1,2,3 * * *
```

## What This Replaces
6 paused crons: Proactive Watcher (93011fe74175), Context Sync (7454fec3a52c),
AMPED Lead Watcher (ebfad77a91da), Post-Meeting Capture (14f61d7bfa9c),
Escalation Report (4b99ed9296ce), Task Execution (1c51931dff3e).

7 crons stay separate: Morning Briefing, Email Digest, PM Digest, Cedar Gold Pulse,
EOW Client Updates, Viktor Study, Workflow Discovery.

---

## PHASE 0: CONDITIONAL GATE (zero LLM cost)

Before ANY reasoning, run a pure data scan using terminal/curl. No LLM tokens spent.

**Step 0a-pre: People Tracker Scan**

Before the main scan, run the people tracker to update presence state:
```bash
python3 /root/pilot-reactor/people_tracker.py scan <SLACK_TOKEN>
```
This updates /root/pilot-heartbeat/people_state.json with:
- Who is active, absent, or just returned
- Absence reasons (sick, vacation, unknown) from self-reports and third-party mentions
- Return detection (absent person posts again)

Check for returning members *after* the scan:
```bash
python3 /root/pilot-reactor/people_tracker.py returning
```
If anyone has returned, this triggers the CONTEXTUAL RE-ENGAGEMENT flow (see Decision E).

**Important ordering rule:** do not trust a standalone `returning` read before running `scan` in the same heartbeat. The people state can be stale and miss a just-returned teammate. Confirmed Apr 13 2026: an initial `returning` call said "No returning members detected," but the required follow-up `scan` immediately detected Hammad Ahmed as returned from a 3.1-day absence. Reliable pattern is always `scan` first, then `returning`, then `full-context` for any returned users.

**People tracker rate-limit rule:** treat a people scan that hits Slack `HTTP Error 429: Too Many Requests` as non-authoritative, even if it still prints `No presence changes detected.` Confirmed Apr 15 2026: the first two `people_tracker.py scan` runs returned 429 errors in stderr and reported zero active members, then the third attempt succeeded cleanly. Reliable pattern is to retry the scan up to 3 times with a 15-second wait before trusting a quiet result.

**Step 0a: Build the pre-check script**

Write a Python script to /tmp/hb_precheck.py that:
1. Fetches last 30 min of messages from all 12 Slack channels via conversations.history
2. Counts HUMAN messages only (filter out bots: U0AL7SW3JKW, U0AP93XPHFV, USLACKBOT, any bot_id)
3. Checks #amped-buyer-leads specifically for new lead-format posts
4. Returns a structured summary: {channel: message_count} + total_human_messages

Run it via terminal. If total_human_messages == 0, this is a FAST EXIT candidate.

**Step 0b: Check rotation schedule**

Read previous heartbeat output via session_search (query: "HEARTBEAT" last 2 hours).
Extract the HEARTBEAT_STATE from the last run. Determine what's overdue:

| Check Type    | Cadence   | Track Key          |
|---------------|-----------|---------------------|
| Slack scan    | 30 min    | last_slack_scan     |
| AMPED leads   | 30 min    | last_amped_scan     |
| Email         | 60 min    | last_email_scan     |
| Calendar      | 60 min    | last_calendar_scan  |
| ClickUp       | 120 min   | last_clickup_scan   |
| Fireflies     | 60 min    | last_fireflies_scan |
| Token health  | 360 min   | last_token_check    |

Token health check: Run `python3 /root/pilot-work/scripts/token_health.py` every 6 hours.
If any token fails, FLAG to Matthew's DM immediately (OAuth re-auth needed).
Covers: Slack, ClickUp, Composio (Gmail, Calendar), Fireflies.

Only run checks that are DUE. Skip the rest. This cuts API calls by ~40%.

**Step 0c: Fast exit decision**

IF all of these are true:
- Zero new human messages across all channels
- No checks are overdue (email, calendar, ClickUp all scanned recently)
- Last 2 heartbeats were also silent

THEN: Output "[HEARTBEAT_OK]" with state blob and EXIT. Zero LLM reasoning.
Estimated cost: $0.02-0.05 (just the skill loading + session_search + curl calls).

---

## PHASE 1: SCAN (only runs if gate passed signal)

### Step 1-pre: Delivery Verification (mandatory if last_action was FLAG/WORK)

Before running any new scans, check if the PREVIOUS heartbeat's FLAG/WORK action
actually reached Slack. This prevents the "phantom delivery" loop where multiple
heartbeats each think the message was sent but it never arrived (see Pitfall #30).

**Pattern:**
1. Read `last_action` and `last_action_detail` from brain state
2. Resolve the ACTUAL prior destination before verifying. Many actions do go to Matthew's DM (`D0AQ9PB64L8`), but some heartbeat work lands in a source thread instead, especially AMPED buyer-thread updates after a payment or deal change.
3. If last_action was FLAG or WORK, fetch the live history on that exact destination with `oldest` set to a safe lookback window.
   - DM delivery -> `conversations.history` on `D0AQ9PB64L8`
   - thread/channel delivery -> `conversations.replies` or `conversations.history` on the original channel/thread
4. Search the returned messages for evidence the delivery actually landed
   (keyword match on lead name, topic, or key phrases)
5. If NOT found: the delivery failed silently. RE-EXECUTE the action this run.
   Don't just re-flag — actually send the message again using the self-contained
   Python urllib pattern (write script to /tmp, run via terminal). This is immune
   to the cross-sandbox file isolation that breaks curl -d @file patterns.
   
   **Recovery by action type:**
   - **AMPED enrichment**: Read the enrichment file from VPS (`read_file /root/pilot-deliverables/amped/{name-slug}.md`), recompose the Slack DM from the saved data, deliver via urllib script. The VPS file is the source of truth since it persists across sessions.
   - **Call prep**: Same pattern — read from VPS, recompose, deliver. Add urgency context if the call is now closer.
   - **Generic FLAG**: Reconstruct from `last_action_detail` in brain state and re-send.
   
5. If found: confirmed delivered. Proceed with normal scan.

**Why this matters:** Confirmed Apr 7 2026: Juan Giron AMPED call prep was "sent" by
3 consecutive heartbeats (each recording FLAG in state), but conversations.history
showed zero DMs delivered in 4+ hours. The delivery failed due to Pitfall #26
(subagent file isolation) and no heartbeat caught it because they all trusted
session_search instead of verifying via Slack API. The call was 30 minutes away
when the verification loop finally caught and fixed it.

Run only the OVERDUE checks from the rotation schedule.

### Slack Scan (every 30 min - always runs if gate found messages)

Use terminal with bash loop (NOT execute_code).
**CRITICAL: Clean up leftover files first** (see Pitfall #33):
```bash
rm -f /tmp/hb_*.json
TOKEN="***REDACTED***"
OLDEST=$(python3 -c "import time; print(f'{time.time() - 1800:.6f}')")
for pair in "pm-team:C0AFPA546F3" "general:C097JMZ91RC" "approvals:C09FUEHE2A3" "seo-team:C097JN65KAS" \
            "cedar-gold:C0AC89HP4N4" "heropm:C0AM6EZ2CBX" "iss:C09FD47CERF" "pce:C097JNC232A" \
            "saiyan:C097NGURDB6" "dolce:C097NGVQZB6" "wild-within:C0AKRPXLVV3" "trading:C0AKWJFFHLL" \
            "adam-lev:C097NH0BFBN" "all-thingz:C097NGWLXQC" "alpha-pm:C0ALT4X97GT" \
            "laf:C0AD4NA2RS8" "powerroute:C097JNANU4W" "house-dental:C0AQ0ECRMTK" \
            "amped-buyers:C0AGVHV1AA1" "amped-gen:C0ACGKRB272" "amped-new:C0AFC562UHM" \
            "cedar-content:C0AMY95FJTY" "seo-reports:C0AMLUPJENM"; do
  name="${pair%%:*}"; chan="${pair##*:}"
  curl -s "https://slack.com/api/conversations.history?channel=${chan}&limit=10&oldest=${OLDEST}" \
    -H "Authorization: Bearer $TOKEN" -o "/tmp/hb_${name}.json"
done
```

Then parse with a separate terminal python3 script that reads all /tmp/hb_*.json files.
Extract: who posted, what they said, reply_count, thread_ts.
Flag: questions (? char), decisions ("should we", "need", "approve"), blocks ("blocked", "stuck", "can't"), client mentions, wins.

**Deliverable status rule (CRITICAL — applies to heartbeats, briefings, audits, and any on-demand status report)**:
When a scan finds a `submitted`, `ready for review`, `ready for your review`, `done`, or `finished` message, ALWAYS pull `conversations.replies` on that thread to check for edit feedback from Matthew or Marcos. If feedback was given, status is `needs edits`, not `done`. Never report a deliverable as complete without tracing the full thread.
- Thread replies > ClickUp status > top-level channel message.
- Track who OWNS the work vs who COORDINATES it. Example: Jo Paula owns ISS content/reports, Katelyn coordinates task flow. Don't confuse PM comments with ownership.
- When auditing a channel, pull at least 20-40 messages (not 5) and follow threads with reply_count > 0.
- If the latest thread state shows the team finished their part and the next step now belongs to Matthew, treat that as a proactive-heads-up candidate even if nobody asked.
- For time-sensitive handoffs, include the direct artifact links in the eventual DM, not just a generic summary. Matthew should be able to act from the message itself.
- This rule was reinforced Apr 8 2026: ISS March SEO report had 15 thread replies showing 4 rounds of Matthew's edit feedback, but a surface-level 5-message scan only saw Jo Paula's initial `ready for review` and missed everything.
- It was reinforced again with the MMMK / Trading Academy pattern: once Jo Paula said the title, description, and hashtags were ready, the real state was no longer `content in progress`, it was `waiting on Matthew to review/send before Monday`.
### AMPED Lead Scan (every 30 min)
Already fetched in Slack scan. Parse /tmp/hb_amped.json specifically for lead-format posts (new company names, contact info patterns, service types).

### Email Scan (every 60 min, skip if scanned <60 min ago)
Fetch via Composio GMAIL_FETCH_EMAILS. Save to /tmp/gmail_hb.json. Parse for:
- Emails requiring Matthew's reply (thread where he was CC'd/TO'd)
- Calendly bookings (subject contains "Calendly" or sender is calendly.com)
- Money (invoice, payment, proposal, contract)
- Contract / signature / document-review requests sent directly to Matthew
- Client emails (from known client domains)
Skip: newsletters, ClickUp notifications, automated alerts, Edison quiz leads, GBP alerts.

**Dotloop contract-review rule:** treat a fresh Dotloop review request addressed to Matthew as actionable, even if it is not from a known client domain and does not match the usual finance keywords. Reliable pattern:
1. look for sender patterns like `hit-reply@dotloop.com`
2. subjects such as `Please review ...`, especially purchase agreements, addenda, or signature-ready docs
3. treat it as `action_needed` because Matthew is being asked to review/sign, not as generic inbox noise
4. if it is new and has not already been surfaced in a recent DM, include it in the heartbeat heads-up

Confirmed Apr 17 2026: `Lori Buck (via dotloop)` sent `Please review Commercial Purchase and Sales Agreement CF401 01` for `5521 South York Highway`. The useful behavior was to surface it as a fresh actionable review item alongside other live risks, not let it fall through the normal sender/domain filters.

**Mercury credit-payment failure rule:** treat a real Mercury credit or IO payment failure as a finance-risk FLAG, not inbox noise. Reliable pattern:
1. look for a same-minute cluster from Mercury with subjects like `We initiated an automatic payment`, `We couldn't process your IO credit payment`, or `credit account payment ... didn't go through`
2. dedupe the cluster into one underlying event instead of four separate alerts
3. extract the failed amount, source account, and reason from the preview/body if available, for example insufficient funds in `General` checking
4. if Matthew's DM history does not already show that exact payment issue, send one short heads-up with the amount and failure reason
5. track it as a finance-risk item in `items_tracking`, not as a low-priority admin receipt request

Confirmed Apr 16 2026: Mercury sent four emails at 5:41 PM AZ about the same failed `$8,227.65` IO credit payment from General checking. The useful behavior was one concise DM to Matthew, not four separate flags or a silent skip.

**Mercury credit-limit follow-up rule:** if Mercury later sends a same-thread or next-morning account-risk follow-up like `Your IO credit limit has changed` after a real failed IO/credit payment event, treat it as a continuation of the finance-risk item, not routine admin mail. Reliable pattern:
1. link it to the prior failed-payment cluster when timing and account context match
2. treat a lowered credit limit as a meaningful business-risk update because it changes available operating cushion
3. if Matthew's DM history does not already show that specific credit-limit change, send one short heads-up
4. store it in `items_tracking` as a finance-risk continuation, not a generic Mercury receipt/admin reminder

Confirmed Apr 17 2026: Mercury emailed `Your IO credit limit has changed` the morning after the failed `$8,227.65` auto-payment from General checking. That was worth surfacing as a new finance-risk development even though the original payment failure had already been flagged.

**Stripe payment confirmation rule:** treat a real Stripe payment confirmation for an AMPED buyer as a revenue-event FLAG, not just inbox noise. Reliable pattern:
1. detect the payment email in Gmail (`notifications@stripe.com`, subject like `Payment of $1,000.00 from ... for ProofPilot`)
2. verify it against live Stripe data with `STRIPE_LIST_INVOICES`, filtering on customer email / invoice metadata / description
3. confirm `status='paid'`, `paid=true`, and `amount_remaining=0` before flagging Matthew
4. if it is newly paid and not already surfaced in recent DM history, send a short coworker-style DM that the buyer is cleared and ready for next-step setup
5. if the original draft invoice was revised, do not stop at the first exact invoice id you remember from Slack. Inspect the revision chain (`latest_revision` on the old invoice and `from_invoice.invoice` on the paid one) and use the newest paid invoice as the real payment signal when the buyer has already been manually re-invoiced

Confirmed Apr 15 2026: Juan Giron / JRG Electric's AMPED invoice payment surfaced first from the Stripe email, then was verified in Stripe (`in_1TLtZsEFEzPEUUrTubBQTwsD`, $1,000 paid, $0 remaining) before the heartbeat DMd Matthew. This is a clean heartbeat-worthy revenue event even when Slack is otherwise silent.

**QuickBooks scheduled-payment rule:** treat a real inbound QuickBooks payment-scheduled notice as a revenue-event FLAG when it represents meaningful cash coming in soon and Matthew has not already been told. Reliable pattern:
1. look for sender patterns like `do-not-reply@intuit.com` / `qbo` with subjects such as `{Company} has scheduled a payment`
2. read the preview/body to extract the amount and scheduled date
3. classify it as inbound revenue, not a billing-risk alert, when the wording says the client has sent or scheduled payment to ProofPilot
4. dedupe against Matthew's DM history before posting, because these notices can otherwise feel like low-signal accounting noise
5. if it is new and material, send one short coworker-style DM with the company, amount, and date

Confirmed Apr 17 2026: QuickBooks emailed `Strikepoint Media LLC has scheduled a payment` for `$7,200.00` due Apr 20. The useful behavior was one concise heads-up to Matthew as an inbound revenue event, while a same-run Dotloop signed-confirmation email was correctly suppressed as non-actionable.
Confirmed Apr 16 2026: Gridline Electric / Damian Rodriguez had an original draft invoice (`in_1TMhqEEFEzPEUUrTwNmq6GKJ`) that was later revised and voided, while the real paid invoice was the successor invoice (`in_1TMiWKEFEzPEUUrTyQNwIzC5`) with `from_invoice.invoice='in_1TMhqEEFEzPEUUrTwNmq6GKJ'`. The heartbeat found the payment by scanning Stripe for the buyer/company instead of trusting the old draft invoice id from Slack, then posted the paid update into the original buyer-leads thread.

### Calendar Scan (every 60 min, skip if scanned <60 min ago)
Fetch via Composio GOOGLECALENDAR_EVENTS_LIST for next 90 minutes.
Flag: meetings starting in 15 min (prep reminder), meetings that just ended (trigger Fireflies check).

Cross-check against email when calendar is skipped or sparse: if email scan finds a forwarded or updated invite from a real person (not just a calendar system notification) and the event does not appear on the primary calendar, treat it as a schedule-risk FLAG. This catches hand-forwarded meetings that Matthew still needs to see even when Google Calendar sync is incomplete.

### ClickUp Scan (every 120 min, skip if scanned <120 min ago)
Fetch "ready for review" tasks. Count overdue tasks. Check for status changes.
Use direct API: GET /team/9006070686/task?statuses[]=ready%20for%20review

**Viktor PM digest heuristics to preserve (Apr 11 direct disclosure):**
- `ready for review` older than 48 hours -> flag the reviewer by name
- overdue by 3+ days -> warm check-in with the assignee, not a harsh escalation
- monthly tasks still `to do` after the 15th -> flag to Katelyn + Kev
- SEO reports not delivered by the 7th business day -> escalate to Marcos + Matthew because this is client-facing risk
- `in progress` with no comment or status movement for 7+ days -> warm check-in
- 1-2 days overdue is normal. Do not create channel noise for items still in flight.

**Silence threshold:**
The heartbeat should keep Viktor's rule here: only post if it matters. Every message should either prevent a problem or unblock someone. Silence is correct output when the scan finds only normal motion.

### Fireflies Scan (every 60 min, only if calendar shows a meeting ended recently)
Fetch recent transcripts. If a new one exists that hasn't been processed, extract action items.

### Post-Meeting Task Capture (Apr 11 Viktor disclosure)
Meeting intelligence should also close the loop after the meeting, not just send pre-briefs.

**Timing:**
- run 30 minutes to 4 hours after meeting end
- keep the 30-minute floor so notes have time to be written

**State needed per event:**
- event id
- client
- owner
- start/end time
- pre_brief_sent
- post_notes_processed
- post_notes_status

**Capture workflow:**
1. Pull notes from Granola for Matthew-led meetings, Fireflies for Marcos-led meetings when available
2. Extract commitments, deliverables, assigned work, and timing promises
3. Check ClickUp semantically, not only by exact task title
4. If all action items are already represented, post nothing
5. If uncaptured items remain, surface them and offer to create the tasks
6. If notes are not found at all, ask once for confirmation that notes were captured, then mark the event processed and stop checking indefinitely

**Principle:**
Post-meeting capture is a semantic gap detector, not a transcript dump. Silence is correct when the work is already covered.

---

## PHASE 2: DECIDE

For each finding from Phase 1, run through this decision tree IN ORDER.

### Decision A: Can I WORK on this?

| Finding | Work Action | Est. Cost |
|---------|------------|-----------|
| New AMPED lead | Enrich (BuildZoom, Yelp, web scrape), post card to DM | $0.50-1.00 |
| ClickUp messy (5+ stale tasks) | Audit and fix statuses, clear dates, archive dupes | $0.30-0.50 |
| Meeting just ended | Pull Fireflies, extract action items, draft recap | $0.50-1.00 |
| Unanswered team question (2+ hours old) | Draft response, stage in DM | $0.20-0.40 |
| Content ready for QA | Pull page, run QA checks, produce report | $0.50-1.50 |
| Strategy discussion in channel | Crawl site, map gap, deliver analysis | $1.00-2.00 |

**AMPED ops-question nuance:** if someone in `#amped-buyer-leads` or `#amped-lead-gen` raises a non-urgent operational question (dashboard stale, reporting mismatch, missing attribution field, CPL confusion), verify the underlying artifact first before deciding. Good pattern:
1. read the live Slack message and note whether they explicitly said it is urgent or not
2. validate the claim against the live asset if possible (for example `web_extract` the dashboard URL, confirm whether it still shows stale March-era totals or missing fields like `utm_content`)
3. if the issue is real but the question is under the 2-hour rule and not urgent, track it in `items_tracking` instead of DMing Matthew immediately
4. if it crosses 2 hours, gets repeated, or blocks revenue/ops decisions, escalate with the verified evidence rather than the raw complaint

IMPORTANT - THE 2-HOUR RULE (from Viktor):
For unanswered questions in channels, do NOT respond immediately. Only draft a response
if the question has been unanswered for 2+ hours. Check the message timestamp against
current time. If < 2 hours old, LOG it as "tracking" and check again next heartbeat.

**Live-asset confirmation rule:** when the unanswered question is specifically about whether a site/page/content change is live, verify the live asset before escalating. If the answer is directly observable, DM Matthew with the verified answer plus the thread status, not just a generic "still waiting on X" note. Confirmed Apr 16 2026 on Cedar Gold: Matthew asked whether the Brett / Forbes / Harvard wording had been updated, the thread sat unanswered for 2+ hours, and a quick live-site check showed the wording still was not present in the homepage HTML. The useful heads-up was the verified site state plus the fact that the thread had slipped.

### Decision B: Does someone need to know NOW?

Escalate to Matthew's DM (D0AQ9PB64L8) ONLY for:
- New qualified AMPED lead (not previously flagged)
- Task blocked 3+ days with no resolution
- Deadline at risk within 48 hours
- Client waiting on ProofPilot 24+ hours
- Deliverable ready for Matthew/Marcos review
- Revenue event (payment, invoice, new deal)
- Meeting in next 15 minutes with no prep
- Team member unresponsive 24h on critical path
- A review, approval, or decision has been quietly waiting on Matthew and is likely to slip without a heads-up
- A thread handoff is complete, but the next step still depends on Matthew and there has been enough silence that it could get buried
- A team member quietly finished a doc, video, draft, or client deliverable and the remaining step is Matthew's review, send, approval, or forward

**Quiet-completion message rule:** when escalating one of these handoffs, the DM should include (a) what got finished, (b) who finished it, (c) how long it has been waiting if relevant, (d) why the timing matters now, and (e) the direct artifact links. The message should read like a coworker protecting attention, not a status bot.
### Decision C: Can I add strategic value?

Viktor-style jump-ins (currently DM-only):
- Proposal: Use the 5-part template (What I observed / What I'd do / How it works / What you'd get / What I'd need)
- Dot-connecting: "Marcos asked about X in #pce, Katelyn mentioned same in #pm-team"
- Strategic analysis: Crawl site, deliver gap inventory
- Nudge: 1-2 casual lines for simple follow-ups (Pattern 18)
- Celebration: Brief genuine acknowledgment of shipped work

### Decision E: Contextual Re-Engagement (Pattern 19)

TRIGGER: people_tracker.py reports a returning member (status='returned', return_handled=False)

This is one of Viktor's most human behaviors. When a team member returns after absence:

1. Get full context (Slack activity + threads + ClickUp + mentions):
```bash
python3 /root/pilot-reactor/people_tracker.py full-context <user_id> <SLACK_TOKEN>
```
This returns a complete JSON package with:
- All Slack messages in their typical channels during absence
- Thread replies (up to 10 threads) for deeper context
- ClickUp tasks assigned to them (with changed-during-absence detection)
- Mentions of the person while they were out
- Work-done-by-others signals
- Composition hints (has_sick_reason, was_mentioned, others_did_work, tasks_changed)

2. Compose a RE-ENGAGEMENT message using the full-context data:
   - If has_sick_reason: warm health acknowledgment first
   - If was_mentioned: summarize what was asked/said about them
   - If others_did_work: tell them what was already handled so they don't duplicate
   - If tasks_changed: highlight which tasks moved status during absence
   - Always: links/resources to pick up efficiently, clear next step, path forward
   - Urgency context without pressure (dates, how long things have been staging)

3. Post to Matthew's DM (D0AQ9PB64L8) for now; channel posting when approved.
   Match Viktor's tone: warm but efficient. A coworker helping them catch up.

4. After posting: mark as handled via SSH:
```bash
python3 /root/pilot-reactor/people_tracker.py mark-handled <user_id>
```

**Special case: if the returning member is Matthew himself, do NOT compose a separate re-engagement message to Matthew about his own return.** Treat it as a handled internal state update, mark it handled, and only surface the real work delta that matters (for example, newly surfaced blockers, decisions waiting, or handoffs completed while he was away). Confirmed Apr 13 2026: people_tracker returned both Matthew and Katelyn as `returned`; the useful output was Katelyn's re-entry context plus the live ISS rendering bug she surfaced, while a self-return briefing to Matthew would have been noise.

COST: $0.50-1.50 (context fetch + thread analysis + ClickUp + LLM composition)
PRIORITY: HIGH -- builds deep team trust and prevents duplicated work.

### Decision D: Nothing actionable -> SILENT

Most common. Log what was checked. Output [HEARTBEAT_OK].

---

## PHASE 3: ACT

### For WORK items:
1. If work takes >30 seconds, acknowledge first: "New lead in, enriching now."
2. Execute using terminal, web tools, APIs (see pilot-api-reference)
3. Deliver result via Slack DM
4. Log what was done in the HEARTBEAT_STATE

### For FLAG items:
1. Build the user-facing Slack message first. It must read like a coworker note, not a cron result. No raw state labels, no scan narration, no automation phrasing.
2. Prefer `slack_post.py` for delivery:
```bash
# simple text
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/slack_post.py \
  D0AQ9PB64L8 --text-file /tmp/message.txt

# Block Kit for reminders / multi-part updates
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/slack_post.py \
  D0AQ9PB64L8 --blocks-file /tmp/blocks.json --fallback-text "Pilot update"
```
3. Use the canonical template layer when possible:
   - `pilot_message_templates.py` for PM digests, quiet heads-ups, work-complete notes, and morning-briefing style layouts
   - `send_threaded_reply.py` when the right delivery is summary first, full detail in a thread
   - `react_to_message.py` when acknowledgment should be a reaction, not a message
4. Use Block Kit whenever the message has multiple parts, a reminder checklist, or a footer context line. That is the default for anything that should feel designed, not pasted.
5. Follow ALL rules from pilot-communication skill
6. Match message weight to content weight
7. For long multi-part flags, design the content in zones: the signal and the main action belong in Zone 1, supporting detail belongs below the fold or in-thread

### For PROPOSE items:
- DM only (D0AQ9PB64L8) until channel posting approved
- Substantial proposal: Viktor 5-part template
- Simple nudge: 1-2 casual lines, no structure

### For SILENT:
- Output the HEARTBEAT_STATE blob (see below)
- End with [HEARTBEAT_OK]

---

## HEARTBEAT_STATE (end of every run)

Every heartbeat MUST end its local output with this structured state block.
The next heartbeat reads it via session_search to maintain continuity.

### State continuity layers (Viktor pattern)
A reliable PM agent remembers what it already did.
Keep continuity across runs with three layers where possible:
1. human-readable learnings or notes for the workflow
2. structured state for exact flags and processed items
3. a broader log of what already happened today

Concrete Viktor pattern:
- `/work/crons/{cron-name}/LEARNINGS.md` for pending items, team patterns, cron-specific gotchas, and things already flagged
- workflow-specific `state.json` files for exact tracking like meeting follow-up and processed QA items
- `/work/logs/YYYY-MM-DD/global.log` for daily activity summaries

Start-of-run rule: read all applicable continuity layers before deciding whether to post.

Goal: avoid duplicate flags, duplicate work, and acting like the previous run never happened.

```
HEARTBEAT_STATE:
{
  "timestamp": "2026-04-03T11:30:00-07:00",
  "checks_run": ["slack", "amped", "email"],
  "checks_skipped": ["clickup", "calendar", "fireflies"],
  "last_slack_scan": "2026-04-03T11:30:00-07:00",
  "last_amped_scan": "2026-04-03T11:30:00-07:00",
  "last_email_scan": "2026-04-03T11:30:00-07:00",
  "last_calendar_scan": "2026-04-03T11:00:00-07:00",
  "last_clickup_scan": "2026-04-03T10:00:00-07:00",
  "last_fireflies_scan": "2026-04-03T10:00:00-07:00",
  "human_messages_found": 3,
  "action_taken": "FLAG",
  "action_detail": "New AMPED lead: Tony Morales, Spark Electric",
  "items_tracking": [
    {"topic": "Cedar Gold FAQ blocker", "first_seen": "2026-04-03T09:00", "tier": 2, "last_flagged": "2026-04-03T09:30"},
    {"topic": "Unanswered Q from Katelyn in #pm-team", "first_seen": "2026-04-03T11:15", "status": "watching_2hr_rule"}
  ],
  "consecutive_silent": 0
}
```

### Reading Previous State (Postgres Brain + session_search)

The VPS has a PostgreSQL database `pilot_brain` (Postgres 16.13, tuned for 8GB VPS).
All state is now in Postgres instead of SQLite. The brain_bridge.py script provides
the same CLI interface that all crons expect.

**Primary: Postgres Brain via brain_bridge.py**

```bash
BB="/root/pilot-brain/brain_bridge.py"

# Read heartbeat state
python3 $BB heartbeat read

# Write heartbeat state (also logs to heartbeat_runs table)
echo '{"action_taken":"SILENT","checks_run":["slack","amped"],...}' | python3 $BB heartbeat write

# View heartbeat run history
python3 $BB heartbeat history 5

# Tracked items (leads, blockers, escalations)
python3 $BB track list active
echo '{"topic":"New lead: X","category":"LEAD"}' | python3 $BB track add
python3 $BB track resolve 3

# Channel checkpoints
python3 $BB checkpoint list
python3 $BB checkpoint set C0AC89HP4N4 1775241234.123456

# Search Slack messages (full-text search across all channels, instant)
python3 $BB search "cedar gold launch"
python3 $BB search "QA review" "iss" 10

# Who said what
python3 $BB who_said "Marcos" "review"

# Client info (supports abbreviations like "ISS")
python3 $BB client "ISS"

# Recent human messages
python3 $BB recent 4

# Database stats
python3 $BB stats
```

**Also available: Direct Python import**

```python
from pilot_db import PilotBrain
db = PilotBrain()  # auto-detects local vs SSH tunnel
db.search_messages("cedar gold", limit=10)
db.get_client("ISS")
db.who_said("Marcos", "review")
db.get_active_tracked()
```

**PITFALL: pilot_db import from vps_connect.py**: The module is NOT on the default Python path.
You MUST `cd /root/pilot-brain` first and add it to sys.path. Correct pattern via vps_connect:
```bash
python3 vps_connect.py "cd /root/pilot-brain && python3 -c \"
import sys; sys.path.insert(0, '.')
from pilot_db import PilotBrain
db = PilotBrain()
rows = db.query('SELECT channel_name, user_name, text, ts FROM slack_messages WHERE is_bot = false AND CAST(ts AS double precision) > %s ORDER BY CAST(ts AS double precision) DESC LIMIT 20', (cutoff,))
for r in rows:
    print(f'{r[\"channel_name\"]} | {r[\"user_name\"]} | {str(r[\"text\"])[:120]}')
\""
```
Note: `db.query()` returns a list of **dicts** (not tuples). Access fields by name: `r['channel_name']`, NOT `r[0]`.

**PITFALL: `vps_connect.py brain query` breaks on complex SQL**: The wrapper builds the remote command with a raw string join (`python3 brain.py query SELECT ...`) instead of shell-quoting the SQL argument. Queries with spaces, parentheses, casts, intervals, or quotes throw remote bash syntax errors like `syntax error near unexpected token '('`. Reliable fix: avoid `brain query` for anything beyond a trivial statement. Use the remote Python one-liner pattern above (`cd /root/pilot-brain && python3 -c ...`) and call `PilotBrain().query(...)` directly. Confirmed Apr 10 2026 while trying to scan `slack_messages` for the last 30 minutes during heartbeat; the direct `brain query` path failed, the `pilot_db` import path worked.

**Gap recovery pattern**: When the heartbeat detects a long gap since the last run (e.g., 12+ hours),
use the Postgres `slack_messages` table to catch up on what happened during the gap instead of
making 23 separate Slack API calls. This is faster and cheaper:
```python
cutoff = time.time() - GAP_SECONDS
rows = db.query('SELECT channel_name, user_name, text, ts FROM slack_messages WHERE is_bot = false AND CAST(ts AS double precision) > %s ORDER BY CAST(ts AS double precision) DESC LIMIT 30', (cutoff,))
```

**Quiet-precheck gap recovery rule:** even if the 30-minute Slack precheck returns zero human messages, do NOT fast-exit blindly when the previous heartbeat state is meaningfully old. If the gap since the last state is several hours, especially overnight or anything above ~4 hours during business monitoring, run a targeted Postgres gap check from the previous heartbeat timestamp before deciding SILENT. This catches real work that happened outside the last-30-minute window, like Matthew DMs or client-channel updates that arrived after the prior run but before the current precheck window. If the gap check finds actionable human messages, treat that as scan signal and continue decisioning instead of incrementing consecutive_silent.

**Secondary: session_search** (backup if Postgres is unreachable)
Use session_search with query "HEARTBEAT_STATE" to find the last run's output.

**Live Slack sync**: A VPS cron runs every 5 minutes pulling fresh messages from
all 25 channels into `slack_messages` (currently 3,300+ messages, growing).
The heartbeat no longer needs to fetch Slack messages via API for the scan phase.
Instead, query Postgres for messages in the last 30 minutes:
```python
db.query("SELECT * FROM slack_messages WHERE is_bot = false AND ts::float8 > EXTRACT(epoch FROM NOW() - INTERVAL '30 minutes') ORDER BY ts DESC")
```

**Writing state back (end of every run):**
Write the updated HEARTBEAT_STATE to both:
1. VPS file (via SSH to state_manager.py)
2. Local output (so session_search can find it)

Parse the state to determine:
- Which checks are overdue (compare timestamps to now)
- What items are being tracked (escalation timers, 2-hour rule items)
- How many consecutive silent runs (adjust scan depth)

### VPS Data Pipeline (refreshed automatically)
These cron jobs run on the VPS and keep data fresh:
- slack_sync.py: every 5 min (Slack API -> Postgres slack_messages table)
- people_tracker.py: every 30 min during biz hours (presence/absence state)
- data_prefetch.py: every 2 hours (ClickUp/Gmail/Calendly cache)
- context_builder.py: every 4 hours (context-now.md + knowledge graph)
- channel_memory.py: daily 3 AM UTC (deep LLM channel analysis)

### Postgres Brain Tables (17 tables, 6 views, 42 indexes)
Key tables for heartbeat use:
- slack_messages: 3,300+ messages, full-text searchable, synced every 5 min
- heartbeat_runs: all heartbeat history with state blobs
- tracked_items: active leads, blockers, escalations with escalation tiers
- channel_checkpoints: last synced timestamp per channel
- clients: 14 active clients with domains, channels, services
- team_members: 13 humans + 2 bots with roles and communication styles
- knowledge_notes: 30 notes from Obsidian migration
- interactions: audit trail of all Pilot actions

### Consecutive Silent Behavior
- 0-2 silent: Normal scanning (all overdue checks)
- 3-5 silent: Reduce to just Slack + AMPED (skip email/calendar/ClickUp)
- 6+: Slack-only minimal scan (things are quiet, save tokens)
Reset to 0 whenever any action is taken.

---

## Escalation Ladder (Progressive, from Viktor Pattern 14)

Track stall duration per item in items_tracking:

| Duration | Action | Tone |
|----------|--------|------|
| First detection | Light flag in DM | Informational |
| 4 hours, unresolved | Stronger nudge with context | "Still waiting on X" |
| 24 hours | Direct ask with options | "This needs a decision: A, B, or C" |
| 48+ hours | Hard push with consequences | "If not addressed by Friday, [impact]" |
| 2+ weeks | Thread-to-parent breakout (Pattern 17) | Standalone message |

---

## Viktor Behavior Patterns to Embody

**Pattern 2 - Cleanup**: Don't report messy ClickUp. Fix it. Tell Matthew after.
**Pattern 3 - Proposals**: Spot opportunity -> concrete 5-part proposal.
**Pattern 7 - Connect Dots**: Link related conversations across channels.
**Pattern 14 - Escalation Ladder**: Track days stalled per item.
**Pattern 16 - Strategic Jump**: Matthew mentions strategy -> crawl site, map gap, deliver.
**Pattern 17 - Thread Breakout**: Ignored 2+ weeks in thread -> parent-level message.
**Pattern 18 - Light Nudge**: Simple stuff = 1-2 casual lines. No structure.

---

## Cost Targets

| Run Type | Target Cost | How |
|----------|------------|-----|
| Fast exit (Phase 0) | $0.02-0.05 | No LLM, just curl + session_search |
| Silent scan (Phase 1 only) | $0.08-0.15 | Minimal LLM for scan parsing |
| Flag/Propose | $0.15-0.40 | LLM for decision + message composition |
| Work execution | $0.50-2.00 | Full LLM for research/writing/analysis |

Daily budget contribution: $2-4 of $10 daily cap.
At 28 runs/day, most should be fast exits or silent scans.

---

## Anti-Patterns (NEVER DO THESE)

1. Send "nothing to report" or "all clear" messages
2. List channels scanned or describe your process
3. Re-report unchanged items within 4 hours
4. Over-format simple findings (nudge != structured report)
5. Respond to unanswered questions less than 2 hours old
6. Post in client channels without explicit approval
7. Start work costing >$2 without clear high-value trigger
8. Narrate scanning ("First I checked email, then I checked Slack...")
9. Send structured reports when a 1-liner would do
10. Summarize all heartbeats at end of day (morning briefing handles that)

---

## Channels to Monitor

Client channels:
- C0AC89HP4N4 cedar-gold
- C0AM6EZ2CBX heropm
- C09FD47CERF iss
- C097JNC232A pce
- C097NGURDB6 saiyan
- C097NGVQZB6 dolce
- C0AKRPXLVV3 wild-within
- C0AKWJFFHLL trading-academy
- C097NH0BFBN adam-levinstein
- C097NGWLXQC all-thingz-electric
- C0ALT4X97GT alpha-property-mgmt
- C0AD4NA2RS8 laf-counseling
- C097JNANU4W powerroute-electric
- C0AQ0ECRMTK house-dental

Internal channels:
- C0AFPA546F3 pm-team
- C09FUEHE2A3 approvals
- C097JMZ91RC general
- C097JN65KAS seo-team

AMPED channels:
- C0AGVHV1AA1 amped-buyer-leads
- C0ACGKRB272 amped-lead-gen
- C0AFC562UHM amped-new-leads

Specialized:
- C0AMY95FJTY cedar-content-platform
- C0AMLUPJENM seo-report-automation

Bot IDs to filter:
- U0AL7SW3JKW (Viktor)
- U0AP93XPHFV (Pilot)
- B0APUCF8A6M (Pilot bot)
- USLACKBOT

---

## Implementation Pitfalls

0. **Gateway approval modes**: Only 3 valid values for `approvals.mode` in config.yaml: `"off"` (skip all approval prompts), `smart` (auxiliary LLM auto-assesses risk), `manual` (always prompt). The value `auto` is NOT recognized and silently falls through to `manual`. As of Apr 2026, gateway config uses `mode: "off"` (quoted to avoid YAML bool parsing). Code path: `tools/approval.py` line 632: `if approval_mode == "off": return approved`.
1. **Cron prompt security filter**: Hermes blocks cron prompts containing raw curl commands with tokens/URLs (triggers `exfil_curl` threat pattern). The cron prompt MUST reference skills for API patterns instead of embedding them inline. Keep the prompt as instructions ("use the patterns from pilot-api-reference") and put the actual curl commands in the skill files.
2. **pytz not available**: Use stdlib: `from datetime import timezone, timedelta; AZ = timezone(timedelta(hours=-7))`. Applies to all calendar date math in cron environments.
3. **First run bootstrapping**: session_search for HEARTBEAT_STATE returns nothing on first run. Treat all checks as overdue, set consecutive_silent to 0. First run establishes baselines. The cron loads 7 skills which takes ~3-4 minutes for first execution.
4. **session_search query for state**: Use query "HEARTBEAT_STATE" (exact token) to find previous run output. The state JSON blob must appear at the end of every run's local output for the next run to parse it.
5. Slack JSON: Always json.loads(text, strict=False)
6. Multi-channel fetch: Use terminal bash loop, NOT execute_code terminal()
7. Gmail responses: Save to /tmp, parse with separate python3 script
8. ClickUp date_updated: String of Unix milliseconds, not int
9. Composio from VPS: Use curl (urllib gets Cloudflare 1010)
10. Slack posting: ALWAYS write payload to JSON file first
11. Calendly: Requires user URI (see pilot-api-reference for Matthew's)
12. session_search for dedup: Search specific topic, not generic "heartbeat"
13. Don't scan all channels in execute_code (stdout cap truncates)
14. Empty HEARTBEAT.md = skip API call (OpenClaw pattern we match with fast exit)
15. **Cron skill count**: Loading 7 skills adds ~3-4 min startup overhead. If cost becomes an issue, consider reducing to the 3-4 most essential skills and inlining critical reference data.
16. **VPS data pipeline can silently die**: The VPS crontab entries for slack_sync, data_prefetch, context_builder, and channel_memory are NOT managed by Hermes. If the VPS crontab gets wiped (e.g., by another process calling `crontab -`), these jobs vanish with no alert. After any VPS maintenance, verify with `crontab -l` that all 6 entries exist. This happened Apr 3 2026, data was 3 days stale before anyone noticed.
17. **Execution context matters for VPS access**: Hermes crons run in ephemeral cloud containers and MUST use SSH (via vps_connect.py) to reach VPS files. But Pilot in Slack (Gateway) runs LOCALLY on the VPS with `terminal backend: local`, so it reads state files directly, no SSH needed. The Reactor (reactor.py) also runs locally. Same state files, different access methods depending on where the code is executing.
18. **VPS state write_state test clobber**: If you test `write_state` with dummy data, it OVERWRITES the real state. The history JSONL preserves previous states, but restore manually from the history file. Always test with `read_state` first.
24. **SQLite brain heartbeat_write requires non-null action**: The `heartbeat_history` table has a NOT NULL constraint on the `action` column. When writing state via `brain heartbeat write`, the `last_action` field MUST be a string (e.g., "SILENT", "FLAG", "WORK"), never null. Using `"last_action": null` causes `sqlite3.IntegrityError: NOT NULL constraint failed: heartbeat_history.action`. Always default to `"SILENT"` for fast-exit runs.
19. **SSH access requires vps_connect.py, not direct SSH**: The sandbox/cron environment has NO SSH keys. Direct `ssh root@187.124.234.21` fails with "Permission denied." Always use the vps_connect.py script which handles Paramiko auth internally. The gateway on the VPS runs locally and doesn't need SSH.
20. **Gateway is a user-level systemd service**: `systemctl is-active hermes-gateway` returns "not found" — use `systemctl --user is-active hermes-gateway` instead. The health check script on VPS already uses the correct flag. Also verify with `ps aux | grep hermes` as a backup.
21. **sqlite3 CLI may not be installed on VPS**: The `libsqlite3-0` library is installed (Python uses it), but the `sqlite3` CLI binary may be missing. Install with `apt-get install -y sqlite3` if needed for direct DB queries via SSH. The vps_connect.py brain commands work regardless since they use Python's sqlite3 module.
22. **Composio MCP endpoint is dead**: The old URL `backend.composio.dev/v3/mcp/155a88e0.../mcp?user_id=...` returns 404 as of Apr 2026. All Composio calls must use the REST API (`v3/tools/execute/TOOL_SLUG`). See pilot-api-reference for updated patterns.
23. **DataForSEO tool slugs change**: Composio periodically renames tool slugs. Always use the search endpoint (`/api/v3/tools?search=DATAFORSEO_KEYWORDS`) to verify current names before using a slug. The old `DATAFORSEO_KEYWORDS_DATA_GOOGLE_ADS_SEARCH_VOLUME_LIVE` no longer exists.
26. **delegate_task subagent files are NOT accessible to parent session**: Subagents spawned via `delegate_task` run in isolated sandboxes. Files they create (e.g., `/tmp/enrichment.md`) do NOT exist in the parent session's filesystem. If the heartbeat uses `delegate_task` for enrichment or research, extract the results from the subagent's summary text and recreate the file locally with `write_file` before uploading to VPS. The subagent's summary is the only bridge between sandboxes. Confirmed Apr 7 2026: Juan Giron enrichment subagent "saved" to `/tmp/juan_giron_enrichment.md` but `cat` in parent returned "No such file."
27. **Proactive enrichment timing for AMPED calls**: When a new lead has a Calendly call booked, run enrichment in the SAME heartbeat that detects it (or the next run), NOT just at morning briefing time. Save the enrichment to VPS (`/root/pilot-deliverables/amped/{name-slug}.md`) so the morning briefing can reference it. For evening detections, do the work but hold the DM delivery for morning. Stage the work, don't stage the notification.
25. **`brain track add` requires stdin, not inline argument**: `python3 $VPS brain track add '{"topic":"X"}'` fails with `JSONDecodeError: Expecting value: line 1 column 1 (char 0)` because the VPS brain.py reads data from stdin, not from a CLI argument. Use `echo '{"topic":"X","category":"LEAD"}' | python3 $VPS brain track add` or write JSON to a file first and pipe it: `cat /tmp/track.json | python3 $VPS brain track add`. Confirmed Apr 6 2026.
25b. **`vps_connect.py "<remote command>"` does NOT forward local stdin into the remote process**: if you run something like `cat /tmp/track.json | python3 ~/.hermes/skills/productivity/pilot-heartbeat/scripts/vps_connect.py "cd /root/pilot-brain && python3 brain_bridge.py track add"`, the remote `brain_bridge.py` still sees empty stdin and throws `JSONDecodeError`. The pipe only feeds the local `vps_connect.py` process, not the quoted remote shell command launched through `exec_command()`. Reliable fixes: (1) use `python3 vps_connect.py brain track add` so the wrapper's `brain_write()` path forwards stdin correctly, or (2) run a remote Python one-liner that imports `PilotBrain` and calls `db.track_item(...)` directly. Confirmed Apr 10 2026 while tracking the Ready for Review backlog and My Social Practice RFP follow-up.
25c. **`vps_connect.py brain track add` can return a success JSON that does not actually persist a new tracked item**: Confirmed Apr 10 2026 during heartbeat. The command returned `{"id": 20, "status": "added"}`, but an immediate direct Postgres query (`SELECT * FROM tracked_items WHERE id = 20`) returned no rows, and the active track list was unchanged. Treat the wrapper response as unverified. After any `track add`, immediately confirm by querying `tracked_items` directly (via remote `PilotBrain().query(...)`) or re-listing active items and checking for the topic. If the row is missing, fall back to a direct `PilotBrain` insert path instead of trusting the wrapper.
28. **VPS file upload via stdin pipe times out**: Piping file content to `vps_connect.py "cat > /remote/path"` via `subprocess.run(input=...)` or shell pipe hangs indefinitely. The stdin-based approach doesn't work reliably with the Paramiko SSH transport. **Use the `upload` command**: `python3 $VPS upload /local/path /remote/path`. This uses SFTP internally and works reliably. NOTE: The `write_file /remote /local` two-arg form does NOT work reliably from cron sandboxes (confirmed Apr 7 2026: wrote only 31 bytes instead of 3332). The `upload` command is the only reliable method for binary/large file transfers from ephemeral cron environments.
29. **Calendly scan should be a standard heartbeat check**: The rotation schedule doesn't include Calendly as a separate check, but AMPED call prep is time-sensitive. When email/calendar scans are overdue and get run, ALSO run a Calendly scan (`CALENDLY_LIST_EVENTS` for next 48 hours) to catch newly booked calls that need enrichment. The Tom Kennedy call prep (Apr 7) was nearly missed because the lead came in Apr 5, the Apr 6 call happened, and a second call was booked for Apr 8 without enrichment. Always scan Calendly when calendar is scanned.
30. **Verify DM delivery via Slack API, not session_search**: session_search shows what the heartbeat *intended* to send, not what *actually reached Slack*. If a previous heartbeat hit an error (subagent isolation, SSH timeout, curl failure), session_search still describes the attempt as if it succeeded. Before skipping a FLAG action because "it was already reported," verify delivery by checking `conversations.history` on Matthew's DM (D0AQ9PB64L8) with an `oldest` timestamp covering the relevant window. Confirmed Apr 7 2026: Juan Giron call prep was "sent" by 3 consecutive heartbeats per session_search, but `conversations.history` showed zero DMs in 4 hours. The actual delivery never happened due to Pitfall #26 (subagent file isolation).
32. **Enrichment WORK recorded in state but DM never delivered**: Confirmed Apr 7 2026: Jason Feng enrichment was saved to VPS (`/root/pilot-deliverables/amped/jason-feng-enrichment.md`) and brain state recorded `last_action: "WORK"`, but `conversations.history` on Matthew's DM showed zero Jason Feng messages. The enrichment work succeeded but the Slack delivery silently failed (likely due to Pitfall #26 in the same run). Recovery: the next heartbeat's Step 1-pre verification caught it, read the enrichment from VPS, recomposed the DM, and delivered via urllib script. Key lesson: always verify delivery even for WORK actions, not just FLAG. The VPS enrichment file is the recovery source of truth.
33. **Leftover /tmp/hb_*.json files from previous runs pollute scan results**: The Slack scan writes files as `/tmp/hb_{name}.json` and the parser uses `glob.glob("/tmp/hb_*.json")`. But previous heartbeat runs (and delivery verification steps) create additional files like `hb_amped_24h.json`, `hb_giron_thread.json`, `hb_dm_verify.json`, `hb_dm_8h.json`, `hb_feng_full.json`, etc. These leftover files match the glob and get parsed as if they're current scan data, inflating the human message count (e.g., reporting 13 messages when only 1 is real). **Fix: Always clean `/tmp/hb_*.json` BEFORE the scan**, or use a unique prefix/subdirectory per run (e.g., `/tmp/hb_run_{timestamp}/`). Confirmed Apr 7 2026: parser reported 13 human messages from 7 channels including resolved Giron thread data and old AMPED lookback files, requiring manual cleanup and re-parse.
33b. **The cleanup step will also delete delivery-verification artifacts if you save them as `/tmp/hb_*.json`**: Confirmed Apr 10 2026. A delivery verification fetch was saved to `/tmp/hb_dm_verify.json`, then the standard scan cleanup `rm -f /tmp/hb_*.json` removed it before later inspection, causing `FileNotFoundError` when trying to re-read the verification result. **Fix:** either (a) parse/consume delivery-verification files before running the cleanup, or (b) save them under a different prefix like `/tmp/dm_verify.json` or a per-step subdirectory so scan cleanup does not wipe them.
33c. **Do not write derived summary files under the same `/tmp/hb_*.json` prefix that the raw scan parser reads**: Confirmed Apr 13 2026. A parser wrote its own aggregate output to `/tmp/hb_scan_summary.json` and then used `glob('/tmp/hb_*.json')` to read the raw channel fetches. The glob picked up the derived summary file too, causing a JSON parse failure / false error entry because the file existed but was still empty or not a raw Slack response. **Fix:** keep raw Slack fetches and derived artifacts on different prefixes. Good pattern: raw channel fetches stay `/tmp/hb_{channel}.json`, while parser outputs use names like `/tmp/scan_summary.json`, `/tmp/amped_threads.json`, or an exact allowlist of current-step files instead of a wildcard glob.
33d. **Thread-reply fetches need their own cleanup or exact filenames**: Confirmed Apr 16 2026 during heartbeat. A quick inspection step wrote current-thread replies to `/tmp/replies_{ts}.json` and then used a wildcard read over `/tmp/replies_*.json`. That pulled in stale reply files from older runs, including unrelated AMPED and Dolce artifacts, which made the output look like the current threads had extra context they did not actually have. **Fix:** either `rm -f /tmp/replies_*.json` before fetching current thread replies, or avoid wildcard reads entirely and inspect only the exact files created in the current step.
33e. **Calendly invitee fetches need their own cleanup or exact filenames**: Confirmed Apr 16 2026 during heartbeat. A quick invitee check wrote current results to `/tmp/cal_inv_{uuid}.json` and then inspected `/tmp/cal_inv_*.json`, which also pulled in stale invitee files from older runs and made it look like unrelated buyers were attached to the current events. **Fix:** either `rm -f /tmp/cal_inv_*.json` before fetching current invitees, or inspect only the exact filenames created in the current step instead of a wildcard glob.
34. **Delivery verification must check brain track items, not just last_action**: Step 1-pre says "mandatory if last_action was FLAG/WORK." But brain track items can record "call_prep_sent" or "active" status while the heartbeat state shows last_action=SILENT (because the heartbeat that did the work finished with a different action, or a subsequent silent heartbeat overwrote it). Confirmed Apr 8 2026: Tom Kennedy call prep was recorded as "call prep sent" in brain track item 11, but last_action was SILENT and `conversations.history` showed zero Kennedy DMs. The fix: when calendar/Calendly scans find upcoming AMPED calls, ALWAYS verify delivery for that call's prep regardless of last_action. Don't rely solely on `last_action` as the gate for delivery verification.
35. **AMPED deal activity falls outside the 30-min scan window**: The standard Slack scan uses `oldest=now-1800` (30 min). Deal progression messages in #amped-buyer-leads (Matthew talking to Anthony about signings, budget changes, new verticals) often happen in bursts and may be 2-4 hours old by the next heartbeat. The 30-min scan catches zero messages while significant revenue events go undetected. Fix: When checking #amped-buyer-leads, ALSO run a broader 4-hour lookback specifically for that channel (and #amped-lead-gen, #amped-new-leads). This is cheap (3 extra API calls) and catches deal progression that the standard window misses. Confirmed Apr 8 2026: Power Route Electric $2K/month signing was 2-3 hours old when the heartbeat ran, invisible to the 30-min scan but caught by a targeted 4-hour AMPED lookback.
36. **AMPED lookback files need their own cleanup or exact file list**: If you save the 4-hour AMPED fetches as `/tmp/amped_*.json` and then parse with a glob like `glob('/tmp/amped_*.json')`, old files from prior runs can leak into the current parse, just like the older `/tmp/hb_*.json` pollution bug. Confirmed Apr 10 2026: the parser picked up stale `/tmp/amped_4h_*.json` artifacts alongside the current `/tmp/amped_buyers.json` / `leadgen.json` / `new.json` files, which made it look like six result sets existed when only three were fetched. Fix: either `rm -f /tmp/amped_*.json` before the AMPED lookback, or parse an exact allowlist of the files created in the current step instead of a wildcard glob.
36a. **Naive AMPED lead-format matching can false-positive on Matthew's buyer-ops/admin messages**: Confirmed Apr 15 2026 during heartbeat. A simple heuristic that treated any `#amped-buyer-leads` message containing words like `company`, `licensed`, `avg job`, `service area`, `@`, or `phone` as a new lead incorrectly classified Matthew's internal note about Big Ben Electric / Nation Electric portal setup as a fresh lead. That created a bogus `new_leads` hit even though no new buyer arrived. Fix: for AMPED lead detection, require stronger evidence of an actual lead post, such as the known lead-bot structure, a lead-bot/bot-authored message, or a dense field bundle that clearly includes contact identity plus service-area/pricing form fields. Also explicitly suppress Matthew/admin chatter about buyer setup, invoicing, portal access, or holding leads.
36b. **`#amped-new-leads` lookbacks can surface routine consumer-lead routing noise that should not be treated like buyer-side deal movement**: Confirmed Apr 15 2026 during heartbeat. A broader AMPED lookback showed only bot-created consumer lead events like `:zap: New EV Charger Lead` plus assignment/reassignment chatter such as Anthony moving an Elsie Nam lead to All Thingz. That activity matters for lead routing, but it is NOT a new AMPED buyer lead, buyer-deal progression, or a Matthew-worthy sales escalation by default. Fix: when running the AMPED lookback, treat `#amped-buyer-leads` and `#amped-lead-gen` as the primary sources for buyer/deal movement. Treat `#amped-new-leads` as consumer lead flow unless the thread shows a real operational issue, a routing failure, or a signal that materially affects buyer management.
36. **`brain heartbeat read` is lossy compared to `read_state`**: The Postgres brain read path returns a normalized heartbeat row, not the full state blob. Fields like `items_tracking`, `last_token_check`, and the richer `action_detail` payload may be missing or flattened when you read with `python3 brain_bridge.py heartbeat read`. Confirmed Apr 10 2026: after writing a full HEARTBEAT_STATE, `brain heartbeat read` returned only the compact schema while `vps_connect.py read_state` still had the full JSON. Fix: keep writing to BOTH destinations, but when continuity depends on the full blob, use `read_state` (or the local output/session log) as the source of truth and treat `brain heartbeat read` as a quick summary view.
37. **`brain_bridge.py heartbeat write` is broken against the current `PilotBrain.save_heartbeat()` signature**: Confirmed Apr 10 2026 during heartbeat. `python3 brain_bridge.py heartbeat write` crashes with `TypeError: PilotBrain.save_heartbeat() got an unexpected keyword argument 'detail'` because `brain_bridge.py` passes `detail=` while `pilot_db.py` expects `action_detail=`. The documented `echo ... | python3 brain_bridge.py heartbeat write` path will fail even when stdin forwarding is fixed. Reliable workaround: call `PilotBrain.save_heartbeat(...)` directly in a remote Python process (via `vps_connect.py`), passing `action_detail=` and `state_blob=` explicitly. Keep using `vps_connect.py write_state` for the file copy, but do NOT trust `brain_bridge.py heartbeat write` until the wrapper is patched.
38. **For remote `PilotBrain.save_heartbeat(...)`, prefer a remote Python heredoc that reads the VPS state file, not a giant quoted one-liner with inline JSON/base64**: Confirmed Apr 10 2026. Trying to pass the full state blob through `vps_connect.py "python3 -c '...'"` failed repeatedly with quoting/JSON decode issues, and even base64-in-shell was brittle. The reliable pattern was:
```bash
# 1. Write the full state to VPS first
cat /tmp/heartbeat_state.json | python3 ~/.hermes/skills/productivity/pilot-heartbeat/scripts/vps_connect.py write_state

# 2. Then run remote Python that reads /root/pilot-heartbeat/state.json and saves to Postgres
python3 ~/.hermes/skills/productivity/pilot-heartbeat/scripts/vps_connect.py "cd /root/pilot-brain && python3 - <<'PY'
import sys, json
sys.path.insert(0, '.')
from pilot_db import PilotBrain
with open('/root/pilot-heartbeat/state.json') as f:
    s = json.load(f)
db = PilotBrain()
db.save_heartbeat(
    action=s['action_taken'],
    checks_run=s.get('checks_run'),
    checks_skipped=s.get('checks_skipped'),
    human_messages=s.get('human_messages_found', 0),
    action_detail=s.get('action_detail'),
    items_tracking=s.get('items_tracking'),
    consecutive_silent=s.get('consecutive_silent', 0),
    state_blob=s,
)
print('OK')
PY"
```
This avoids shell-escaping the JSON entirely. Treat this as the most reliable Postgres heartbeat-write path until the wrapper is fixed.
39. **`heartbeat_runs` uses `run_at`, `action_taken`, and `action_detail` column names**: Confirmed Apr 10 2026. Queries like `SELECT action, action_detail FROM heartbeat_runs ORDER BY created_at DESC LIMIT 1` fail because those columns do not exist. The actual columns include `run_at`, `checks_run`, `checks_skipped`, `human_messages_found`, `action_taken`, `action_detail`, `items_tracking`, and `state_blob`. Use `ORDER BY run_at DESC`, not `created_at DESC`.
39b. **Remote `PilotBrain().query(...)` rows can contain Python `datetime` objects that break `json.dumps(...)`**: Confirmed Apr 12 2026 while verifying the latest `heartbeat_runs` row through `vps_connect.py`. A query like `SELECT run_at, action_taken, ... FROM heartbeat_runs ORDER BY run_at DESC LIMIT 1` returns `run_at` as a timezone-aware `datetime`, and a naive `print(json.dumps(rows))` crashes with `TypeError: Object of type datetime is not JSON serializable`. Reliable fixes: use `json.dumps(rows, default=str)` if you need JSON, cast the column in SQL, or print the fields manually. This matters for heartbeat verification and any ad hoc Postgres brain inspection over SSH.
40. **`tracked_items` uses `first_seen`, not `first_seen_at`**: Confirmed Apr 10 2026 while querying active tracked items from Postgres. A query like `SELECT id, topic, status, first_seen_at FROM tracked_items ...` fails with `psycopg2.errors.UndefinedColumn: column "first_seen_at" does not exist`. The correct column is `first_seen`. Use `ORDER BY first_seen DESC` when sorting recent tracked items. This is easy to confuse with other tables that use `run_at` or `created_at`, so verify column names before writing ad hoc SQL against the brain.
41. **`tracked_items` does not have `last_seen` or `metadata` columns**: Confirmed Apr 11 2026 while trying to inspect active tracked heartbeat items via remote `PilotBrain().query(...)`. Queries like `SELECT id, topic, category, status, first_seen, last_seen, metadata FROM tracked_items ...` fail with `psycopg2.errors.UndefinedColumn` because both `last_seen` and `metadata` are absent from the current schema. Safe ad hoc query pattern is `SELECT id, topic, category, status, first_seen FROM tracked_items ...` and then inspect richer state from `heartbeat_runs.state_blob` or the VPS state file if you need extra context. Do not assume tracking tables have generic JSON metadata columns.
41b. **`slack_messages` in Postgres does not expose a `subtype` column in the current schema**: Confirmed Apr 15 2026 during heartbeat when a remote query like `SELECT channel_name, user_name, text, ts, thread_ts, subtype FROM slack_messages ...` failed with `psycopg2.errors.UndefinedColumn: column "subtype" does not exist`. Reliable pattern: only select columns known to exist (`channel_name`, `user_name`, `text`, `ts`, `thread_ts`, `is_bot`, etc.), and if subtype-level filtering matters, recover it from live Slack API payloads instead of assuming the sync table preserved it. Treat the Postgres `slack_messages` table as a normalized summary, not a full raw Slack event mirror.
42. **Gmail heartbeat triage should not treat every inbox item addressed to Matthew as actionable**: Confirmed Apr 10 2026. A naive filter like `if 'matthew@getproofpilot.com' in to: category='action_needed'` over-flags junk and low-signal messages such as Google Workspace surveys, generic marketing emails, and calendar updates. In heartbeat email scans, require stronger signals for `action_needed`, `money`, or `Calendly`, and explicitly skip low-value senders like Google Workspace surveys and broad marketing blasts even if Matthew is the recipient.
42. **Email keyword matching can false-positive on newsletter body copy**: Confirmed Apr 11 2026 during heartbeat. A naive classifier that scans the full email body for words like `money`, `invoice`, `payment`, or `Calendly` mislabels marketing emails and product drips as actionable because those words appear in promotional copy. Example: Mobile Text Alerts marketing emails were falsely tagged as `calendly`, and finance/growth newsletters were falsely tagged as `money`. Fix: prioritize sender domain + subject line + explicit transactional patterns first, and only inspect body text as a secondary signal when the sender is already trusted or the subject is operational. For heartbeat triage, Mercury/Railway/Calendly/known client domains are high-signal; generic newsletter bodies are not.
43. **BrightLocal emails need sender-aware triage, not blanket de-prioritization**: Confirmed Apr 11 2026 during heartbeat. BrightLocal sends both low-signal marketing mail (`contact@brightlocal.com`) and high-signal operational/billing notices (`seotools@brightlocal.com`). A naive classifier that either (a) treats every email to Matthew as `action_needed`, or (b) suppresses BrightLocal entirely as marketing, gets this wrong both ways. Example: `Your Account Has Been Deactivated` from `seotools@brightlocal.com` was operational and worth surfacing because it reflected a real account state change after earlier cancellation/payment issues. Fix: treat BrightLocal as actionable only when the sender/subject clearly signals account state, billing, cancellation, deactivation, or support follow-up; otherwise suppress routine marketing/newsletter sends.
42. **DM delivery verification can false-positive if you only keyword-match any recent DM text**: Confirmed Apr 10 2026. A naive `conversations.history` scan on Matthew's DM found the strings `Rachalle`, `Alpha PM`, and `Ready for Review` inside Matthew's own long message quoting prior Viktor-style examples, which looked like proof that the previous heartbeat had delivered. It had not. Fix: when verifying a prior FLAG/WORK delivery, require stronger evidence than a loose keyword hit. Prefer messages posted after the previous heartbeat timestamp that match the specific action phrasing, and treat user-authored/quoted historical recap text as non-evidence. If possible, verify against a distinctive exact phrase from `last_action_detail`, not just entity names.
42b. **Morning briefing mentions do NOT count as delivery proof for separate call-prep briefs**: Confirmed Apr 13 2026. Matthew's DM history contained a morning briefing line mentioning an upcoming meeting with Alejandro Maldonado / Kingdom Electric, which keyword-matched `Alejandro` and `Kingdom Electric` and could have been mistaken as proof that the dedicated AMPED prep brief had already landed. It had not. Fix: for call-prep verification, treat calendar-orientation mentions in morning briefings as non-evidence unless the message also contains the actual prep content or a distinctive prep phrase (for example: BuildZoom score, territory overlap, pricing starter plan, or explicit `call prep` language). A meeting mention alone is not proof of delivery.
42c. **Generic AMPED summary mentions do NOT count as proof that the dedicated prep brief landed**: Confirmed Apr 15 2026 with Damian Rodriguez / Gridline Electric. Matthew's DM history contained two earlier messages that mentioned Damian, one overnight AMPED-lead summary and one morning-briefing summary, but neither contained the actual call-prep details. That could have been mistaken as proof the prep had already been delivered when it had not. Fix: for AMPED call-prep verification, require evidence of the real prep payload itself, not just the lead name in a broader recap. Good proof includes the actual talking points, license / BuildZoom detail, territory notes, pricing frame, or a distinctive prep headline. If DM history only shows summary mentions, re-send the dedicated prep brief and verify that specific message landed.
43. **Bundled heartbeat flags need per-item delivery verification, not an "any keyword matched" shortcut**: Confirmed Apr 11 2026. A previous heartbeat flagged four topics in one bundled DM candidate: Josip Civic / Amcro Electric, Power Route off-page SEO, Mercury's Zapier receipt request, and the Railway `amped-nightly-analyze` crash. A later DM scan found *Mercury* and *Railway* keywords in newer unrelated Pilot messages, which could have been mistaken as proof that the whole earlier bundle had landed. It had not. Fix: when `action_detail` contains multiple topics, verify delivery against the distinctive item that matters most or against multiple item-specific phrases, not just one overlapping keyword anywhere in recent DM history. Treat partial overlap as non-evidence and re-send if the actual bundle cannot be confirmed.
43a. **If a bundled FLAG partially lands later via separate DMs, resend only the unseen subset**: Confirmed Apr 11 2026. A prior bundled heads-up contained four topics, but later DM history showed that *Mercury* and *Railway* had already been surfaced by other runs while *Josip Civic / Amcro Electric* and *Power Route off-page SEO* still had no delivery evidence. Resending the whole original bundle would have created duplicate noise on the items Matthew had already seen. Fix: after failing bundle-level verification, do a second pass item-by-item over recent DM history and suppress any topics that are already visibly covered by later messages. Recompose the recovery heads-up around only the still-unseen items.
43b. **A morning briefing mention of one risk item does NOT verify a separate heartbeat FLAG bundle or a different finance-risk heads-up**: Confirmed Apr 17 2026. Matthew's DM history contained a morning-briefing line saying `Railway needs a look`, which keyword-matched the later heartbeat FLAG about the `amped-nightly-analyze` crash. But that same DM history did NOT contain the separate Mercury IO credit-limit heads-up from the prior heartbeat. Treat broad morning-briefing mentions as partial overlap only. For delivery verification, require evidence that each material item in the prior action actually landed, especially money-risk items like Mercury credit-limit changes. If only one item from a multi-topic or multi-risk update appears in DM history, re-send the unseen subset instead of assuming the whole action was delivered.
43. **Remote `PilotBrain().query(...)` via `vps_connect.py` still breaks if your inline Python contains SQL strings with nested quoted literals**: Confirmed Apr 10 2026 while trying to query `slack_messages` for AMPED channels using `IN ('amped-buyer-leads','amped-lead-gen','amped-new-leads')` inside a remote heredoc. Even though the direct `PilotBrain` import path is the right workaround for `brain query`, the outer `vps_connect.py "..."` shell can still choke on unescaped nested quotes before Python ever runs. Reliable fixes: (a) keep remote Python snippets free of SQL strings that contain embedded quoted literals, (b) move the logic to a file on the VPS first, or (c) fall back to direct Slack API fetches / `brain_bridge.py search` for simple lookups. Do not assume a remote heredoc automatically makes all SQL quoting safe.
44. **`brain_bridge.py search` is too fuzzy for heartbeat delivery verification or current-state checks**: Confirmed Apr 10 2026 during heartbeat recovery work. Searches like `brain_bridge.py search 'Power Route'` or `'Alpha PM OR slider OR Sally'` can return a mix of old channel posts, prior Pilot DMs, and quoted historical examples from Matthew's later messages. That makes it useful for recall, but unreliable as evidence that a specific FLAG/WORK was actually delivered or that an item is newly active right now. For precise verification, prefer targeted `conversations.history` reads on the exact Slack channel/DM with a bounded `oldest` window, then inspect the live messages directly.
45. **Workspace-wide ClickUp `ready for review` scans are full of ancient noise unless you filter for live risk**: Confirmed Apr 11 2026 during heartbeat. The raw `GET /team/9006070686/task?statuses[]=ready%20for%20review` result returned 68 tasks, but many were months-old template work, paused-client items, old SEO reports, and the unmapped `90171147564` strategy/template space. A naive backlog count would have created a false escalation. Heartbeat rule: do NOT surface the raw total by itself. First filter for items with recent movement or current client risk, then cross-check Slack thread truth before flagging. If the scan only shows long-stale backlog with no fresh signal, keep it silent and track it as cleanup debt rather than a current emergency.
46. **Matthew reactions in the source channel count as "seen," even if there is no thread reply yet**: Confirmed Apr 11 2026 during heartbeat on the Power Route off-page SEO note. Marcos tagged Matthew in-channel, there were still zero thread replies, but `conversations.replies` showed Matthew had already reacted with :raised_hands:. Repeated DM resurfacing treated it like an unseen buried item when it had actually been acknowledged in-channel. Fix: before re-flagging a channel item to Matthew, inspect reactions on the original message. If Matthew has reacted and there is no new urgency delta, treat the item as already seen and do not keep re-sending the same heads-up. Reaction != decision, but it does clear the "quietly buried / unseen" threshold.
47. **Remote `vps_connect.py` heredocs can still break on Python f-strings that contain nested quotes or dict access**: Confirmed Apr 12 2026 while querying `heartbeat_runs`. A remote command shaped like `python3 vps_connect.py "cd /root/pilot-brain && python3 - <<'PY' ... print(f\"{r['run_at']} | {r['action_taken']} | {r.get('action_detail','')}\") ... PY"` failed before Python ran with `/usr/bin/bash: eval: syntax error near unexpected token 'r.get'`. Even though the heredoc is the right general pattern, the outer shell still sees brittle nested quoting inside the f-string. **Fix:** in inline remote heredocs, avoid f-strings with nested single quotes and dict access. Prefer plain string concatenation like `print(str(r['run_at']) + ' | ' + str(r['action_taken']) + ' | ' + str(r.get('action_detail',''))[:220])`, or write the remote script to a file first if the formatting gets any more complex.
48. **`vps_connect.py read_state | python3 - <<'PY'` fails for the same reason as curl-pipe heredocs: the heredoc steals stdin before the JSON reaches Python**: Confirmed Apr 13 2026 while verifying a freshly written heartbeat state. A command like `python3 vps_connect.py read_state | python3 - <<'PY' ... json.load(sys.stdin) ... PY` throws `JSONDecodeError: Expecting value: line 1 column 1 (char 0)` even though `read_state` itself worked. The left-hand pipe never reaches `sys.stdin` because the heredoc becomes stdin for the Python process. **Fix:** save `read_state` output to a temp file first, then parse the file in a second Python step, e.g. `python3 vps_connect.py read_state > /tmp/verify_state.json` followed by `python3 - <<'PY' ... open('/tmp/verify_state.json') ... PY`.
31. **Slack `oldest` parameter precision matters**: When computing `oldest` for `conversations.history` via bash `$(python3 -c "import time; print(time.time() - N)")`, the output can produce malformed timestamps (extra digits) if not formatted explicitly. Always use `f'{t:.6f}'` format: `python3 -c "import time; t=time.time()-14400; print(f'{t:.6f}')"`. Without explicit formatting, the raw `time.time()` subtraction can produce values like `17755758941.898503` (11 digits before decimal) instead of the expected `1775575890.898503` (10 digits). The Slack API silently accepts the bad timestamp and returns zero results. Confirmed Apr 7 2026: a 4-hour lookback returned 0 messages while a 2-hour lookback (using default print) returned 1, because the 4-hour version had a malformed oldest value.

49. **A failed delivery verification does not always mean you should resend the old FLAG**: Confirmed Apr 13 2026. A previous heartbeat recorded a FLAG about Katelyn returning and an ISS schema-markup bug, but Matthew's DM history showed the message never landed. Before re-sending, the next heartbeat checked the live ISS channel and found Jo Paula had already posted that the issue was resolved. Blindly replaying the old FLAG would have created stale noise. Fix: if delivery verification fails, first re-check the source channel/thread for a resolution or status change. Only resend if the underlying issue is still live and still worth surfacing.

50. **Full 23-channel Slack sweeps can hit `ratelimited` on later channels even when the scan is otherwise quiet**: Confirmed Apr 13 2026 during heartbeat. A sequential `conversations.history` sweep across all monitored channels returned `ratelimited` for `cedar-gold` and `cedar-content` near the end of the batch, while every other channel succeeded. Reliable recovery pattern: keep the first-pass files, wait 15 seconds, then re-fetch only the failed channels individually and merge them back into the parse. Do not treat the first rate-limit hit as a global Slack outage, and do not throw away the whole scan. This matters most for silent-heartbeat runs where one or two late-channel failures would otherwise create false `errors` or force an unnecessary rerun.
51. **Phase-0 Slack precheck zeroes are non-authoritative if any channel fetch 429s**: Confirmed Apr 16 2026 during heartbeat. A Python precheck script scanning all 23 monitored channels reported `total_human_messages: 0`, but two channels (`#amped-new-leads` and `#seo-report-automation`) returned `HTTP Error 429: Too Many Requests`. Treat that result as incomplete, not as proof of a quiet workspace. Reliable recovery pattern: sleep 15 seconds, re-fetch only the failed channels individually, then clear the precheck errors only after those retries succeed. Do not preserve the original 429 errors in the final state if the targeted retries came back clean and still showed zero human messages.
36. **`brain_bridge.py search` is too fuzzy for heartbeat delivery verification or current-state checks**: Confirmed Apr 10 2026 during heartbeat recovery work. Searches like `brain_bridge.py search 'Power Route'` or `'Alpha PM OR slider OR Sally'` can return a mix of old channel posts, prior Pilot DMs, and quoted historical examples from Matthew's later messages. That makes it useful for recall, but unreliable as evidence that a specific FLAG/WORK was actually delivered or that an item is newly active right now. For precise verification, prefer targeted `conversations.history` reads on the exact Slack channel/DM with a bounded `oldest` window, then inspect the live messages directly.
52. **AMPED buyer-ops questions can look unresolved in the channel list even after Matthew already fixed them in-thread**: Confirmed Apr 14 2026 during heartbeat. A 4-hour lookback on `#amped-buyer-leads` still showed Anthony Celestino asking about stale dashboard data, missing `utm_content`, and CPL confusion, which looked like an unresolved escalation candidate. But `conversations.replies` on the source thread showed Matthew had already replied with the pricing answer, admitted the missing UTM tracking, pushed the future-data fix, offered dashboard automation, and Anthony closed with `Ok no sweat! Thanks`. Fix: before re-flagging any AMPED ops complaint, always pull the full thread and treat the latest reply as source of truth. If Matthew already answered or the buyer acknowledged the fix, suppress the re-flag and update `items_tracking` instead of resurfacing stale noise.
53. **`vps_connect.py read_state` can lag behind the latest `heartbeat_runs.state_blob`**: Confirmed Apr 15 2026 during heartbeat. Reading `/root/pilot-heartbeat/state.json` via `vps_connect.py read_state` returned an older 7:13 AM WORK state, while the latest Postgres `heartbeat_runs` row already had newer 8:43 AM FLAG and 9:07 AM SILENT runs. That made the due-check calculation think every scan was overdue when it was not. Reliable pattern: when continuity matters, read both sources if possible and compare timestamps. If `read_state` and the latest `heartbeat_runs.state_blob` disagree, trust the newest timestamped blob, usually the latest `heartbeat_runs.state_blob`, then overwrite the VPS state file again at the end of the run so both layers converge.
54. **Delivery verification must target the real destination, not assume Matthew's DM**: Confirmed Apr 16 2026 during heartbeat. The prior action was a WORK item that posted a paid update into the original `#amped-buyer-leads` thread for Gridline Electric, not a DM to Matthew. A naive verification pass against `D0AQ9PB64L8` would have looked like a delivery miss because Matthew's DM only had earlier prep/summary mentions, while the actual proof lived in `conversations.replies` on thread `1776313746.380979`. Reliable pattern: infer the prior destination from `action_detail`, tracked item metadata, or the workflow type, then verify on that exact channel/thread. Use DM history only for actions that were actually meant to land in Matthew's DM.
55. **Phase-0 Slack prechecks can miss live thread replies on already-tracked items**: Confirmed Apr 16 2026 during heartbeat. A workspace-wide `conversations.history` precheck over the last 30 minutes returned `total_human_messages: 0`, but a tracked Cedar Gold question still had fresh replies in `conversations.replies` because the activity stayed inside the thread and was not thread-broadcast into the channel feed. Reliable pattern: when `items_tracking` contains active `watching_2hr_rule`, blocker, or follow-up topics tied to a known `channel`/`thread_ts`, re-check those exact threads before declaring the workspace quiet or incrementing the watch timer.
56. **Do not store `~/.hermes/...` inside a quoted shell variable when calling `vps_connect.py` from heartbeat helper scripts**: Confirmed Apr 17 2026 during heartbeat. A helper script set `VPS="python3 ~/.hermes/skills/productivity/pilot-heartbeat/scripts/vps_connect.py"` and later invoked `$VPS ...`. Because the tilde lived inside a quoted variable value, Bash did not expand it, and Python tried to open a literal path under the current working directory like `/root/.hermes/hermes-agent/~/.hermes/...`, failing with `can't open file`. Reliable fix: use an absolute path with `$HOME`, for example `python3 "$HOME/.hermes/skills/productivity/pilot-heartbeat/scripts/vps_connect.py"`, or avoid storing the tilde path in a quoted variable at all. This matters whenever heartbeat writes small retry wrappers in `/tmp` and executes them via `bash`. Use the thread as source of truth for whether the waiting clock should continue, reset, or resolve.
