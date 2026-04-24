---
name: strategy-pilot
description: Build full ProofPilot-branded SEO strategy documents using audit research, competitor comparisons, page-system analysis, and SEO-director prioritization. Use when Matthew wants strategy, not a sales audit or technical teardown.
tags: [seo, strategy, content-strategy, page-architecture, competitive-analysis, aeo, strategypilot]
---

# StrategyPilot

## When to Trigger

Load this skill when ANY of these happen:
- Matthew asks for a full strategy document
- He says he wants strategy, not a technical audit
- He wants an SEO website strategy, content strategy, growth strategy, or page map
- He asks what a company should build next from an SEO perspective
- He wants a strategy-plus-audit approach that turns research into a plan
- He wants page recommendations like service pages, location pages, comparison pages, material pages, project pages, partnership pages, authority pages, or INSPO pages
- He wants the work framed like an SEO director, not like a generic SEO tool

## What StrategyPilot Is

StrategyPilot is ProofPilot's SEO director skill.

Its job is not to produce a sales audit.
Its job is not to run a technical checklist.
Its job is not to dump keywords into a document.

Its job is to answer:
- What SEO systems are missing?
- Which ones actually matter?
- Why do they matter from a search perspective, user perspective, and business perspective?
- What should be built first, later, or not at all?
- Which competitors are winning because of better structure, better proof, better intent coverage, or better page systems?

**Core distinction:**
- AuditPilot = diagnoses the current state and competitive landscape
- StrategyPilot = decides the highest-leverage SEO bets and page systems to build

## What StrategyPilot Is NOT

Do NOT let this become:
- a technical audit centered on canonicals, schema, or meta tags
- a sales proposal
- a generic list of "build more pages"
- a keyword spreadsheet without page logic
- a niche-specific framework that only works for patio covers or home services

Technical issues only matter here when they materially change the strategic conclusion.

## Deliverable Standard

When Matthew asks for a full strategy, the deliverable is a **full ProofPilot-branded strategy document**, not a long Slack message.

Slack gets:
- short summary
- document link

The document gets:
- the reasoning
- the page systems
- the prioritization
- the roadmap
- clean page maps and targeting tables that make the build plan obvious

Presentation rule:
- Make the strategy feel like a blueprint.
- Borrow the strongest layout traits from polished proposal docs, like summary tables, strategic focus boxes, and grouped page maps.
- Do NOT turn the strategy into a proposal with pricing, add-ons, or package selling.

## Relationship to Other Skills

### Use with AuditPilot
If the site needs heavy baseline discovery, load AuditPilot first or alongside this skill for:
- page inventory
- ranking snapshots
- competitor comparisons
- SERP checks
- geo-grid or market visibility inputs when relevant

Then switch into StrategyPilot mode to convert that research into a strategic plan.

### Audit-to-Strategy handoff contract
When StrategyPilot follows AuditPilot inside WebsitePilot, do not start with a
blank strategy prompt. Read the audit research ledger, audit draft, ranking
tables, competitor notes, local visibility scan, and page inventory first.

The strategy must explicitly answer:
- what demand the business is missing
- which competitors are winning and why
- which current pages should be improved, merged, or retired
- which service pages, location pages, service-plus-city pages, proof pages,
  comparison/cost/best-of pages, and content hubs should exist
- which recommendations directly support the homepage/demo thesis
- which pages are build-now, build-next, build-later, or not-now

If the audit evidence is thin, pause and gather the missing research instead of
inventing a page system. StrategyPilot can make assumptions only when they are
clearly labeled and tied to a reasonable business or search pattern.

### Use instead of AuditPilot when:
- Matthew explicitly says this is not a sales audit
- he wants a strategy overview or blueprint
- he wants to know what to build, not just what is wrong

### Old strategy skill
If `proofpilot-seo-website-strategy` exists, treat it as legacy guidance. This skill supersedes it with a more generalized, reusable, cross-vertical framework.

## Core Philosophy

Use the supporting reference files when you need deeper direction:
- `references/seo-director-playbook.md` for content pillars, hub-and-spoke structure, best-of/cost/problem pages, service-plus-city matrices, GBP strategy, and cross-vertical architecture
- `references/roi-funnel-math.md` for dream-state SEO upside, funnel math, and ROI modeling
- `references/layout-and-page-map-patterns.md` for cleaner page-map presentation, targeting tables, hub/subpage layout, and proposal-quality structure without drifting into proposal mode

