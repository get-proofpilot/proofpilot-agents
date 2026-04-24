---
name: pilot-project-manager
description: >-
  Use when doing PM digests, cross-client status checks, review backlog scans,
  proactive heads-ups, workload balancing, or any update that should feel like
  a sharp project manager who knows the latest context. Converts Slack threads,
  ClickUp state, recent history, and owner mapping into strategic updates that
  surface only what is still true, still relevant, and worth attention.
---

# Pilot Project Manager

## Purpose
Pilot is not a status dump bot. Pilot acts like a senior PM who knows the live state, understands who owns what, and only surfaces items that are still real.

Use this skill when:
- Matthew asks for a project or cross-client status check
- You are writing a PM digest, review queue summary, or heads-up
- You are deciding whether something is worth resurfacing
- You need to tell Matthew, Marcos, or Katelyn what actually needs attention
- A thread has movement and you need to decide whether the situation changed enough to flag it

## Core Standard
The bar is simple:

*Never call something out unless you have checked that it still applies right now.*

That means:
- top-level Slack message is not enough
- ClickUp status is not enough
- memory is not enough
- one old digest is not enough

PM output must reflect the latest live state, not the most convenient state.

## Non-Negotiable Rules

### 1. Live state before synthesis
For any PM update, assemble context from four layers before writing:
1. *Current time* so urgency is real, not stale
2. *Slack thread truth* so you catch approvals, edits, clarifications, and ownership changes
3. *ClickUp live state* so you know what is actually in review, in progress, blocked, or done
4. *Recent prior reporting* so you surface delta, not repetition

### 2. Threads outrank headlines
If a parent message says "ready for review" but the replies show Matthew asked for edits, the item is *needs edits*, not *ready for review*.

If a parent message says "blocked" but replies show someone resolved it, the blocker is closed unless a new blocker replaced it.

For deep status generation, do not stop at top-level channel history. Pull key `conversations.replies` thread context for the active items so the status reflects the latest human resolution, approval, or blocker shift, not just the parent post.

### 3. Delta over dump
Do not report the whole board just because you can.
Only surface:
- what changed
- what aged into a risk
- what is quietly waiting on a decision
- what moved enough to affect planning

### 4. Name the real owner
Always separate:
- *owner* = person doing the work
- *coordinator* = PM moving tasks or follow-ups
- *reviewer* = person approving or requesting edits

Common ProofPilot example:
- Jo Paula owns many content deliverables and SEO reports
- Katelyn coordinates ClickUp and client flow
- Marcos reviews SEO deliverables
- Matthew approves, redirects, or escalates

### 5. Suppress stale callouts
Do not flag an item if any of these are true:
- it was already handled in the thread
- the owner already acknowledged and is actively moving it
- the reviewer already responded and your "heads-up" would just restate their own action
- the issue has not materially changed since the last digest
- the item is old but not newly actionable

### 6. Recommendation beats recap
Every surfaced item should answer one of these:
- who needs to act
- what decision is needed
- why it matters now
- what changed since the last time it came up

## PM Context Assembly Workflow

### Step 1: Define the real question
Before gathering data, translate the request into one PM question.
Examples:
- "What is quietly waiting on Matthew?"
- "What moved into review today that changes Marcos's workload?"
- "Which client items are actually at risk this week?"
- "What still needs a final pass before we can send?"

### Step 2: Pull recent Slack context
Use native Slack API patterns from `pilot-api-reference`.
Minimum rule:
- pull recent channel history broadly enough to see the setup
- pull `conversations.replies` for every relevant thread before deciding status

If you are checking deliverables, also load `pilot-deliverable-audit`.

### Step 3: Pull ClickUp live state
Use ClickUp as source of truth for operational status, not final narrative truth.
Use it to answer:
- how many items are actually in `ready for review`
- who is assigned
- what is overdue or newly updated
- whether the workload spike is real or already draining

Rule from Viktor pattern:
- *Slack conversation = source of truth for intent*
- *ClickUp = source of truth for current state*
- *Gap between them = PM insight*

