---
name: pilot-deliverable-audit
description: >-
  Use when Matthew asks to audit his calendar, check deliverable status,
  do a status check across clients, or asks "what am I missing?" Covers
  the full thread-tracing methodology that prevents surface-level scans
  from missing edit requests, feedback loops, and true deliverable status.
  Also use when running any cron that reports on deliverable status.
---

# Pilot Deliverable Audit

## CRITICAL RULES (learned the hard way)

1. **Submitted ≠ Done.** A deliverable is NOT complete just because someone posted "ready for review." Status stays "NEEDS EDITS" until Matthew has approved the edited version.

2. **ALWAYS pull `conversations.replies` on every deliverable thread.** Surface-level channel scans miss feedback loops. The top-level message says "delivered" but the thread replies often contain Matthew giving feedback, follow-ups, and edit requests. If you only read the parent message, you will report wrong status.

3. **Trace owner vs coordinator correctly.**
   - Jo Paula = content/SEO report owner (ISS, Saiyan, ATE, Dolce reports + content)
   - Katelyn = PM coordinator (cleans up ClickUp, leaves review comments, NOT the doer)
   - Marcos = SEO strategy co-approver
   - Rachalle = PCE owner
   - Kevin = dev (HEROPM, Trading Academy)
   - Hammad = Cedar Gold dev
   - Never attribute Jo Paula's work to Rachalle or Katelyn.

4. **Even "approved-looking" deliverables need a sanity check.** If Matthew only said "thanks" without confirming review, flag it — he may not have actually reviewed it yet.

5. **For ANY context-gathering task, look deeper than surface.** If there are replies on a message, READ them before reporting on it.

## When to Use
- Matthew asks "audit my calendar" / "what's on my plate" / "what am I missing"
- Any status report across clients (morning briefing, PM digest, EOW updates)
- Heartbeat finds a "delivered" or "ready for review" message
- Any time you're about to call a deliverable "done"
- Load alongside `pilot-project-manager` when the end goal is a strategic PM digest, workload heads-up, or context-aware escalation

## The Core Rule

**Submitted ≠ Done. Thread replies are the source of truth.**

A deliverable's real status lives in the Slack thread, not in the top-level message or ClickUp. Before reporting ANY deliverable status:

1. Pull `conversations.history` with `limit=30-40` (never 5-10)
2. For every message with `reply_count > 0`, pull `conversations.replies`
3. Scan replies for feedback from Matthew or Marcos (edit requests, questions, follow-ups)
4. If feedback exists and no re-submission follows, status = "needs edits"

## People Attribution

Always distinguish:
- **Owner** = person doing the work (Jo Paula writes reports, Hammad builds pages)
- **Coordinator/PM** = person managing task flow (Katelyn moves ClickUp tasks, leaves review comments)
- **Reviewer** = person giving approval/feedback (Matthew, Marcos)

Never confuse PM task management with deliverable ownership. Katelyn moving a task to "internal review" doesn't mean she wrote or edited the deliverable.

### Known Ownership Map (update as roles shift)
| Client | Content Owner | Strategy/Review | PM |
|--------|--------------|----------------|----|
| ISS | Jo Paula | Matthew | Katelyn |
| Saiyan | Jo Paula | Marcos + Matthew | Katelyn |
| Dolce | Jo Paula | Marcos | Katelyn |
| ATE | Jo Paula | Marcos | Katelyn |
| PCE | Rachalle | Marcos | Katelyn |
| Adam Levinstein | Marcos | Matthew | Katelyn |
| Cedar Gold | Hammad (dev), Charlie (content) | Matthew | Katelyn + Kevin (QA) |
| HEROPM | Kevin (design) | Matthew | - |
| Wild Within | Marcos | Matthew | Katelyn |
| Alpha PM | Marcos | Matthew | Katelyn |
| Trading Academy | Kevin | Matthew | - |

## Full Audit Methodology

### Phase 1: Data Collection (broad)
```bash
TOKEN="***REDACTED***"
# Pull 30-40 messages per client channel
for pair in "channel_name:CHANNEL_ID" ...; do
  curl -s "https://slack.com/api/conversations.history?channel=${chan}&limit=40" \
    -H "Authorization: Bearer $TOKEN" -o "/tmp/slack_deep_${name}.json"
done
```