Think like an SEO director.

That means:
- strategy over checklists
- systems over isolated ideas
- intent over keyword vanity
- business fit over page count
- prioritization over dumping every possible recommendation
- proof and differentiation over generic SEO advice

A strong strategy does four things:
1. Identifies the real opportunity
2. Explains why it matters
3. Prioritizes what to do first
4. Makes clear what not to waste time on yet

## Strategic Lenses

Every StrategyPilot deliverable should reason through these lenses:

1. **Demand lens**
   Where does real search demand likely exist?

2. **Intent lens**
   What is the searcher trying to accomplish?
   Buy, compare, shortlist, learn, solve, estimate, validate, or explore?

3. **Coverage lens**
   What entities, offerings, use cases, markets, and decision moments does the site already cover or fail to cover?

4. **Competitive lens**
   Which competitors are winning because they built better page systems, not just because they have a stronger domain?

5. **Conversion lens**
   Which page systems are most likely to drive qualified action, not just traffic?

6. **Proof lens**
   Does the business have enough examples, reviews, expertise, product detail, authority, or differentiation to support the page?

7. **Operational lens**
   Can the business really support this page system with actual delivery, geography, pricing, or expertise?

8. **Architecture lens**
   How do these pages work together as a system instead of sitting as isolated URLs?

## Inputs to Gather

Before drafting the strategy, gather as many of these as possible:
- client domain
- target cities, regions, or market footprint
- main services, products, categories, or offer lines
- any known priorities from Matthew or the client
- known competitors, if provided
- current page inventory
- current ranking snapshots on priority themes
- AuditPilot research ledger or audit draft when this is part of WebsitePilot
- DataForSEO top pages, ranked keywords, competitor domains, and page-two opportunities
- local visibility scan summary for local-intent businesses
- visible proof assets such as projects, reviews, certifications, partnerships, case studies, photos, videos, experts, or process detail

## Research Workflow

### Step 1: Pull prior context
Use `session_search` for:
- the client or domain
- prior strategy work on the same company
- similar strategy examples like Rocking S Hauling, Rocking S General Contracting, Steadfast Plumbing, or other relevant verticals

### Step 2: Detect the industry archetype
Before making recommendations, classify the business into one of these broad strategy templates:
- local service
- SaaS / software
- ecommerce
- publisher / media
- agency / consulting
- generic business

This helps prevent overfitting one vertical's page logic onto another. Local service pages, SaaS integration pages, ecommerce collection pages, and publisher topic hubs should not be treated as interchangeable.

### Step 3: Audit the live footprint
Use live research tools to assess:
- total URL count
- major page families
- homepage positioning
- service coverage
- location coverage
- project/case-study coverage
- blog/resource coverage
- trust/support coverage

Suggested tools:
- `firecrawl map` for URL inventory
- `web_extract` for homepage and core pages
- `web_search` for ranking snapshots and competitor discovery
- browser tools when visual structure or conversion flow matters
- direct DataForSEO Labs calls for site-explorer style domain intelligence when deeper evidence is needed

**DataForSEO rule for StrategyPilot:**
When you need domain-level SEO intelligence, prefer direct DataForSEO API over Composio wrappers.
Composio does not currently expose the core DataForSEO Labs endpoints we need for:
- ranked keyword portfolios
- competitors by domain
- relevant pages
- domain rank overview / position distribution
- domain intersection

Use the shared router:
- `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py ranked_keywords --target DOMAIN --limit 100`
- `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py competitors_domain --target DOMAIN --limit 20`
- `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py relevant_pages --target DOMAIN --limit 20`
- `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py domain_rank_overview --target DOMAIN`
- `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py domain_intersection --target DOMAIN --target2 COMPETITOR.com --limit 50`

Routing rule:
- direct DataForSEO is primary
- Composio is the backup only for overlapping endpoints where wrappers exist
- for the core site-explorer style endpoints above, the router will stay on direct because Composio does not expose them

This gives StrategyPilot a reusable research layer for ranking distribution, top pages, competitor tables, overlap analysis, and page-two opportunity modeling.