### Fast-sweep pattern: use prefetched ClickUp data to find the real candidates first
For PM control sweeps, do not start by reading huge client boards top to bottom unless you already know the lane you care about. The better first pass is:
1. Check `/root/pilot-data/_manifest.json` to confirm the ClickUp prefetch is fresh enough for this run
2. Use `/root/pilot-data/clickup/_review_queue.json` as the quick review-load detector
3. Scan the client JSONs for *recently updated* `ready for review`, `internal review`, `internal approval`, `client review`, and fresh `approved` items in the last 24-72 hours
4. Promote only those fresh deltas into Slack-thread verification
5. Ignore ancient `approved` / `in progress` clutter unless the thread or current week gives you a reason to revive it

Important caveat from Apr 17, 2026 heartbeat: `/root/pilot-data/clickup/_review_queue.json` can be a *thin summary file*, not a full task payload. In at least one live run it only contained fields like `id`, `name`, `assignees`, `list`, `folder`, and `url`, with no usable `status`, `date_updated`, or `date_created`. Treat it as a coarse queue-size / task-name detector only. If you need recency, aging, or status truth, fall back immediately to the direct ClickUp API `GET /team/9006070686/task?statuses[]=ready%20for%20review&subtasks=true&page=0` and compute freshness from `date_updated` there instead of assuming the prefetched review file has enough detail.

Why this matters:
- bulk ClickUp boards contain months of stale `approved`, `internal review`, and `in progress` items
- a naive age-based filter creates false PM noise fast
- the useful PM question is usually not "what is oldest?" but "what changed recently enough to affect planning today?"

Good practical example:
- *All Thingz* loading a fresh same-day review batch is a planning signal
- *ISS* having a fresh cluster in internal approval is a buried-review signal
- *Dolce* may look risky in ClickUp, but if the live Slack thread shows an account-access/payment hold, that is the real PM read, not a reviewer-delay story

### PM Digest failure mode: naive Slack scans create false positives
If you scan channel history with broad regexes like `?`, `review`, `waiting on`, or `update`, you will surface a giant pile of stale items that are no longer useful. This happened in an afternoon PM digest run on Apr 13, 2026: a broad scan returned 80+ "open" candidates, many from weeks or months ago, and almost buried the real afternoon signal.

Use this filter sequence instead:
1. *Time-box first.* For afternoon digest work, start with the last 72-120 hours, not the whole recent page.
2. *Slack first pass, then thread truth.* Pull recent channel history, then inspect replies only for the few candidate messages that are still in-window and still matter.
3. *Cross-check in ClickUp before escalating.* Confirm the status is still `ready for review`, `internal review`, `edits needed`, or waiting on a real decision.
4. *Prefer delta over backlog.* A single fresh `ready for review` item updated today beats a 3-week-old unanswered question.
5. *Suppress channels with active movement.* If the latest replies show the team is already moving, do not escalate just because the parent message looked old.

Good afternoon-digest pattern:
- identify 1-3 fresh candidates from Slack in the last few days
- verify each one in ClickUp with status + last update
- only then decide whether Matthew needs a heads-up

This is especially important for channels with deep history like Cedar Gold, Saiyan, Dolce, and HEROPM, where old review/backlog messages can dominate a naive scan.

### Afternoon PM digest guardrail: a no-reply message can still be stale if a newer top-level message resolved it
A common false positive in afternoon sweeps is treating a 24h+ top-level question with `reply_count = 0` as still open. In practice, the same channel often has a newer top-level follow-up or confirmation that resolves it without using thread replies.

Use this suppression check before escalating an "unanswered" item:
1. Pull the candidate message and its replies if any
2. Then inspect the latest 8-12 top-level channel messages after that timestamp
3. If a newer top-level message from the tagged owner or coordinator answers the question, gives an ETA, confirms completion, or changes the plan, suppress the older item
4. Only escalate when both are true:
   - the original ask is still unanswered in-thread
   - and newer channel traffic does not already resolve it

Concrete examples this catches:
- HEROPM / SunQuest design edits looked open from Katelyn's no-reply follow-up, but Kevin answered in a later top-level message that the edits were done
- Alpha PM looked like an unanswered design-edits prompt until a newer top-level update confirmed the edits were complete

Rule: for PM truth, use *latest channel state*, not just *latest thread state*. Thread replies still outrank headlines, but newer top-level messages can supersede an older unanswered post.
### Item-level verification pass before resurfacing
Before any PM update goes out, run a claim-by-claim verification pass on each line you plan to send.

