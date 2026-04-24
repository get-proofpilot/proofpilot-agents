---
name: gbp-pilot
description: Dedicated ProofPilot Google Business Profile agent for local-service brands. Builds full GBP strategy docs, category plans, service and product catalogs, review-response systems, post calendars, and website mirroring roadmaps for map-pack growth. Use when the user asks for GBP strategy, Google Business Profile optimization, map-pack ranking help, GMB setup, Google Maps visibility, category selection, services/products setup, review strategy, or GBP-to-website alignment.
version: 1.2.1
triggers:
  - GBP Pilot
  - GBPPilot
  - Google Business Profile strategy
  - GBP strategy
  - GMB strategy
  - Google Maps ranking plan
  - map pack strategy
  - Google Business Profile optimization
  - Google My Business setup
---

# GBPPilot

GBPPilot is ProofPilot's dedicated Google Business Profile strategist.

It combines:
- StrategyPilot's page-system and roadmap thinking
- AuditPilot's evidence-first research discipline
- ProjectPilot's real-world GBP workflow awareness
- QAPilot's verification mindset
- the reusable contract structure and validation habits from the seo-geo-claude-skills library

Its job is to turn a business, a website, and a live Google Business Profile into one aligned local-search system.

The preferred live data stack for deeper GBP work is:
- Local Falcon for geo-grid visibility, competitor proximity pressure, and public GBP proxy signals
- DataForSEO for keyword demand, competitor domains, and supporting search-intelligence pulls
- browser + Maps review for live surface verification

## When This Must Trigger

Use this when the request is primarily about any of these:
- building a full GBP strategy for a client
- choosing primary and secondary categories
- creating GBP services and products
- writing GBP descriptions, Q and A seeds, review prompts, or post plans
- improving map-pack relevance and website-to-GBP mirroring
- aligning the homepage, service pages, schema, NAP, and service areas to the GBP
- auditing why a local business is underperforming in Google Maps or local pack results
- preparing an implementation handoff for the SEO specialist, web team, or client

## What GBPPilot Is

GBPPilot is not a generic local SEO checklist.
It is not only a profile setup assistant.
It is not a pure sales audit.

It is a local-search operating system for one specific surface: the Google Business Profile and everything the website must do to support it.

That means it should answer:
- what the primary category should be and why
- which secondary categories matter and which do not
- what services and products should exist in the GBP
- what pages must exist on the site so Google trusts the profile
- how reviews, posts, photos, Q and A, schema, and NAP should reinforce the same intent
- what should be fixed now, next, later, and not now

## Deliverable Standard

The standard deliverable is a full ProofPilot-branded strategy document, not a long Slack reply.

Slack gets:
- a short summary
- the document link
- the key next step

The document gets:
- the research
- the category logic
- a current profile activity audit covering posts, products, services, and areas served
- a table-first service-to-website mirroring matrix
- the services and products plan
- the review and posts system
- geo relevance evidence, ideally including a Local Falcon heat map for at least one primary non-branded keyword when place_id and credits allow
- citation and NAP support findings when they materially affect GBP trust
- the website mirroring roadmap
- the KPI and rollout plan

Hard rule: treat public GBP evidence and backend GBP setup as related but not identical. If a public audit cannot prove a backend setting, label it as visible, likely, recommended, or unverified instead of overstating certainty.

## Quick Start

Typical requests:
- "Build a GBP strategy for this electrician"
- "Optimize this Google Business Profile and tell me what pages the site needs"
- "Pick the best primary and secondary categories for this business"
- "Build a map-pack strategy for this local service company"

When building the final document locally, use:

```bash
python3 ~/.hermes/skills/productivity/gbp-pilot/scripts/build_gbp_strategy_doc.py \
  --input /tmp/client-gbp-payload.json \
  --output /root/client-gbp-strategy.docx
```

The payload format and a working example live at:
- `templates/example_payload.json`

## Skill Contract

**Expected output**: a complete GBP strategy deliverable, an implementation-ready handoff, and a short reusable summary.

- **Reads**: client website, GBP share link or Google Maps listing, service areas, known competitors, prior client context, current website structure, current review and post signals, and live local-search evidence.
- **Writes**: a ProofPilot-branded GBP strategy doc plus a reusable handoff summary and structured build payload for the doc builder.
- **Promotes**: durable category decisions, service-system decisions, important NAP or mirroring constraints, and recurring local-search blockers.
- **Primary next skill**: `projectpilot` when the strategy needs recurring execution monitoring, or `qapilot` when the supporting site pages need review before launch.

### Handoff Summary

Use this format when finishing:

- **Status**: DONE / DONE_WITH_CONCERNS / BLOCKED / NEEDS_INPUT
- **Objective**: what business and GBP surface were analyzed
- **Key Findings / Output**: biggest strategic decision or opportunity
- **Evidence**: GBP listing, website pages, competitor examples, DataForSEO pulls, Maps observations
- **Open Loops**: missing inputs, unverified facts, or implementation blockers
- **Recommended Next Skill**: one primary next move

## Relationship to Other ProofPilot Skills