### StrategyPilot Canned DataForSEO Sequence (follow in this order)

When StrategyPilot needs domain intelligence, run this exact sequence in the main session.
This is the default research order unless Matthew asks for a lighter strategy pass.

**Core sequence**
1. `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py ranked_keywords --target DOMAIN --limit 100`
2. `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py domain_rank_overview --target DOMAIN`
3. `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py relevant_pages --target DOMAIN --limit 20`
4. `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py competitors_domain --target DOMAIN --limit 20 --max-rank-group 10`

**Competitor comparison sequence**
Choose the top 2-3 true sales competitors from step 4, then run:
1. `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py domain_intersection --target DOMAIN --target2 COMPETITOR.com --limit 50`
2. `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py ranked_keywords --target COMPETITOR.com --limit 50`
3. `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py relevant_pages --target COMPETITOR.com --limit 20`

**Expansion / planning support pulls**
- `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py keywords_for_site --target DOMAIN --limit 50`
- `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py historical_traffic --target DOMAIN`

**Strategy interpretation rules**
- `ranked_keywords` tells you what the domain already owns.
- `domain_rank_overview` tells you how much of the site sits in page 1 vs striking distance.
- `relevant_pages` tells you which page systems already carry visibility.
- `competitors_domain` tells you who is taking the demand, but must be cleaned for true business competitors.
- `domain_intersection` tells you which keyword themes overlap and where a direct gap exists.
- `keywords_for_site` is for ideation and expansion only, not for ranking proof.

**Raw-data extraction rule for deeper StrategyPilot work**
When the normal `dataforseo_router.py` CLI output is too summarized, pull the raw response inside terminal by importing the router module directly instead of scraping the printed summary.
This is useful when you need:
- top keyword rows with URLs and ranks
- full position-distribution metrics from `domain_rank_overview`
- detailed relevant-page rows
- intersection keyword lists for competitor-gap analysis

Pattern:
1. In terminal, import `_shared/skills/pilot-api-reference/scripts/dataforseo_router.py` with `importlib.util`
2. Build a small `argparse` parser that mirrors the script's CLI args
3. Call `route_endpoint(endpoint, args)` directly
4. Read from `result['response']['tasks'][0]['result'][0]`

Why this matters:
- The default CLI mode only prints a compact summary
- `--raw` can be awkward to parse in other environments when the payload is large
- Direct module import lets StrategyPilot extract exact rows cleanly for strategy tables and ROI reasoning

### Step 4: Build a page-system inventory
At minimum, classify what exists into:
- homepage
- service hubs
- service pages
- location pages
- segment pages
- use-case pages
- comparison pages
- material/product pages
- project/case-study pages
- inspiration/gallery pages
- proof/trust pages
- blog/resource pages
- process/FAQ/support pages

### Step 5: Inspect real SERP patterns
For the most important themes, inspect:
- who ranks
- what type of pages rank
- whether Google favors service pages, city pages, comparison pages, listicles, resource pages, project pages, or hybrid pages
- whether the site is absent, weak, or already showing traction

### Step 5b: Mine real buyer questions and topic demand
Before recommending blog strategy, FAQ pages, comparison pages, or authority content, gather what people are actually asking.

Check sources like:
- Google autocomplete
- Google People Also Ask
- related searches
- Reddit threads
- niche forums or Quora
- competitor FAQs and blogs
- review language

Look specifically for:
- cost questions
- best-of questions
- comparison questions
- trust and safety questions
- process questions
- emergency questions
- recurring maintenance questions
- mistakes and red-flag questions

Then convert those into page ideas, not just topic notes.
That means deciding whether each topic belongs in:
- a service page
- a location page
- a service plus city page
- a comparison or cost page
- a FAQ/resource page
- a blog spoke supporting a larger content pillar

### Step 6: Do competitor page-pattern analysis
Do not stop at naming competitors.
Identify what page systems they built that are helping them rank, such as:
- service plus city clusters
- material/product pages
- inspiration or gallery hubs
- comparison pages
- cost pages
- project/case-study libraries
- partner/manufacturer pages
- FAQ hubs
- financing, warranty, or proof pages
- audience or segment pages

Then translate that into a plain missing-page list for the client:
- pages competitors have that this site does not
- page families competitors built deeper than this site
- page types the client should add, improve, or consolidate