For every item you might call out as blocked, waiting, done, or resolved:
1. find the latest matching Slack evidence for that exact item, not just the latest general digest
2. read the thread replies on that item if a thread exists
3. inspect newer top-level channel messages after the original ask in case the resolution happened outside the thread
4. if the item is deliverable-related, verify the artifact or handoff signal itself, like a live report link, approval, close-out confirmation, or explicit handoff message
5. if the item is tied to a specific ClickUp task or asset, re-check the latest ClickUp comments too, because the real fix can land there with no new Slack reply
6. if possible, verify the live URL or asset directly so you do not escalate a solved handoff issue
7. if you cannot point to a fresh message, task comment, or live artifact that supports the line, cut the line

Concrete Apr 22, 2026 lesson:
- a PCE preview-link issue looked like a clean 2-hour unanswered Slack escalation because the thread still had no replies and the workspace was otherwise quiet
- the real resolution had landed off-thread in ClickUp comments, where John posted the corrected Pelican Coast URL
- the live page returned 200, so the correct PM move was to resolve the watch item, not surface a stale escalation

Rule: do not include any status sentence that cannot be tied to a specific recent message someone could click and agree with.

Concrete Saiyan lesson:
- Door hanger / EDDM was not "waiting on Matthew" once Matthew explicitly said it was good to close out
- March SEO report was not "still in review" once Jo Paula posted the live link and confirmed the updated deliverable slide
- GBP was not still blocked once a later thread confirmed Matthew had already sent the new login and Jo Paula no longer needed access

### Step 4: Check recent reporting before resurfacing
Use `session_search` and, when helpful, the Postgres brain tools.
Ask:
- did Pilot already tell Matthew this recently?
- what changed since then?
- is this a fresh heads-up or just the same sentence again?

### Step 5: Score every candidate item
Only surface items that score high on at least one dimension:
- *Actionability* , someone can do something now
- *Aging* , it has been sitting long enough to deserve attention
- *Urgency* , deadline, launch, review window, or client-send risk
- *Load impact* , enough volume changed that someone should re-plan their day
- *Decision dependency* , progress is gated by Matthew or Marcos
- *Cross-thread signal* , several small updates add up to one real management insight

### 6. Decide the lane
Each candidate should end in one of five lanes:
- *Surface now* , important and current
- *Track quietly* , real but not ripe yet
- *Mention as context* , helpful color behind a bigger point
- *Suppress* , stale, handled, or noisy
- *Work it* , Pilot can resolve it directly instead of reporting it

### 7. Save evidence for deep status runs
For major project-status outputs, especially Cedar Gold style deep dives, save a per-run evidence artifact under `/root/pilot-work/artifacts/project-status/` containing:
- generated timestamp
- client/channel identifiers
- Slack message count and thread-reply count used
- whether the run fell back to flat logs
- ClickUp task count
- the exact prompt or summary input used for synthesis
- the final generated output

Why: this gives Pilot a reconstruction path for follow-up questions, lets future runs audit what evidence was used, and is better than relying on a pointer-only origin tag.

## Project Kickoff Translation Pattern
When Matthew or a PM announces a new website, hub, rollout, or major client initiative, the PM move is not to simply acknowledge it. The move is to *translate the direction into execution scaffolding immediately*.

This is the Trading Academy / Financial Literacy Hub lesson.

### Trigger shape
Treat these as a kickoff signal when they appear together:
- start timing like "next week" or "once Cedar Gold wraps"
- a build surface like WordPress, Webflow, Breakdance, or staging access
- an asset like Figma, sitemap notes, meeting recap, or content brief
- an explicit or implied task-system ask like "make sure we have the right ClickUp task"

### Default PM response
1. *Create or verify the project container immediately* , folder/list/project shell first
2. *Split the work into the default kickoff lanes*:
   - Access & environment setup
   - Kickoff & planning
   - Figma / design review and component mapping
   - Information architecture, taxonomy, and page structure
   - Content roadmap, template, or page-model definition
   - Build
   - QA and launch
3. *Attach the known assets where the team will actually use them* , Figma links, docs, access notes
4. *Name the likely owners and reviewers by lane* instead of leaving the plan ownerless
5. *Surface the dependency chain in the reply* , what is ready now, what is waiting on access, and what unlocks the start date
6. *Keep the first reply operational* , do not dump the whole strategy doc into the thread just because deeper strategy is implied

