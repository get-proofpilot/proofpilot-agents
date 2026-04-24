---
name: pilot-team
description: >-
  Use when you need to know WHO someone is, HOW they communicate, WHAT they own,
  and what autonomy Pilot has with them. Per-person profiles with communication
  style, pain points, correction patterns, and approved behaviors. Load alongside
  pilot-company in every ProofPilot conversation. This is the canonical team file.
  UPDATE THIS FILE when you learn something new about a team member.
---

# ProofPilot Team Profiles

This is the SINGLE SOURCE OF TRUTH for team knowledge. When you learn something new about a person, update THIS file. Not memory. Not another skill. Here.

## Canonical per-person field shape
Each person entry should be rich enough that not knowing it would cause Pilot to respond badly.

Minimum fields to maintain when known:
- role
- Slack ID
- email or where to find it
- what they own
- clients they touch
- communication style
- working pattern
- pain points
- correction patterns
- autonomy notes or approval boundaries
- PM-specific notes, reviewer lane, escalation sensitivity, blocker patterns

This should behave like an operating file, not a contact card.

---

## Matthew Anderson (U097JMZ2M2A)
- *Role:* CEO, owner, decision maker
- *Email:* (known, check Gmail)
- *Communication:* Direct, no fluff, outcome first. Uses Looms for complex instructions. Expects quick turnaround. Brief messages, not walls of text.
- *Working pattern:* High-context, moves fast, expects Pilot to infer the obvious next step and protect his attention.
- *Pain points:* Bottleneck on approvals. Wants Pilot to act, not ask. Gets frustrated by "want me to do X?" when the answer is obviously yes.
- *What he owns:* Strategy, approvals, AMPED, client relations, final say on everything
- *Clients touched:* effectively all, especially Cedar Gold and any client-facing strategy issue
- *Correction patterns:* Corrects on quality, not permission. "Wrong format" > "shouldn't have done that." Will say "just do it" if you ask permission for something obvious.
- *Escalation sensitivity:* Bring him client-facing risk, buried approvals, stalled reviews, cross-channel patterns, and decisions that are quietly waiting on him. Do not bring him routine motion.
- *Autonomy notes:* Wants maximum autonomy from Pilot. Approved: QB uploads, ClickUp triage, cron jobs, client channel monitoring, running audits, pulling reports, lead enrichment, morning briefings. Not yet explicit: client emails directly, posting in non-approved client channels. For AMPED, a booked buyer call should be treated as enough signal to prep the call doc before he asks. Prepare first, then stop at the approval boundary.
- *Scheduling:* MST (UTC-7). Don't ping after ~10pm or before ~7am AZ time.
- *Viktor insight:* Matthew treats "keep an eye on X" as an implicit trust grant. Interpret vague directives at intent ceiling, not floor. If he says "keep an eye on Cedar Gold," that means monitor, synthesize, flag issues with named owners, fix data issues, escalate blockers.

## Katelyn Anderson (U0AKNBHEG8L)
- *Role:* Lead PM, client comms, QA, invoicing, ClickUp management
- *Communication:* Uses voice-to-text, stream-of-consciousness messages with autocorrect errors. Treat her direction with same weight as Matthew's. Detail-oriented, follows up aggressively.
- *Working pattern:* Operational hub. Usually the first PM escalation lane, especially when something needs sorting, sequencing, or client-send coordination.
- *Pain points:* Overwhelmed by task volume. Needs specific, organized task lists not vague direction.
- *What she owns:* Client communication (she drafts and sends client updates), ClickUp organization, QA assignments, invoicing
- *Clients touched:* effectively all active client accounts, with heavy involvement in Cedar Gold, ISS, and PM cleanup
- *Correction patterns:* Will ask for clarification if something is unclear. Appreciates specific links and task IDs.
- *Escalation sensitivity:* Good first route for PM flow issues, stale monthly tasks, client-send sequencing, or QA handoffs that need coordination more than CEO attention.
- *Autonomy notes:* Pilot surfaces WHEN to communicate and provides data/context. Katelyn owns the client outreach. Don't send client messages on her behalf.
- *Channel behavior:* Very active in client channels and #pm-team

## Marcos Anderson (U097N0PSVLJ)
- *Role:* SEO Manager, content review/approval, SEO strategy, reports
- *Communication:* Collaborative. Acknowledge his review workload when flagging items.
- *Working pattern:* Primary review lane for many SEO deliverables. Best nudges are specific and tied to actual review load, not generic pressure.
- *What he owns:* Content review for PCE, ATE, ALP, Saiyan, Dolce, Adam Levinstein. SEO strategy. Co-approver on SEO deliverables.
- *Pain points:* Review queue backlog. Too many items coming at once.
- *Escalation sensitivity:* Bring him real review aging, SEO report risk, GBP approval bottlenecks, and strategy questions in his lane.
- *Autonomy notes:* Pilot should not bypass his review process. Flag items ready for his review, don't push them through.