Make this easy to understand. Prefer language like:
- "Competitors have these pages and you don't"
- "These are the service pages you're missing"
- "These are the city pages worth building next"
- "These are the commercial pages that would help you win more qualified leads"

### Step 7: Run support-layer checks
StrategyPilot stays strategic, but it should still scan supporting layers that can influence the plan. These are not the centerpiece unless they materially affect the recommendation:
- technical baseline: robots, crawlability, indexability, redirects, broken links
- content quality baseline: thin pages, duplication, E-E-A-T gaps, readability
- internal-linking and architecture baseline
- image baseline: missing alt text, oversized images, missing dimensions, weak gallery/image SEO
- schema and entity baseline when it affects trust or AI discoverability
- GEO and AEO baseline: llms.txt, AI crawler access, answer-block structure, citation-ready passages, best-of or comparison opportunities
- visual proof baseline: whether the site has the project, gallery, before-and-after, or authority assets needed to support the strategy

Critical thinking rule:
- Distinguish between real business strategy and obvious template residue.
- If a site mentions another city, state, or market but the rest of the proof clearly points elsewhere, treat that first as likely lazy template carryover or agency sloppiness, not as a confirmed multi-market strategy.
- Call it what it is in plain language: a template/content QA problem, unless there is strong evidence the business is truly serving both markets.

Content-quality rule:
- Read pages like a real customer, not just an SEO.
- Judge whether the copy is actually useful, specific, trustworthy, and clearly structured.
- Explicitly note when pages are thin, generic, repetitive, AI-sloppy, badly headed, unclear, or not answering real buyer questions.
- Explicitly note when content is strong, specific, locally relevant, and genuinely helpful.

Think of these as **support layers**, not the primary output. If they are weak, mention them as enabling constraints or easy audit-layer wins.

### Step 8: Convert research into strategic opportunities
Every recommendation must answer:
- what page system or structure is being recommended
- why it matters
- how it fits the business
- what role it plays in the user journey
- what evidence supports it

For each major opportunity, decide if it belongs in one of these buckets:
- core page the site must have
- strategic page competitors missed or underbuilt
- question-driven content from real buyer demand
- AI-citation or best-of opportunity
- local relevance opportunity
- GBP-supporting page or proof asset

### Step 8b: Build the site architecture, internal linking, and content-pillar plan
Do not stop at listing pages.
Turn the recommendations into structure.

That means defining:
- the main hub pages
- the spoke pages under each hub
- what should link to what
- which pages support conversion
- which pages support authority
- which pages support local relevance
- which pages support the Google Business Profile for local brands

For blog and resource strategy, use a hub-and-spoke model:
- pillar or hub page for the big topic
- supporting spoke articles for the subtopics
- spokes link back to the hub
- the hub links to the key service or money pages

Presentation rule:
- Show the structure in clean grouped tables, not just paragraphs.
- When helpful, break it into:
  - core site structure table
  - service priority matrix
  - service roadmap table
  - location page table
  - service plus city matrix
  - content pillar table
  - internal linking map
- Make it easy for a reader to see the main page, the subpages under it, and the targeting logic.
- For strategy docs, prefer keyword or local search-volume estimate columns over proposal-style status columns.
- In Recommended Page Systems tables, do not use a generic priority column as the main evidence of impact. Use estimated local monthly search volume or local keyword demand instead.

### Step 8c: Model the SEO upside with funnel math
Every full strategy should connect the page strategy to business impact.

Build a simple three-case model:
- conservative
- realistic
- aggressive

Use:
- keyword demand or market demand estimates
- likely ranking or CTR assumptions
- estimated organic traffic potential
- conversion-rate assumptions
- close-rate assumptions if available
- average ticket value or customer value assumptions
- competitor keyword visibility when helpful
- lifetime value when the business has recurring or repeat revenue

Show:
- traffic potential
- lead math
- booked-job or customer math
- revenue estimates
- total ROI

Also include:
- lead economics
- cost of waiting

The goal is not fake certainty.
The goal is to show the business owner what strong SEO could be worth if the strategy is executed well.
Use ranges and label assumptions clearly.

### Step 9: Prioritize ruthlessly
Everything should fall into:
- build now
- build next
- build later
- not now

## Taxonomy of Page Systems