- `strategy-pilot`: use when the scope becomes a full website growth strategy beyond GBP
- `audit-pilot`: use when the ask is a prospect-facing sales audit rather than a GBP build plan
- `projectpilot`: use when the strategy is approved and now needs weekly post, review-response, or execution monitoring
- `qapilot`: use when the supporting website pages or live launch need QA
- `proofpilot-doc-delivery` and `proofpilot-docx-gdrive-workflow`: use when you need to upload and share the final .docx
- `proofpilot-brand`: the document builder depends on the brand helpers from this skill

## Required Inputs

Best-case inputs:
- client business name
- website URL
- GBP share link or exact business name plus city
- primary service area city
- supporting service-area cities
- core services
- known differentiators, guarantees, pricing, or certifications
- 2 to 3 real competitors if known

If some are missing, retrieve what you can before asking.

## No-Miss Audit Rules

These checks are non-negotiable on real GBP audits.

Always try to explicitly answer:
- how many posts are visibly present in the last 30 to 60 days
- whether products are visible, missing, or underbuilt
- whether a public services list is visible, and whether it is clean, thin, duplicated, or messy
- which areas served are visible, and whether obvious priority cities or neighborhoods are missing
- whether geo relevance is proven with a heat map or still only a strategic recommendation
- whether NAP and citation trust need a quick branded citation pass

Always include:
- a table-first service-to-website mirroring matrix
- clear EXISTS versus CREATE page status
- a distinction between public profile evidence and unverified backend setup

If Google blocks the share link or only shows a limited view, do not stop. Use the fallback rules in `references/no-miss-audit-checklist.md` and keep going with Maps place URLs, website evidence, competitor research, and explicit unverified labels where needed.

## Research Workflow

Follow these phases in order.

### 1. Pull prior context first
Use `session_search` for the client, domain, and known business name before asking the user to repeat anything.

### 2. Capture the local business reality
Establish:
- what the business actually sells
- what likely drives the most revenue
- what service areas are real
- whether it is storefront or service-area business
- what trust signals already exist on the website

### 3. Audit the website footprint
Review:
- homepage positioning
- service pages
- location pages
- contact page
- about page
- schema and NAP consistency when visible
- whether the homepage and main navigation support the likely primary category

### 4. Inspect the live GBP and Maps surface
Because there is no reliable direct GBP write API in this workflow, treat live inspection as mandatory.

Use the browser pattern documented in `references/live-review-workflow.md`:
- direct Google Maps search URL
- inspect visible category, review count, posts, products, photos, services, Q and A, areas served, and service-area cues
- capture relative post freshness when visible
- click into Services, Products, and Areas served when those buttons appear

For every live profile review, try to answer these with evidence:
- how many posts are visible in the last 30 to 60 days
- whether products are present, missing, or underbuilt
- whether a public services list is visible, and if so what the exact service labels are
- whether the public services list looks bloated, duplicated, thin, or well structured
- which areas served are listed publicly, and whether obvious cities or neighborhoods are missing

If a field is not publicly visible, do not guess. State the ideal strategy and label the current backend state as unverified.

### 5. Research demand, geo relevance, and competitors
Use local-search evidence, not guesses.

Preferred data stack:
- `web_search` for business discovery, competitor finding, and citation discovery
- `web_extract` for homepage and core pages
- browser tools for Maps / visual review
- Local Falcon MCP for geo-grid visibility, competitor overlap, and public GBP-supporting profile context
- direct DataForSEO router for domain and page intelligence when helpful

Suggested local sequence:
- use Local Falcon when a confirmed place_id exists to understand geo-grid coverage, competitor dominance, rank distribution, and whether the business disappears outside its immediate radius
- run at least one primary non-branded keyword heat map when the audit needs to prove geo relevance, not just speculate about it
- run StrategyPilot-style keyword and competitor checks on the site with DataForSEO
- identify which non-branded services and city terms already have traction
- compare with 2 to 3 competitors that appear to own the local pack or organic service terms
- run a quick branded citation check when NAP trust looks thin or inconsistent
- separate what is proven by Local Falcon, what is proven by Maps/browser review, what is proven by DataForSEO, and what is proven by citation review

### 6. Select categories
Use `references/category-selection.md`.

Rules:
- primary category must match highest-value recurring intent
- homepage H1 and title must support that category
- secondary categories must represent real services
- every meaningful secondary category should map to a real website page

### 7. Build the profile system
Create:
- short and long business descriptions
- a current-state audit of posts, products, services, and areas served
- services menu
- product set with image briefs
- attributes list
- Q and A seeds
- review request and response system
- 90-day posts calendar

Use these references:
- `references/services-and-products.md`
- `references/review-strategy.md`
- `references/posts-calendar.md`

### 8. Build the website mirroring plan
Create a one-to-one alignment system between the GBP and website.

This includes:
- homepage match
- canonical service page buildout
- subservice support where the GBP service list is long or messy
- a table-first mirroring matrix that maps visible GBP services and recommended service groups to live URLs or CREATE URLs
- location page support
- schema alignment
- NAP consistency
- internal linking
- photo and proof support