### Phase 2: Thread Discovery
Parse all channel messages. Find every message with `reply_count > 0` that involves deliverables (keywords: report, edit, review, feedback, done, ready, deliver, page, blog, content, design, approved, changes, task, draft, revision, fix, update, lovable).

### Phase 3: Thread Tracing (the step that was missing)
For EVERY deliverable thread found in Phase 2:
```bash
curl -s "https://slack.com/api/conversations.replies?channel=CHAN_ID&ts=THREAD_TS&limit=20" \
  -H "Authorization: Bearer $TOKEN" -o "/tmp/thread_LABEL.json"
```

### Phase 4: Status Determination
For each thread, check:
- Did Matthew/Marcos give edit feedback? → "needs edits"
- Did Matthew/Marcos approve? → "approved" or "done"
- Did the owner re-submit after feedback? → check if new submission was also reviewed
- No response from reviewer? → "waiting on review from [name]"
- Owner said "I'll do it by X" but no follow-up? → "pending from [owner], committed by [date]"

Then do one more suppression pass before reporting the item:
- inspect newer top-level channel messages after the original thread in case the status changed outside the thread
- if the claim is "blocked," verify there is no later message saying access was restored, credentials were sent, or work resumed
- if the claim is "done" or "handed off," verify the actual artifact or handoff signal, like a live link, explicit close-out, or clear send confirmation
- if a later message supersedes the thread, report the newer state and suppress the stale one

### Phase 5: Report
Group by client. For each deliverable:
- Status emoji: 🔴 needs edits, 🟡 waiting/unclear, 🟢 done/approved
- Owner attribution (who does the work)
- Last action and by whom
- Any deadline pressure

## Feedback Detection Keywords
When scanning thread replies from Matthew or Marcos, these indicate edit requests:
- "edit", "fix", "missing", "need", "change", "update", "should", "add"
- "improve", "redo", "revision", "feedback", "not done", "not ready"
- "where", "eta", "status", "can you have", "this one is important"
- Questions about deliverables ("did you", "have you", "is this")

## Live Link Retrieval for SEO Reports
When Matthew asks whether a report is done and wants the live link, do not stop at task status.

Use this sequence:
1. Pull recent Slack history for the client channel and search for report-related messages: `SEO report`, `March report`, `lovable`, `report link`
2. Pull `conversations.replies` on the report-status thread. The live link is often posted in a reply after someone says the report is finished
3. Check the ClickUp report task status and comments
4. Treat Slack + ClickUp together:
   - Slack reply with a live link + ClickUp approved/done = report is effectively ready
   - ClickUp in progress with no live link found = not done yet
   - Beware previous-month links. A February report link in Slack does NOT answer a March report request

### Report Link Rules
- A live Lovable link may exist only in Slack, not in ClickUp
- ClickUp comments may confirm readiness without containing the actual URL
- A report can be approved in ClickUp while Matthew is still asking for the link in Slack, so answer both parts separately: status and link
- Always verify the month in the URL or surrounding message before sharing it

## Anti-Patterns (things that caused the Apr 8 failure)
1. ❌ Pulling only 5 messages per channel
2. ❌ Treating top-level "ready for review" as the final status
3. ❌ Not calling conversations.replies on threads
4. ❌ Confusing PM comments (Katelyn) with deliverable ownership (Jo Paula)
5. ❌ Referencing the wrong person's update (Rachalle's PCE update ≠ ISS report)
6. ❌ Saying "check if reports went out" when the real status is "4 rounds of edit feedback, still being reworked"
7. ❌ Sharing the wrong month because an older live report link was easier to find than the current one

## Origin
Learned Apr 8, 2026. Matthew asked for a calendar audit. Surface-level scan reported SEO reports as a gap ("check if they went out") when the ISS March report had a 15-message thread showing Jo Paula submitted it, Matthew gave detailed feedback, followed up 3 times, and the report was actively being reworked. The audit missed all of this because it only pulled 5 messages per channel and never traced threads.