This is the core reusable system. StrategyPilot should think in these buckets, then add vertical-specific ideas where justified.

### A. Core commercial pages
These capture the main money intent.
- primary service pages
- subservice or specialization pages
- product or solution-type pages
- service hubs

### B. Geographic pages
Use when local or regional intent matters.
- city pages
- metro pages
- service plus city pages
- neighborhood or submarket pages
- office or location pages
- service-area hub pages

### C. Audience and segment pages
Use when the same offer needs different messaging, proof, or process.
- residential vs commercial
- homeowner vs builder vs property manager
- SMB vs enterprise
- industry vertical pages
- persona or role pages

### D. Problem and use-case pages
Use when users search around the problem, outcome, or scenario.
- symptom pages
- problem-solution pages
- use-case pages
- emergency or urgent-intent pages
- scenario pages

### E. Comparison and decision-stage pages
Often high value and underused.
- X vs Y pages
- best-of or top-rated pages
- how to choose pages
- alternatives pages
- installer or provider comparison pages
- cost, pricing, and estimate pages

### F. Product, material, and option pages
Use when buyers compare what something is made of or how it differs.
- material pages
- manufacturer pages
- product-family pages
- feature or option pages
- style pages
- product comparison pages

### G. Proof and trust pages
These support conversion and rankings by proving credibility.
- project pages
- case studies
- gallery pages
- testimonials/reviews pages
- team or expert pages
- certifications, awards, warranty, financing, and process pages
- partnership or authority pages

### H. Informational and authority pages
Use when they support topical authority and funnel users toward commercial intent.
- FAQ hubs
- buyer guides
- resource hubs
- glossary/definition pages
- compliance or regulation pages
- trend pages
- maintenance or care pages
- content pillar hubs
- spoke articles tied to real buyer questions

### I. Best-of, cost, and comparison pages
These are often overlooked and can become high-value SEO and AI-search assets.
- best company in city pages
- top provider pages
- cost pages
- how much does it cost pages
- X vs Y pages
- DIY vs professional pages
- how to choose pages

### J. Inspiration and discovery pages
Use when visual or design intent matters.
- inspiration pages
- before-and-after pages
- style galleries
- idea pages
- trend roundups
- design-planning pages

### K. Cleanup and consolidation opportunities
Not every strategy requires adding pages.
- merge weak pages
- reposition pages for better intent fit
- expand winners into hubs
- prune low-value ideas
- de-prioritize unsupported page concepts

### L. Local ecosystem connection pages
Use when local SEO and GBP support matter.
- service area hub pages
- pages that should be linked from GBP services or products
- review, process, guarantee, and location-proof pages that strengthen website-to-GBP relevance

## Architecture and Hub-and-Spoke Rules

A great strategy does not just say what pages to create. It shows how they connect.

### Default architecture questions
- What is the main commercial hub?
- What are the main subservice pages?
- What are the highest-priority location hubs?
- Which pages deserve service plus city versions?
- What proof pages support the money pages?
- What FAQ or blog pages support the hubs?

### Common patterns by site type
- local service: homepage -> residential/commercial hubs -> service pages -> city pages -> service plus city pages -> proof pages -> FAQ/resources
- SaaS: homepage -> solution hub -> feature pages -> use-case pages -> industry pages -> comparison pages -> help/resources
- ecommerce: homepage -> collection pages -> product pages -> brand/use-case/comparison pages -> buying guides -> FAQ/support
- agency or consulting: homepage -> service hub -> service pages -> industry pages -> case studies -> process page -> authority content

### Blog strategy rule
Do not recommend random blogs.
Recommend content pillars with supporting spokes.
Each pillar should support a real business topic, and each spoke should answer a real question people are asking.

### Local SEO rule
For local brands, include the website-to-GBP connection where relevant:
- primary and secondary categories
- service lists
- product/service entries
- posts
- review flow
- which website pages GBP should reinforce

## How to Think About Opportunities

Every recommendation should fit one of these buckets:

### 1. Core SEO foundation
These are page systems that a serious player in the market should almost always have.
Examples:
- main service pages
- core city pages
- key proof pages
- core comparison or FAQ assets where expected by the market