## Kevin Canunayon (U09CQS8HMEG)
- *Role:* PM, ClickUp tasks, design (Figma), team reminders
- *Communication:* Structured but casual. Appreciates organized info. Polite but persistent, sends lots of reminders.
- *Working pattern:* ClickUp admin, reminder engine, QA coordination, and dev follow-up. Good CC on PM operational drift.
- *Pain points:* Spends enormous time chasing status updates.
- *What he owns:* ClickUp task management, Figma design, QA coordination
- *Correction patterns:* Prefers organized check-ins with specific items listed
- *Escalation sensitivity:* Best loop-in for monthly tasks slipping, QA handoffs, and day-to-day PM operational visibility. In AMPED buyer channels, respond to him by DM instead of in-channel.

## Jo Paula Terre (U098XM223CZ)
- *Role:* SEO Writer, content writing, GBP, Pinterest
- *Communication:* Productive but sometimes behind on status updates. Supportive tone works best.
- *Working pattern:* Owns a large share of content and report deliverables. Late-report risk is a pattern to manage with support, not blame.
- *What she owns:* Content writing, GBP posts, Pinterest, blog posts. Heavy on Dolce Electric.
- *Autonomy notes:* Recognize output before flagging gaps. She works hard and delivers.
- *Escalation sensitivity:* Early gentle nudges are fine. If reports are still late by day 6-7 business days, escalate through Marcos and Matthew instead of publicly pressing her harder.

## Rachalle (U0ACUE8MS4A)
- *Role:* SEO Writer, content writing
- *Communication:* Newer member. Needs gentle, specific guidance. Don't overwhelm with too many things at once.
- *What she owns:* Content writing assignments
- *Known pattern:* Like Jo Paula, can drift on SEO reports. Offer specific data help when timing risk appears.

## Hammad Ahmed (U0AM5T0CEPQ)
- *Role:* Developer, WordPress/WooCommerce/Breakdance builds
- *Communication:* Technical and specific. Link to staging URLs, reference exact pages.
- *Working pattern:* Build execution improves when handed exact specs and clear ownership. Ambiguity upstream becomes his blocker downstream.
- *What he owns:* All development builds. Currently heavy on Cedar Gold.
- *Pain points:* Gets blocked when content or design assets aren't ready. FAQ content blocker was a recurring issue.
- *Viktor insight:* When calling out blockers involving Hammad, use collaborative tone not finger-pointing. "FAQ design is blocking Hammad's build queue" not "@Hammad this is the critical path risk, 3rd week in a row."

## Anthony Aguilar (U0AC124JXQ9)
- *Role:* Designer + AMPED lead buyer (South OC)
- *Important:* NOT a client. He's a team member AND an AMPED buyer. Dual role.
- *Working pattern:* In Cedar Gold build work, Anthony is the design side of the handoff. If Hammad is blocked on build specs, Anthony may be part of the blocker chain.
- *AMPED note:* Treat his buyer role separately from his internal-team role.

## John (U0AQPMMRZ4J)
- *Role:* New team member. Still learning context.
- *Escalation note:* Keep asks concrete and contextualized. Do not assume deep institutional context.

## Charles (U0AMMT31A84)
- *Role:* Team member
- *Context:* ShopStack co-founder with Matthew. Operational details are lighter than for core ProofPilot PM lanes, so avoid over-asserting ownership without live context.

## External Contacts
- *Anthony Celestino* (U08UK1LUKSM) — AMPED lead buyer
- *Charlie* (U09D4PU8CS1) — Cedar Gold content
- *Kyle* (U0AGJVDJ9Q8) — Video editor
- *Anna* (U0ARN3LKLE6, Slack handle `annecd13`) — active in Cedar Gold QA/Pastel review threads. Treat as a live reviewer/commenter on staging feedback until role is confirmed more fully.

## PM Ownership Map by Client

Use this when deciding who actually owns movement, who reviews, who coordinates, and what blocker pattern is most likely. Automations should use the ClickUp key shown here when a client has a dedicated routing lane.

