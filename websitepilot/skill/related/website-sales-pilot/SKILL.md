---
name: website-sales-pilot
description: WebsiteSalesPilot, ProofPilot's end-to-end website sales agent. Combines lead qualification, AuditPilot research, StrategyPilot page-system planning, and AutoPilot demo-page generation into one sales workflow.
tags: [sales, websites, seo, audits, strategy, autopilot, demos, proofpilot]
---

# WebsiteSalesPilot

## When to Trigger

Load this skill when Matthew or the team asks for:
- a website sales agent
- an audit-to-demo workflow
- a prospect bundle
- a homepage demo for a lead
- a website sales process for ProofPilot
- a sales-focused website audit plus strategy plus demo site

## What This Agent Is

WebsiteSalesPilot is the orchestration layer that turns existing ProofPilot assets into one sales machine:
- top-of-funnel lead selection and qualification
- AuditPilot for evidence and pain
- StrategyPilot for the blueprint and page-system plan
- AutoPilot for the actual demo asset

This skill should COORDINATE those systems, not duplicate their internals.

## Non-Negotiables

- Use AuditPilot for the evidence-heavy research and sales pain story.
- Use StrategyPilot for the strategic page map and growth thesis.
- Use AutoPilot for generated page output. Do not improvise page generation outside AutoPilot.
- Before promising a demo page, confirm AutoPilot is reachable.
- If AutoPilot is down, deliver the audit and strategy bundle, then clearly mark demo generation as blocked.

## Required Skill Load Order

For a full run, load in this order when relevant:
1. `proofpilot-agents`
2. `proofpilot-lead-sheet-prioritization` or `lead-sheet-sales-audits` when the lead source is a sheet
3. `audit-pilot`
4. `strategy-pilot`
5. `autopilot`
6. `qapilot` if an internal QA pass is needed before sharing
7. `proofpilot-docx-gdrive-workflow` or `proofpilot-doc-delivery` if the sales artifact must become a client-facing doc

## Core Workflow

### Stage 1: Lead discovery and qualification
Identify the target lead, confirm the root domain, confirm the primary service and city, and decide whether the lead deserves:
- a quick outbound prep pass
- a standard sales bundle
- a full audit + strategy + demo pass

### Broad-market lead list workflow
When Matthew wants a cold prospecting list across a vertical or metro, do not
jump straight to broad parallel web-only subagents. Lightweight delegated web
research can stall or time out on broad discovery runs.

Use this sequence instead:
1. Run batched web searches in the main session across city + service variants.
2. Collect candidate domains and exclude obvious directories, aggregators,
   Reddit/forum results, and national brands unless they are true competitors.
3. Run targeted extraction only on shortlisted business sites.
4. Score prospects for website-first sales based on patterns like no owned
   website surfaced, ultra-thin homepage, one-page site, legacy builder feel,
   duplicated or broken sections, weak trust stack, weak service depth, or weak
   conversion path.
5. Then write the outreach angle and low-fidelity audit from extracted evidence.

This main-session batched search to shortlist to extract flow is faster and more
reliable for list building than spawning child agents too early.

### Stage 2: Sales audit
Run AuditPilot in the correct mode:
- fast HTML-first sales opportunity mode for lighter outreach
- full sales audit mode for high-value leads or active sales calls

The audit must answer:
- are they visible now?
- who is beating them?
- what revenue is leaking?
- what is structurally broken?

### Stage 3: Strategic blueprint
Hand the research to StrategyPilot.
Translate the audit into:
- the homepage thesis
- page-system gaps
- quick wins
- build-now vs build-next priorities
- the 90-day roadmap

The strategy must tell AutoPilot what the demo page is supposed to SELL.

### Stage 4: Demo homepage brief
Condense the audit + strategy into the AutoPilot handoff schema in `references/demo-homepage-brief.md`.

Use the structured brief, then collapse it into the AutoPilot `notes` field when launching the page build.

### Stage 5: Demo generation
Use AutoPilot with `page_type=homepage`.
Minimum required inputs:
- domain
- service
- location
- keyword/theme
- notes
- optional `design_template` when a specific starter profile should be forced
  from the WebsitePilot template library

### Stage 6: Visual verification and QA
Do not stop at a preview URL.
Visually verify the page and confirm:
- layout is intact
- the hero and CTA make sense
- the positioning reflects the audit/strategy findings
- no obvious CSS breakage or truncation exists

Use QAPilot if the opportunity is important enough to justify an internal review pass.

### Stage 7: Sales bundle delivery
The finished package should include whichever artifacts fit the sales tier:
- audit summary or audit doc
- strategy summary or strategy doc
- homepage demo preview URL
- screenshots if useful
- the recommended next move for Matthew

## Delivery Tiers

### Light
- quick pain summary
- 3-5 key findings
- demo recommendation or demo preview if already built

### Standard
- sales audit
- strategic homepage angle
- homepage demo preview
- short next-step summary

### Full
- full sales audit
- strategy blueprint
- homepage demo preview
- screenshots
- internal QA note
- recommended close path

## Handoff Output Format

Use this structure internally or in PM notes:
- Status: DONE / DONE_WITH_CONCERNS / BLOCKED / NEEDS_INPUT
- Lead: company, domain, market
- Audit artifact: link or file
- Strategy artifact: link or file
- Demo artifact: preview URL
- Biggest leverage point: one sentence
- Recommended next move: one sentence

## Common Failure Modes

- The domain is unclear or there are multiple domains. Fix that first.
- The audit shows pain, but the strategy never sharpens the homepage angle.
- The AutoPilot handoff is too vague and produces generic content.
- The demo preview is delivered without visual verification.
- The workflow creates too many artifacts for a low-value lead.

## Golden Rule

The story should always progress in this order:
1. Here is the pain.
2. Here is why it exists.
3. Here is what should be built.
4. Here is a live preview of the better version.
5. Here is the next step to close.