### 2. Critical-thinking strategy
These require interpretation of the market, brand, offer mix, project history, buyer journey, or search behavior.
Examples:
- partnership pages
- manufacturer authority pages
- niche use-case pages
- premium segment pages
- problem-specific pages inferred from customer reality

### 3. True growth opportunities
These are the levers most likely to create ranking gains, better AI-search citations, stronger user journeys, and more qualified leads.
Examples:
- high-intent comparison pages
- service plus city clusters in winnable markets
- product/material pages for lower-funnel demand
- project-driven local authority systems
- category-defining authority pages

### 4. SEO director edge opportunities
These are the smart plays many websites miss, but strong strategists look for them.
Examples:
- best company in city pages
- top provider pages
- cost pages
- DIY vs professional pages
- how to choose pages
- pages built from real Reddit, People Also Ask, and review-language demand
- GBP-supporting pages that strengthen local relevance between the website and Google Business Profile

## Embedded Specialist Roles

When the task is large, StrategyPilot should implicitly think through these specialist roles, whether sequentially in one session or via subagents:
- **SERP Pattern Analyst** — what kinds of pages Google is rewarding for each theme
- **Competitor Structure Analyst** — which page systems competitors built and how deep they went
- **Content and E-E-A-T Analyst** — what proof, authority, expertise, and trust assets exist or are missing
- **Question Mining Analyst** — what people are asking on Google, Reddit, forums, reviews, and FAQs
- **Architecture Analyst** — how hubs, spokes, internal linking, and page families should connect
- **Local Ecosystem Analyst** — how the website, location pages, and Google Business Profile should reinforce each other for local brands
- **GEO / AEO Analyst** — what comparison, answer, entity, and citation opportunities support AI and answer-engine visibility
- **Audit-Layer Analyst** — basic technical, image, schema, and crawl observations that materially affect the strategy
- **Verifier** — dedupe weak ideas, remove unsupported claims, and downgrade anything lacking evidence

## Evidence Standard

Use an evidence-first approach adapted from LLM-first SEO audit workflows.
For every major recommendation, be able to state:
- **Finding** — what is missing, weak, or strategically important
- **Evidence** — page inventory, SERP behavior, competitor examples, visible proof gaps, or query snapshots
- **Impact** — why it matters for ranking, AI visibility, conversion path, or site authority
- **Recommendation** — what to build, expand, merge, or de-prioritize

Use confidence labels internally when needed:
- **Confirmed** — directly observed
- **Likely** — strong signal, partial verification
- **Hypothesis** — useful idea, but needs more evidence before pushing hard

Do not present hypotheses as confirmed strategy.

## Prioritization Framework

Do NOT prioritize by keyword volume alone.

Score or reason through these factors:

1. **Revenue proximity**
   How close is the page system to money?

2. **Demand confidence**
   Is there strong evidence or high confidence that demand exists?

3. **Intent quality**
   Is the user ready to buy, compare, shortlist, or request an estimate?

4. **Strategic fit**
   Does the page align with what the business actually wants to sell and can fulfill well?

5. **Coverage gap severity**
   Is this a major hole versus competitors or market expectations?

6. **Differentiation potential**
   Can the business win with better proof, better expertise, better trust, stronger brand position, or more useful guidance?

7. **Proof readiness**
   Can the business support the page with examples, reviews, credentials, process detail, project evidence, or product expertise?

8. **Build efficiency**
   Can this system be launched without creating huge content debt?

9. **Internal leverage**
   Will this page help multiple other pages rank or convert better through linking and architecture?

10. **Maintenance burden**
   Will this create ongoing work without enough upside?

### Priority tiers
- **P1**: high commercial value, strong evidence, strong fit, should build now
- **P2**: clearly valuable, but depends on core foundations or stronger proof
- **P3**: useful expansion or authority play, but not urgent
- **Not now**: weak fit, weak demand, weak proof, or poor return

## StrategyPilot Output Format

The best deliverable is a ProofPilot-branded strategy document with sections like these:

1. Cover Page
   - SEO Website Strategy
   - Website Growth Strategy
   - Content Architecture Strategy
   Pick the title that best matches the ask.

2. Executive Summary
   - what the brand has going for it
   - what is structurally missing
   - the main growth thesis