| Client | ClickUp key | Owner | Reviewer | Coordinator | Common blocker pattern |
| --- | --- | --- | --- | --- | --- |
| All Thingz | `all-thingz-electric` | Jo Paula | Marcos | Katelyn | SEO report lateness |
| Pelican Coast | `pelican-coast-electric` | Marcos | Marcos | Katelyn | Dev handoffs move slowly |
| Cedar Gold Content | `cedar-gold-group-content` | Jo Paula | Marcos | Katelyn | SEO retainer cadence, review queue, approval lane |
| Cedar Gold Website | `cedar-gold-group-website` | Anthony + Hammad | Matthew | Katelyn | Spec, handoff, QA drift |
| Wild Within | `the-wild-within` | Jo Paula or Hammad | Katelyn | Katelyn | New client, fast-moving, context changes quickly |
| Saiyan Electric | `saiyan-electric` | Jo Paula | Marcos | Katelyn | GBP-heavy work, fewer total tasks |

## PM Routing Rules
- Katelyn is the lead PM on everything. First tag for PM issues, Kev is CC.
- Matthew is the final approvals layer for strategy and client-facing work.
- Kev handles ClickUp admin, QA, and dev coordination with Hammad.
- Hammad is the only developer. Never hand him design decisions, hand him exact specs.
- For PM escalation, always distinguish reviewer, owner, coordinator, and blocker.

## Known Pattern Risks
- Jo Paula and Rachalle are known to run late on SEO reports.
- Correct move: flag early, offer help pulling data, and surface risk to Marcos before it becomes a client issue.
- Do not scold publicly. Treat this as a pattern to manage, not a character flaw to announce.
- Cedar Gold almost always needs separate tracking for SEO retainer work and web redesign work.
- Cedar Gold retainer lane: Jo Paula owns content-side deliverables, Marcos reviews most content, Matthew handles strategy/final calls.
- Cedar Gold build lane: Katelyn coordinates, Anthony owns design, Hammad owns build, and delays usually come from handoff/spec/QA issues rather than the retainer pattern.
- AMPED is a separate business context from ProofPilot client PM work. Do not assume the same posting and escalation norms apply there.

## Bot IDs (filter from scans)
- Viktor: U0AL7SW3JKW
- Pilot: U0AP93XPHFV / B0APUCF8A6M
- Slackbot: USLACKBOT

---

## Pilot's Approved Autonomous Behaviors

### JUST DO IT (no permission needed)
- Pull data, check status, generate reports, run audits
- Update existing ClickUp task statuses and descriptions
- Create ClickUp tasks when filling an explicit scope gap from a conversation
- Run competitor analyses, site crawls, keyword research
- Create and update own cron jobs and skills
- Post in approved channels (pilot-ai-*, pilot-notifications)
- AMPED lead enrichment when new lead detected
- Morning briefings, email digests, PM digests (standing)
- Fix data issues (wrong ClickUp status, outdated task info)
- Draft content, build deliverables, prepare proposals

### ACT AND FLAG (do it, then note uncertainty)
- Reassign ClickUp tasks based on conversation context
- Create new ClickUp tasks not tied to an explicit conversation
- Interpret vague directives at intent ceiling
- Surface findings from "already in the room" inspections

### FLAG FIRST (always get approval before acting)
- Send anything to a client on someone's behalf
- Post in non-approved Slack channels
- Any financial action (invoice, payment, refund)
- Delete data
- Change committed external deadlines
- Email clients or prospects directly

### PROPOSAL FORMAT (one-time approval gate for new behaviors)
```
:bulb: *Proposal: [name]*
*What I observed:* [specific pattern or gap]
*What I'd do:* [exactly what, how often]
*What you'd get:* [concrete, measurable outcome]
*What I'd need:* [access, confirmation, or nothing]
```
Once approved → build workflow → update this file with "APPROVED: [who] [date]" → never re-ask.

---

## Autonomy Decision Tree (run on EVERY action)

```
Is this action reversible?
  ├─ NO  → FLAG FIRST. Always. Regardless of confidence.
  └─ YES → Is this in "JUST DO IT" list above?
              ├─ YES → Do it. Report after.
              └─ NO  → Am I 80%+ confident on the right call?
                         ├─ YES → Do it + flag uncertainty at the end
                         └─ NO  → Flag first with specific recommendation
```

### Act-and-Flag Message Format
```
I went ahead and [action taken].
Reasoning: [what I assumed / why]
Uncertainty: [the 20% I wasn't sure about]
If that's wrong: [how to revert or what to tell me]
```

### Confidence Check (3 questions before acting)
1. *Is this reversible?* (ClickUp task = yes, client email = no)
2. *Do I understand the intent ceiling, not just the surface request?*
3. *Can I verify, or am I assuming?* (If assuming, name the assumption)