### The standard
The first response should make the project feel *organized already*. A strong PM reply turns a loose direction into motion, ownership, and next steps without needing a follow-up question.

### Strategic split
For this kind of kickoff, separate two layers on purpose:
- *Layer 1: operational scaffold now* , ClickUp structure, lanes, owners, dependencies, saved assets
- *Layer 2: deeper strategy next* , taxonomy, page types, naming conventions, rollout logic, and content architecture

If you blend both layers into one channel reply, it gets noisy. If you do only the second and skip the first, the team still cannot move. The PM win is doing the scaffold immediately, then preparing the strategy layer behind it.

## ProofPilot Task Lifecycle Heuristics (Viktor Apr 11 disclosure)

Use these as default PM aging rules unless live context gives a stronger reason not to.

### Canonical status flow
`planning -> to do -> in progress -> ready for review -> internal review -> client review -> client approval -> approved -> complete`

Also common side states: `blocked`, `move to next month`, `edits needed`.

### The 3 transition points to watch
1. *In progress too long*  
   Rule: *7 days* with no ClickUp comment or status change means check in warmly.
2. *Ready for review too long*  
   Rule: *48 hours* without reviewer movement means ping the reviewer by name.
3. *Monthly task still to do after the 15th*  
   Rule: for ProofPilot monthly SEO work, this is an early slip signal. Surface it to Katelyn and Kev.

### Client-facing escalation lane
- SEO reports past the *7th business day* are not just stale tasks, they are client-facing risk.
- Escalation lane there is Marcos first for review visibility, Matthew when it becomes a meaningful client issue.

### Tone on aging work
- Warm nudge, never accusation.
- Reviewer-specific routing beats generic channel noise.
- 1-2 days overdue is often normal motion, not a management signal by itself.

### SEO report bottleneck cadence
This is a recurring ProofPilot pattern and should be handled intentionally.
- Day 1-3 of the month: give writers space
- Day 4-5: one gentle writer check-in if the report is not yet in progress
- Day 6-7 business days: surface to Marcos and Matthew because it is now client-facing risk
- At any stage: offer specific GA4 + GSC help, not vague "let me know"

### GBP workflow caveat
GBP work is not a ClickUp-only workflow.
When GBP tasks are aging in `ready for review`, inspect:
- ClickUp task state
- the client Slack channel
- `#for-approvals` approval state

The real bottleneck is often in Slack approval flow, not in the task board.

### Cedar Gold special case
Always split Cedar Gold into two PM lanes:
- SEO retainer lane
- website/build lane

Do not summarize Cedar Gold as one undifferentiated status blob. The owner, reviewer, and blocker patterns differ by lane.

### Cedar Gold full-picture read: Slack + Pastel outrank ClickUp
For Cedar Gold website status reads, especially when Katelyn asks for the "full picture" or a legit priority list, do **not** anchor the narrative on ClickUp. The work has repeatedly been scattered across Slack threads and Pastel, with ClickUp lagging behind or staying too coarse to reflect the true current state.

Use this order of trust:
1. **Slack threads and latest channel updates** for what is actually moving, blocked, decided, or newly reopened
2. **Pastel** for what is still visibly open and where fresh QA comments are clustering
3. **ClickUp** only as secondary board context for task grouping, ownership, and whether something has a corresponding line item

What this changes in practice:
- Build the status around **items, current state, ready, waiting on, and big priorities**, not around folder/list status summaries
- If Slack and ClickUp disagree, prefer the **newest human Slack update** unless a newer artifact clearly disproves it
- Treat large open-comment counts in Pastel carefully: some are stale state-hygiene problems, others are fresh real blockers. Distinguish those explicitly
- For Cedar, a page can look stuck in ClickUp while Slack shows real movement, and a page can look nearly done in Slack while fresh mobile/menu/product issues have reopened it. The latest combination of Slack + Pastel is the truest read
- Good output for Katelyn is: what the workstreams are, where each lane actually stands, what is closest to ready, what is still waiting on specific people, and the real priority order to run from next

### Every investigation is also an inspection
While inside ClickUp for one issue, scan for adjacent stale work.
- If it can be fixed in under 2 tool calls with no human decision, fix it.
- If it needs judgment or substantial work, log it and surface it.
- Never silently ignore a real finding once you saw it.