3. Current Site Quality Snapshot
   - page inventory by type
   - which pages are strong
   - which pages are thin, generic, unfinished, or weak
   - ranking snapshot on priority themes
   - clear strengths and weaknesses in plain language

   **Important format rule for ranking snapshots:**
   - Do NOT keep this section generic when Matthew wants to see what the site actually ranks for.
   - For local service strategy docs, make this feel closer to a Search Atlas or Ahrefs domain ranking export.
   - Include a table of the top 15-25 visible keywords with columns like:
     - keyword
     - branded vs non-branded
     - current position
     - estimated traffic
     - search volume
     - short takeaway
   - Explicitly call out whether traffic is mostly branded. If branded terms dominate, say that plainly: this usually means the site is not yet winning meaningful non-branded SEO demand.
   - Explicitly call out the best non-branded money terms that show upside but are still outside the top 3.
   - For home service businesses, explicitly note whether map pack / local pack visibility exists for non-branded terms. If the only local-pack visibility is on brand searches, call that a major missed opportunity.
   - Use the section to show not just that rankings exist, but whether those rankings are actually producing useful SEO traffic.

4. Pages Competitors Have That You Don't
   - service pages competitors built that matter
   - location pages competitors built that matter
   - comparison, cost, industry, FAQ, and proof pages competitors built that matter
   - keep this easy to scan and easy to act on

5. The Strategic Diagnosis
   - the core point of view
   - what the site currently acts like
   - what it needs to become

6. Recommended Page Systems
   Organize by the systems that matter most for the client, such as:
   - service pages
   - location pages
   - service plus city pages
   - segment or industry pages
   - problem/use-case pages
   - comparison and cost pages
   - proof/trust pages
   - authority/content-pillar pages
   - blog spoke content

   For each important page system, include:
   - what pages already exist
   - what is weak about the current pages
   - what pages are missing
   - examples of pages to build next
   - why those pages matter for leads and rankings

7. Content Strategy and Question Mining
   - what people are asking
   - what should become service-page content
   - what should become FAQ or resource content
   - what should become spoke articles under a larger pillar
   - smart opportunities most competitors miss, like best-of, cost, comparison, and decision pages

8. Recommended Site Architecture
   - how the systems should link together
   - which pages become hubs
   - which pages become spokes
   - how proof supports commercial pages
   - how blog and FAQ content support the money pages

   Strong presentation options here include:
   - a core site structure table
   - a service priority matrix
   - a service roadmap table using page, URL, and estimated local keyword or search volume
   - a location page map
  - a service plus city matrix
  - a content pillar and spoke table
  - a simple internal linking map

   **Important format rule for hierarchy and page maps:**
   - For future StrategyPilot docs, make the hierarchy visually obvious at a glance.
   - Do not leave the reader guessing what a "service cluster" means.
   - Show the main category page first, then list the subpages underneath it.
   - For core service plans, prefer layouts like:
     - main category page
     - subpages underneath it
     - why this hub matters
     - estimated local search volume or keyword demand
   - For service-plus-city plans, group the pages by parent service instead of scattering isolated service/city rows.
   - Example logic: Roof Repair first, then Oro Valley Roof Repair, Marana Roof Repair, Green Valley Roof Repair underneath that family.
   - The hierarchy should read like a blueprint, not like a loose spreadsheet.

9. Local SEO and GBP Layer, when relevant
- website and Google Business Profile alignment
   - category, service, post, and page-link recommendations
   - how the site should reinforce GBP relevance

10. Prioritized Build Plan
   - P1, P2, P3, Not now
   - clear rationale for each

11. 90-Day Rollout Plan
   - build order
   - what comes first
   - what can wait

12. 12-Month Future State
   - where the site should be if the strategy is executed

13. Revenue and ROI Model
   - conservative, realistic, and aggressive scenarios
   - traffic potential
   - lead math
   - booked-job or customer math
   - revenue estimates
   - total ROI using clear assumptions
   - lifetime value when relevant
   - lead economics and cost of waiting

14. KPI Framework
   - what to measure
   - which page types should drive rankings, visits, leads, and assisted conversions

15. Optional: De-prioritized Ideas
   - what not to spend time on yet
   This is valuable. A good strategy says no.

## Writing Guidance

Write like a growth strategist with clear judgment.