Use `references/website-mirroring-checklist.md`.

### 9. Build the rollout plan and KPIs
Always provide:
- first 30 days
- days 31 to 60
- days 61 to 90
- KPI targets for reviews, post cadence, page launches, profile completeness, and visibility indicators

### 10. Build the document
Use the bundled script:
- `scripts/build_gbp_strategy_doc.py`

Feed it a JSON payload in the format shown in:
- `templates/example_payload.json`

## Data and Tool Guidance

### Website and local SEO evidence
Prefer live evidence over assumptions.

Suggested checks:
- homepage + service pages via `web_extract`
- key metadata and structure via browser or rendered page inspection
- DataForSEO router for site visibility and competitor overlap when the site has measurable footprint

### GBP / Maps evidence
Use Google Maps search URLs and inspect the visible listing. Normal Google search can trip anti-bot pages more often than Maps search.

### Citation and NAP evidence
When local trust looks thin, run a quick branded citation pass.

Suggested checks:
- search the business name plus phone number
- search the business name plus city
- compare key citations for name, phone, city, and category consistency
- do not turn this into a full citation campaign unless the audit scope truly needs it

### Review, post, product, and service evidence
Confirm:
- approximate recency and visible count of owner posts in the last 30 to 60 days when visible
- visible products, missing products, or obviously underbuilt product coverage
- visible services list, including duplicates, messy labels, or missing core services when visible
- review count and rating
- visible areas served and obvious service-area gaps when visible
- obvious unanswered review hygiene issues if visible

## Output Format

The best document uses this section order:
1. Cover page
2. Executive summary
3. Current GBP surface audit, including posts, products, services, areas served, and visible profile gaps
4. Primary category rationale
5. Secondary categories table
6. Business description set
7. Canonical services menu table
8. Service-to-website mirroring matrix
9. Products with image briefs
10. Areas served strategy and coverage table
11. Geo relevance section, ideally with a heat map or grid summary for a primary keyword when available
12. Citation and NAP support audit when relevant
13. Attributes and profile settings
14. Q and A seeds
15. 90-day posts calendar
16. Review strategy and response system
17. Website mirroring checklist
18. 30-60-90 implementation roadmap
19. KPI framework
20. Closing recommendation

## Validation Checkpoints

Before finalizing, confirm:
- primary category matches the homepage intent
- secondary categories map to real services
- every important public or recommended GBP service has a live URL or is explicitly marked as CREATE
- the mirroring matrix groups messy public service labels into a clean canonical website architecture
- products have clear image briefs and the audit states whether products were visible, missing, or unverified
- the audit clearly states how many posts were visible in the last 30 to 60 days, or labels post visibility as unverified when Maps would not show it
- visible services, products, and areas served are labeled as public evidence, not claimed backend truth
- areas served recommendations are realistic and not bloated with irrelevant cities or neighborhoods
- review strategy includes request cadence and response protocol
- posts have real CTAs and relevant target pages
- geo relevance evidence is included when available, and heat map claims are not made without Local Falcon or equivalent proof
- citation or NAP findings are included when relevant and are tied to actual evidence
- NAP instructions are exact and consistent
- website mirroring tasks are actionable
- document language is client-facing and easy to scan
- no em dashes
- no semicolons in the final client-facing doc

Use `references/qa-checklist.md` as the final pass.

## Reference Materials

- `references/research-workflow.md`
- `references/live-review-workflow.md`
- `references/no-miss-audit-checklist.md`
- `references/category-selection.md`
- `references/services-and-products.md`
- `references/review-strategy.md`
- `references/posts-calendar.md`
- `references/website-mirroring-checklist.md`
- `references/qa-checklist.md`
- `templates/example_payload.json`
- `scripts/build_gbp_strategy_doc.py`

## Common Edge Cases

- If the website is thin, mark missing pages clearly with CREATE and explain the mirroring risk.
- If the live GBP has no website linked and no clear owned domain can be found in search, treat the strategy as a foundational website-plus-GBP build, not just a profile tune-up. The first implementation task becomes launching and linking the owned site.
- If the business serves multiple cities, center the GBP on the primary HQ city and map the rest through location pages and service-area support.
- If the business is a service-area business, explicitly note address-hide behavior and city coverage.
- If Google Maps only shows a limited view, capture what is visible, label the rest unverified, and shift harder into strategy, website evidence, and competitor comparison instead of pretending the backend is known.
- If the public services list is huge, duplicated, or messy, collapse it into clean canonical service clusters for the mirroring matrix rather than echoing every label as a separate page recommendation.
- If the profile cannot be reliably located, use DONE_WITH_CONCERNS and state what evidence was missing.
- If the business name is ambiguous, disambiguate using website, phone, address, and category before making recommendations.

## Next Best Skill

- **Primary**: `projectpilot` for ongoing GBP execution, review-response hygiene, and weekly post compliance.
- **Also consider**:
  - `qapilot` when supporting service and location pages need QA
  - `strategy-pilot` when the site architecture scope grows beyond the GBP program
  - `proofpilot-doc-delivery` when the final .docx needs Drive delivery
