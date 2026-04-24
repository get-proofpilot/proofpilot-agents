---
name: pilot-slack-message-design
description: Messaging design system for Pilot-style Slack output. Covers Slack mrkdwn rules, layout decisions, Block Kit usage, cron delivery polish, and the anti-patterns that make Slack messages look ugly or robotic.
tags: [pilot, slack, formatting, block-kit, cron, messaging, design]
---

# Pilot Slack Message Design

Use this when:
- someone asks how Pilot styles Slack messages
- you need the full formatting and layout rules for cron jobs or proactive updates
- you want to avoid ugly, robotic, or overformatted Slack output
- you need to explain the difference between plain text, structured text, and full Block Kit posting

## Core principles
- Messages should feel like a sharp coworker, not a pasted automation dump.
- Formatting should help scanability, not call attention to itself.
- One-line question = one-line answer.
- Long-form deliverables = docs, not giant Slack walls.
- If the formatting is the most noticeable thing, the design is too heavy.

## Base Slack rules
- Bold = `*single asterisks*` only
- Italic = `_underscores_`
- Code = `` `backticks` ``
- Links = `<https://url.com|display text>`
- Mentions = `<@USER_ID>`
- Channel refs = `<#CHANNEL_ID|channel-name>`
- No markdown links
- No em dashes
- No local file paths in Slack
- No greeting openers unless context truly calls for one

## Layout decisions
- Plain text by default for quick replies
- Bullets only when 3+ parallel items need scanning
- Tables only when comparison matters
- Emoji-section structure only for multi-part updates, briefings, digests, or wrap-ups
- Use prose first for recommendations and reasoning
- Rotate structures so the agent never feels templated or predictable
- PM sweeps, escalation overviews, and status digests for Matthew must clear a higher bar: they should go out as high-fidelity block-style briefs with strong visual hierarchy, cleaner grouping, and concise grouped copy, not plain bullet walls or raw text dumps
- Before sending any multi-section overview, do a final ugly-check: if it looks plain, ugly, or like a pasted notes dump, rebuild it with clearer sectioning, spacing, and block-style hierarchy before it goes out

## Emoji and section rules
- One emoji per section header, not decorative spam
- Standard anchors:
  - `:bar_chart:` status and performance
  - `:clipboard:` PM digests and structured updates
  - `:white_check_mark:` completed work
  - `:red_circle:` blockers and urgency
  - `:warning:` risks and escalations
  - `:calendar:` schedule and meetings
  - `:dart:` footer or target cues

## Rich structured text pattern
Best text shape when posting through the Gateway:
1. Emoji + bold title line
2. Short summary sentence
3. Double newline before next section
4. Optional muted-style footer line for meta info

## Block Kit rules
Use direct Block Kit when the message needs to feel designed, especially for cron outputs.
Preferred pattern:
- header or lead section
- section
- divider
- section
- divider
- context footer

Current live rule:
- The gateway can now auto-blockify some clearly structured multi-section Slack text for interactive replies.
- For deliberate visual polish, predictable dividers, headers, thread summaries, or edit-in-place flows, still post real `blocks` via Slack API. Do not rely on auto-conversion when the message truly matters.

## Viktor-style six-block system
Use these intentionally:
- `header` for one title only, at the top, and `plain_text` only
- `section` for the actual message body and all actionable content
- `divider` to separate ideas, never stack multiple headers
- `context` for metadata only, never the main ask
- `actions` for buttons when a live listener exists
- `image` for charts, screenshots, and visual proof

## Collapse strategy, Zone 1 / 2 / 3
Slack collapses long messages based on rendered height, not a toggle. Design for that.
- *Zone 1, always visible:* title, summary, and the single most important item
- *Zone 2, usually visible:* second and third most important details
- *Zone 3, below the fold:* supporting detail, background, and footer metadata

If the message is long enough that Zone 3 matters, prefer the two-message pattern.

## Two-message pattern
For long digests, project pulses, or anything that may collapse:
- post a short summary in channel
- put the full detail in the thread under that message
- make the summary fully useful on its own

Use the helper scripts in `pilot-api-reference/scripts/`:
- `send_threaded_reply.py` for summary + thread delivery
- `update_existing_message.py` for placeholder → done updates
- `react_to_message.py` for low-noise acknowledgment via emoji
- `upload_and_share_file.py` when the right answer is a file link, not a long Slack wall
- `slack_blocks.py` for reusable Block Kit builders
- `pilot_message_templates.py` for canonical heads-ups, PM digests, lead cards, and morning-briefing layouts

## Cron message quality bar
- Lead with the real headline, not system labels
- One natural setup sentence, then the actionable points
- Never send empty sections like "no new X"
- Never send `[SILENT]` or local bookkeeping to Slack
- Most cron runs should stay local and silent
- Escalate only when a real threshold is crossed
- Never wrap the whole message in triple backticks

## Delivery path rules
- For simple text: clean mrkdwn is fine
- For rich layout: use `slack_post.py` with `--blocks-file`
- For cron jobs: prefer `deliver: local` and post selectively to Slack only when warranted
- Avoid duplicate delivery by mixing auto-deliver and direct post for the same content

## Active cron conversion note
When you upgrade Pilot's live cron prompts to a new messaging standard, update both layers:
- `~/.hermes/cron/jobs.json` is the runtime source the scheduler reads
- `~/.hermes/cron/jobs/<job_id>/task.json` should be resynced right after so per-job manifests match the live prompt

Reliable conversion pattern:
1. patch the active job prompts in `jobs.json`
2. validate the JSON file still parses
3. rewrite each corresponding `task.json` from the updated job object
4. verify the new prompt text appears in both places before considering the conversion done

This matters because prompt/tooling upgrades can look complete if only `jobs.json` changed, while audits and future maintenance still read stale per-job manifests.

## Ugly-message traps
- Double asterisks
- Triple-backtick wrapping of the whole message
- Markdown links instead of Slack links
- Repeating the same emoji-header skeleton every time
- Tool/process narration in the user-facing text
- Overuse of bullets for content that should just be a sentence
- Empty or filler sections from cron jobs
- Generic closers like "Let me know if you need anything else"

## Interaction design note
Buttons look great, but they require a live endpoint or Socket Mode listener. Pure cron jobs cannot receive button clicks by themselves. Use emoji or thread-reply fallback approvals if no live listener exists.

## Best paired skills
- `pilot-communication`
- `slack-block-kit-formatting`
- `pilot-api-reference`
- `proofpilot-doc-delivery` for long-form alternatives

## Output standard when explaining this system
If someone asks for the full system, give them:
- the principles
- the syntax rules
- the layout decision framework
- the Block Kit and cron delivery rules
- the anti-patterns
- a doc link if the explanation is long