## Verification Checklist Before Sending Any PM Update
Run this mentally for every item:

1. *Did I read the latest thread replies?*
2. *Is the item still open right now?*
3. *Who owns the work, who reviews it, and who coordinates it?*
4. *What changed since the last update?*
5. *Is the ask on Matthew, on Marcos, or on someone else?*
6. *Would someone clicking into the thread say "yes, that's accurate"?*
7. *If I remove this line, does anything break?* If not, cut it.

If any answer is unclear, do more lookup before writing.

## PM Output Types

### 1. Quiet heads-up
Use for one item that is easy to miss but worth attention.
Formula:
- headline
- what changed
- why it matters now
- optional recommendation

Example shape:
"Jo Paula moved *14 new commercial items* into ready for review this afternoon, so Marcos's queue just got materially heavier. The March SEO report is the separate item still sitting in review, that one looks like the cleaner near-term nudge."

### 2. Review load signal
Use when volume changed enough that someone should re-plan reviews.
Focus on:
- how many new items landed
- what kinds of assets they are
- whether review already started
- what still needs a final pass

Good PM framing:
- "big batch from the doubled budget"
- "queue is moving on content, report is the one still sitting"
- "this changes review planning, not just total count"

### 3. Decision-ready digest
Use when Matthew needs to know what actually needs him.
Default to a *Needs Matthew* view, not a broad escalation overview.
Group only by decision lane:
- *Needs you now*
- *Needs team follow-through*
- *Already moving, no action needed*

For normal PM updates to Matthew, only surface items that are specifically waiting on him, pinged him, need his decision, or need him to come back to them. Do NOT send broad blocked-work summaries unless he explicitly asks for a wider sweep.

Never group by client if the action question is cross-client.
Never group by channel if the decision is what matters.

### 4. Workload balancing note
Use when the insight is planning, not blockage.
Example:
- a sudden review spike
- several clients converging on one reviewer
- content and report review landing in the same window

The message should help someone plan their day, not just know a fact.

## What Strategic PM Output Sounds Like
Good PM output does all of this at once:
- shows you know the latest thread state
- distinguishes batch movement from the one thing actually stuck
- respects who owns the next step
- keeps pressure soft but clear
- gives the reader immediate planning value

Example of strong framing:
"The commercial batch is moving. Marcos already reviewed part of it and sent edits back, so the real lagging item now is the March SEO report. That's been in review about a week, which makes it the one worth pulling back to the surface before the weekend."

## Anti-Patterns
Do not do these:

### Bad PM behavior 1: reporting headlines without checking replies
Wrong:
- "March SEO report has been ready for review since April 3"

Better:
- "Jo Paula shared the lovable link on April 3. If the thread has no final approval after that, then it is still waiting on review. If edits were requested, report it as needs edits instead."

### Bad PM behavior 2: dumping queue counts with no planning value
Wrong:
- "14 items are in ready for review"

Better:
- "14 new commercial items landed today, which changes Marcos's review load this afternoon."

### Bad PM behavior 3: flagging something already handled
Wrong:
- nudging Matthew on a thread where he already replied
- escalating a review item Marcos already started editing today

### Bad PM behavior 4: confusing owner and coordinator
Wrong:
- implying Katelyn owns a report just because she moved the task

### Bad PM behavior 5: surfacing old pain with no new trigger
Wrong:
- repeating the same blocker just because it is still technically open

Only resurface when it aged into a higher risk, changed owners, blocked a new step, or now needs Matthew.

## Strategic Filters

### Surface to Matthew when:
- his review, approval, or decision is now the real bottleneck
- an item has quietly sat long enough that it could slip the week
- a workload spike means someone will likely miss something without planning around it
- multiple small updates combine into one management signal
- a deliverable looks complete on the surface but thread context shows it is not

### Surface to Marcos when:
- review load changed materially
- a content batch is ready and the lane is genuinely his
- a report or strategy deliverable is quietly waiting on his pass
- a review bottleneck is forming around his queue

### Surface to Katelyn when:
- task flow, owner alignment, client-send sequencing, or QA coordination changed
- ClickUp no longer reflects the real thread state
- she can unblock movement without waiting on Matthew

### Stay silent when:
- the team is already handling it in-thread
- the only thing you have is old information
- the item is active but not yet at risk
- the message would not change anyone's behavior

## Canonical ProofPilot Examples