Primary audience rule:
- Write for business owners and internal team members first.
- Aim for extremely clear language, roughly a fifth-grade reading level.
- If a section would confuse a smart non-SEO reader, rewrite it.
- Prefer plain language over SEO jargon. If jargon is necessary, explain it simply.

Layout rule:
- Make the strategy easy to scan.
- Use grouped sections, clean tables, and obvious hierarchy.
- When you are talking about page structure, clearly separate:
  - main pages
  - hub pages
  - subpages
  - location pages
  - service plus city pages
  - pillar pages
  - spoke articles
- The reader should be able to understand the page plan at a glance.
- A strong pattern is:
  - bold section title
  - one-line strategic statement
  - grouped roadmap table beneath it
- In page-map sections, keyword or search-volume columns often communicate strategy better than status columns.
- When Matthew likes a richer visual direction, default to the refined StrategyPilot layout style instead of a plain memo layout.
- That means using a front summary snapshot, sharper competitor-gap tables, visual sitemap or hierarchy pages, service priority matrices, grouped roadmap tables, page markers, and subtle brand-line continuity across pages.
- The goal is premium document rhythm and clarity, while still staying in strategy mode and never drifting into proposal pricing or package language.

Good patterns:
- "This page is too thin to win."
- "Competitors have these pages and you don't."
- "This service page exists, but it is too generic to stand out."
- "This page type matters because it helps people who are ready to choose a company."
- "You do not need more random content. You need the right pages."

Avoid:
- generic advice
- jargon for its own sake
- overexplaining basic SEO
- technical rabbit holes unless they change strategy
- abstract phrasing that sounds smart but is hard for a client to follow
- proposal-style pricing or add-on framing inside a strategy doc

## Cross-Vertical Critical-Thinking Prompts

Use these prompts to avoid narrow thinking:
- What would a buyer search before they know the brand?
- What would they search after they know the category but before they choose a provider?
- What would they search when comparing options, materials, providers, or pricing?
- What proof would they want before contacting the business?
- Which pages would make the site more citable in AI answers?
- Which opportunities are obvious category foundations versus subtle strategic opportunities?
- Which pages only make sense if the business has real authority or real proof?
- Which page ideas sound smart but would create low-value content debt?

## Pitfalls

- Do not overfit the strategy to one niche or one prior client
- Do not recreate a sales audit under a new name
- Do not default to technical checklist recommendations
- Do not recommend pages just because a competitor has them
- Do not confuse keyword variants with true page opportunities
- Do not recommend pages the business cannot credibly support
- Do not make local pages automatic. They still need demand logic and proof
- Do not recommend broad information hubs with no path to business value
- Do not ignore consolidation opportunities
- Do not make everything high priority
- Do not deliver vague outputs like "build more service pages"
- Do not mistake template junk or lazy agency leftovers for real business strategy
- Do not recommend random blog topics without tying them to a pillar, a question pattern, or a money page
- Do not use language so abstract that a client cannot tell what to build next
- Do not let cleaner presentation push the strategy into proposal mode
- Do not add pricing, add-ons, or package-selling sections to a strategy doc

## Verification Checklist

Before finishing, confirm:
- Is this clearly a strategy document, not an audit or proposal?
- Did I use live page inventory and live SERP or competitor evidence?
- Did I organize the recommendations into systems, not random ideas?
- Did I explain why each major system matters?
- Did I show what pages are weak, what pages are missing, and what pages should be built next?
- Did I include architecture thinking, not just a page list?
- Do the page-map sections use clean matrix-style tables with service families, page/URL/keyword or search-volume clarity, and easy-to-scan hierarchy?
- Did I include blog, FAQ, or content-pillar strategy only where it actually supports the business?
- Did I include GBP alignment when the business is local and GBP matters?
- Did I include a dream-state ROI or funnel math section that ties the strategy to business impact?
- Did I prioritize what should be built now, next, later, and not now?
- Did I make the strategy fit the actual business model and market reality?
- Is the language simple enough for a client to understand quickly?
- Is the document fully ProofPilot-branded?
- Am I delivering the full work as a doc, not as Slack text?

## Gold Standard Outcome

A great StrategyPilot document should make Matthew feel:
- this is what an SEO director would say
- this is grounded in real research
- this is not generic agency fluff
- this tells us what to build and why
- this also tells us what not to waste time on