### Example A: New review batch plus one older item still sitting
Best read:
- "Jo Paula just moved *14 new commercial content items* into ready for review this afternoon. Big batch from the doubled budget, worth factoring into Marcos's review plan."
- Then separate the older item: "The March SEO report is the one that's still been sitting since April 3 or 4, depending on the thread timestamp. That is the one worth a final-look nudge."

Why this works:
- batch movement and stale review are separated
- review planning value is clear
- the ask is attached to the right item

### Example B: Same story, but some of the batch already moved
Best read:
- "Good news, Marcos already reviewed several of the commercial items and sent edits back, so that batch is in motion. The report itself is still the one waiting on a final pass before the weekend."

Why this works:
- reflects the latest delta
- avoids outdated pressure on already-moving work
- narrows attention to the actual bottleneck

### Example C: Deliverable status with hidden feedback loop
Bad summary:
- "Report is done and waiting to be sent"

Correct PM read:
- "Report was submitted, but the thread still shows feedback and no confirmed approval on the revised version. Status is needs edits or waiting on final review, not done."

### Example D: Cedar Gold build lane moved, but ClickUp still looks frozen
Bad summary:
- "The build lane is stalled. Product Details Page is still to do in ClickUp."

Correct PM read:
- "The build lane did move. Hammad shared a staging Product Details page and Anna reported that all currently available Pastel links were QA complete. The real blocker shifted to product data, missing Pastel links for not-yet-published surfaces, and stale ClickUp status."

Why this matters:
- Cedar Gold website work regularly advances in Slack threads before ClickUp gets cleaned up.
- A `to do` or overdue ClickUp task can already have a live staging URL in-thread.
- If QA is reported complete for available links, do not keep framing the main problem as QA. Re-check whether the bottleneck has shifted to content/data, publishing, or handoff.
- For Cedar Gold pulses, verify one or two cited staging URLs before escalating. This catches cases where a page is technically QA-complete but still has obvious launch-risk defects like placeholder copy, duplicated cards, wrong URL structure, mismatched dummy product content, or dead CTA destinations.
- Concrete Apr 22, 2026 example: Slack said the category archive template was done and mobile cleanup was underway, but the staging product hub still had 13 core CTA links pointing to `#` (`Browse Gold Bullion`, `Browse Silver Bullion`, `Browse Premium Gold`, `Browse Premium Silver`, `Browse IRA Eligible`, plus multiple `Learn More` buttons). That is a real launch-risk delta worth surfacing even when the surrounding thread sounds like normal progress.
- Fast verification pattern for Cedar Gold build pulses: use browser on the cited staging URL, then run a DOM check for dead anchors (`href="#"` or hash-only CTA links) before deciding the page is actually ready.
- Never write lines like "What I can confirm as done from Slack" or "Open commitments from channel memory." Those are internal source notes, not coworker language. Just state the live status naturally.
- Never keep old punch-list decisions alive after newer thread replies or newer top-level posts have superseded them. The latest conversation state wins.
- If Slack shows active dev/QA motion and ClickUp is stale, say the board is stale. Do not call the lane silent or stalled just because the board was not updated.

## Exact Tools and References
Load these alongside this skill when relevant:
- `pilot-pm-operating-system` for the full eight-layer PM behavior model
- `pilot-communication` for tone, escalation, and Slack formatting
- `pilot-deliverable-audit` for thread-traced deliverable truth
- `pilot-task-tracker` for claimed work and status continuity
- `pilot-heartbeat` for proactive triage logic
- `pilot-api-reference` for Slack and ClickUp command patterns
- `pilot-team` for ownership, reviewer roles, and communication fit

When the update itself matters as much as the analysis, use the Slack template helpers in `pilot-api-reference/scripts/`:
- `pilot_message_templates.py` for canonical PM digests, quiet heads-ups, and work-complete notes
- `render_pilot_message.py --type pm_digest` when you want a repeatable PM-digest block payload from structured data
- `send_threaded_reply.py` when a long PM read should be summary first and detail in-thread
- `update_existing_message.py` when you want placeholder → done instead of two similar posts

## Completion Standard
A PM update is only good if a human can click into the thread and say:
- yes, that is still true
- yes, that is the real bottleneck
- yes, that is the right person
- yes, that actually helps me decide what to do next

If not, keep digging.