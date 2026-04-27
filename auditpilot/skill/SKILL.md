---
name: audit-pilot
description: >
  AuditPilot: ProofPilot's named agent for website audits, SEO competitive analysis,
  and branded audit reports. Sales documents, not technical checklists. Uses DataForSEO
  for keyword/traffic data, Firecrawl for site crawling, and the Strategic Brain for
  human-level insight. Gold standard: Big Ben Electric audit.
  Aliases: AuditPilot, Audit Pilot, "audit this site", "website audit", "SEO audit", "run an audit"
tags: [audit, seo, website, competitive-analysis, sales, proposal, auditpilot, audit-pilot]
---

# AuditPilot

## When to Trigger

Load this skill when ANY of these happen:
- Someone says "AuditPilot", "Audit Pilot", "audit this site", "run an audit"
- Someone asks for a "website audit", "SEO audit", "competitive analysis"
- Someone shares a prospect URL and asks for an assessment or evaluation
- A new lead needs a "site review" before a sales call
- Someone asks to "analyze" or "evaluate" a website for SEO gaps
- Someone says "competitive intelligence", "reverse-engineer their playbook", "learn what they do well"
- Someone asks to "study" an agency or company (use Competitive Intelligence variant)

ProofPilot's dedicated audit agent. Strategic, sales-focused website audits that identify WHY a business is invisible online and quantify the revenue they are losing.

**Gold Standards:**
- Big Ben Electric (original standard): https://docs.google.com/document/d/1AnSbkTyVQR_C5EGgU6vQkez5VBF78EW7/edit
- AP Pest Control v3 (Sales Audit v2 structure, Apr 9 2026): https://docs.google.com/document/d/1Yp_mT0Mu52_Aae6v5dpnahdwuIb2V_ys/edit
  Use AP Pest v3 as the reference for Sales Audit v2 structure: ranking reality first, per-competitor keyword ranking tables in Section 03, schema as subsection in Red Flags, Growth Playbook with 6 pillars, 12-month From/To comparison.

## Core Philosophy

SALES DOCUMENTS, not technical checklists. The audit validates pain, quantifies it with real data, and builds urgency to act NOW.

## Before You Start

Load in order:
1. THIS skill references/strategic-brain.md (8 strategic dimensions)
2. THIS skill references/dataforseo-auth.md (DataForSEO Composio webhook auth)
3. THIS skill references/document-sections.md (detailed section instructions)
4. THIS skill references/agentic-seo-patterns.md (adapted LLM-first SEO support layers for sharper audit depth)
5. proofpilot-brand skill (colors, typography)
6. proofpilot-proposals skill scripts/branded_proposal_builder.py

**MANDATORY: Local Falcon geo-grid scan with AI analysis on every audit.** No
exceptions. The rich grid image and AI strategic analysis are the highest-value
content in the doc. Kick off the scan FIRST (it runs in the background for 1-3
minutes) so it is done by the time the subagents return. See the "Local Falcon"
section below for the exact command sequence.

## Data Collection (3 Parallel Subagents)

**CRITICAL: Opus rate limit failure mode (learned Apr 9 2026).** Running 3 parallel Opus subagents WILL hit HTTP 429 rate limits. When this happens, the subagent's `summary` field gets overwritten with just the error message ("API call failed after 3 retries: HTTP 429"), and ALL the collected data from successful tool calls is LOST even though the tools themselves succeeded. The tool_trace shows successful calls but the summary contains nothing useful.

**Mitigation options (in order of preference):**
1. **Run sequentially in main session** — slower but no rate limit issues, no file isolation issues, full data preserved. This is the SAFEST default for AuditPilot.
2. **Run subagents with cheaper model** — pass `acp_command` with a non-Opus model. Matthew's preferred fallbacks: `xiaomi/MiMo-V2-Pro` (smarter) or `minimax/minimax-m2.7` (huge context).
3. **Run only 1-2 subagents at a time** — stagger them so Opus doesn't get hammered.
4. **Always have a sequential fallback plan** — if subagents return rate-limit errors, immediately switch to main-session sequential collection. Don't retry subagents.

The sequential approach in the main session collects everything in ~10-15 web_extract / terminal calls and is reliable. For a standard audit (homepage + 5 service pages + 3 location pages + schema curl + DataForSEO + competitor searches), sequential takes ~5 minutes vs ~7 for parallel subagents and never loses data.

**CRITICAL: Subagent file isolation.** Each subagent runs in its own terminal session. Files written to /tmp/ by subagents are NOT accessible from the main session. Two approaches:
1. **Preferred**: Have subagents collect data, rely on their returned summaries for synthesis, then re-run only the specific data queries you need for document tables (e.g., DataForSEO keywords) directly in the main session.
2. **Alternative**: Don't use subagents for data collection. Run everything sequentially in the main terminal. Slower but no file isolation issues.

The parallel subagent approach is still faster overall because summaries contain 90% of what you need, and only the keyword tables require exact numbers from re-queried data.

**DataForSEO: Always run in MAIN session, NOT in subagents.** Use the shared router in
the main terminal, not subagents. Preferred helper:
`python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py`
Routing policy: direct DataForSEO is primary, Composio is backup only where an overlapping
wrapper exists. After subagents return, run routed DataForSEO calls for the prospect domain
AND 2-3 competitor domains identified by the subagents. This gets you exact search volumes,
CPC, ranked keyword portfolios, relevant pages, competitor tables, and position-distribution
data for the document tables.

**Post-Subagent Data Re-Query Checklist:**
1. DataForSEO ranked_keywords for prospect (main session terminal)
2. DataForSEO ranked_keywords for top 2-3 competitors (main session terminal)
3. Screenshot capture of 3-5 key pages (main session browser)
4. Any specific numbers from subagent summaries that seem rounded or estimated

## Research-First Operating Contract

AuditPilot does not write the audit until the research layer is complete enough
to support the sales story. Before drafting, create `/tmp/<client>-audit/research-ledger.md`
or `/tmp/<client>-audit/research-ledger.json` with:

- confirmed business name, root domain, primary market, services, and known competitors
- URL inventory and page-family classification from Firecrawl/sitemap/robots checks
- ranking reality table for 10 core money queries
- broader 20-25 query SERP sweep with competitor positions when Sales Audit v2 is needed
- DataForSEO domain intelligence for the prospect and 2-3 true sales competitors
- indexed-page count compared with sitemap/page inventory
- local visibility scan summary when the business has local intent
- conversion, proof, trust, schema, content-quality, image, crawlability, and AEO/GEO support-layer notes

Each major finding must have `finding`, `evidence`, `impact`, and `fix`. If a
claim cannot be tied to the ledger, it does not go in the audit.

### AuditPilot Canned DataForSEO Sequence (follow in this order)

For every serious sales audit, run this exact router sequence in the main session.
Do not improvise the order unless Matthew asks for a custom cut.

**Prospect sequence**
1. `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py ranked_keywords --target DOMAIN --limit 100`
2. `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py ranked_keywords --target DOMAIN --limit 100 --filter-page-two`
3. `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py domain_rank_overview --target DOMAIN`
4. `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py relevant_pages --target DOMAIN --limit 20`
5. `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py competitors_domain --target DOMAIN --limit 20 --max-rank-group 10`

**Top competitor follow-up sequence**
Run for the top 2-3 true sales competitors surfaced by step 5:
1. `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py ranked_keywords --target COMPETITOR.com --limit 50`
2. `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py relevant_pages --target COMPETITOR.com --limit 20`
3. `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py domain_rank_overview --target COMPETITOR.com`

**Optional support pulls**
- `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py historical_traffic --target DOMAIN`
- `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py keywords_for_site --target DOMAIN --limit 50`
- `python3 _shared/skills/pilot-api-reference/scripts/dataforseo_router.py domain_intersection --target DOMAIN --target2 COMPETITOR.com --limit 50`

**Interpretation rules**
- Treat `ranked_keywords` + `domain_rank_overview` + `relevant_pages` as the core site-explorer replacement.
- Treat `competitors_domain` as a starting pool, then post-filter out the target domain itself plus obvious publishers, directories, health sites, forums, and other non-sales competitors.
- Use `keywords_for_site` for expansion ideas only, never as the primary ranking portfolio.
- Use `historical_traffic` only when trend direction helps the narrative.

## Ranking Reality Check (REQUIRED for Sales Audit v2)

Before building the doc, you MUST run these two checks in the main session.
The output of these is what anchors Section 02 (The Ranking Reality) and the
cover page stats bar.

**Check 1: Are they ranking for ANY of their core keywords?**
Use the current environment's web search/browser tools, or the DataForSEO
`serp_live` endpoint through `_shared/skills/pilot-api-reference/scripts/dataforseo_router.py`
when scripted SERP capture is needed. Run 10 high-intent commercial queries in
the market. Look for the target domain in the top 10. For each query, record:
query, target rank or `Not in top 10`, #1 domain, #1 page type, and notes.

**Check 2: How many pages are actually indexed vs. sitemap count?**
Run `site:domain.com` through the current environment's web search/browser
tools. Count visible indexed pages and compare that with the sitemap or
Firecrawl inventory. Save the URLs in the research ledger.

**Gold finding pattern:** "0 of 10 keywords ranking | X of Y pages indexed"
goes straight into the cover page stats bar. If they rank for nothing AND most
of their pages aren't indexed, that IS the audit. Everything else is just
explaining why.

**When to skip this:** Never skip it. Even if the prospect is an established
site with obvious rankings, running the 10-query check gives you the
competitor-per-query data for Section 02 and the "Who Is #1" column.

**Check 3 (REQUIRED for Section 03): Broader SERP sweep for competitor ranking tables.**
After the 10-query check, expand to 20-25 queries and track ALL competitor
positions, not just the prospect. This powers the "What They Are Actually
Ranking For" subsection with per-competitor ranking tables. Save the sweep to
`/tmp/<client>-audit/competitor-rankings.json` or a markdown table in the
research ledger.

Track 20-25 queries covering core commercial, service+city, specialty,
emergency, commercial, and adjacent high-intent terms. Track the prospect plus
5-7 real competitors. Normalize subdomains before matching, for example strip
`www.`, `locations.`, and city/location subdomains so `locations.trulynolen.com`
matches `trulynolen.com`.

Then cross-reference each ranked keyword with DataForSEO volume/CPC data you
already pulled. For missing volumes, run a second DataForSEO call specifically
for the keywords that appeared in the SERP sweep. The output goes directly
into per-competitor 3-column tables (Position | Keyword | Monthly Searches)
sorted by position ascending. Use location_code 2840 (USA) for broader CPC/volume
coverage; 1014226 (Phoenix) often returns null CPC for low-volume terms.

**Subdomain normalization pitfall:** `locations.trulynolen.com/scottsdale` and
`orkin.com/locations/arizona-az/scottsdale-pest-control/branch-882` need to be
normalized. Strip `www.`, `locations.`, and other subdomain prefixes before
matching against your target_domains list. Otherwise Truly Nolen will appear
as `locations.trulynolen.com` and you'll miss the match.

### Subagent 1: Site Crawl + Content (terminal + web)
Sitemap curl, Firecrawl Map (/v1/map), homepage scrape, 5+ service pages, same service across 3+ cities for template duplication, blog dates, 404 checks, phone numbers, robots.txt.

**Firecrawl CLI commands (preferred for subagents, writes to filesystem):**
```bash
# Full site download to .firecrawl/ directory (maps + scrapes all pages)
firecrawl download https://prospect-site.com -o /tmp/audit-crawl/

# Recursive crawl with progress (JSON output with all page data)
firecrawl crawl https://prospect-site.com --wait --progress -o /tmp/crawl-data.json

# Map all URLs on the domain (fast, 1 credit)
firecrawl map https://prospect-site.com -o /tmp/sitemap.json

# Scrape specific pages to markdown files
firecrawl scrape https://prospect-site.com/services --format markdown -o /tmp/services.md
firecrawl scrape https://prospect-site.com/about --format markdown -o /tmp/about.md

# Search + scrape competitors in one step
firecrawl search "best electrician mesa az" --scrape --limit 5 -o /tmp/competitors/
```
CLI writes results to filesystem, keeping large outputs out of agent context. Use CLI for bulk operations, SDK for programmatic single-page access.

**Copy-paste artifact checks (high-value CEO findings):**
- Grep all service page content for competitor/agency names left behind (e.g., "Choose Allied" on a YSC Paving site)
- Check for conflicting experience claims across pages (e.g., "50 years" on one page, "25 years" everywhere else)
- Look for test/draft pages indexed: /test-page/, /auto-draft-*, /sample-page/, lorem ipsum content
- Check form dropdowns and labels for typos (e.g., "Seralcoating" instead of "Sealcoating")
- Check schema email, phone, and address fields for agency artifacts or mismatched data
- Check all image alt text (empty alt on 66+ images = major SEO + accessibility finding)

**Deep technical checks (always include):**
- Schema markup: check for LocalBusiness, Service, FAQ, AggregateRating, Organization (view page source)
- Schema bugs: empty fields, typos in breadcrumbs, incorrect URLs
- Canonical tags, Open Graph tags, Twitter Card tags on all pages
- Meta robots directives
- jQuery/JS library versions (outdated = security risk finding)
- Render-blocking scripts in `<head>`
- Image formats (WebP vs JPG/PNG), lazy loading coverage
- Internal cross-linking between related service pages
- URL structure consistency and any developer artifacts (/components/, ?id=)
- 404 page quality (does it have CTAs or just "page not found"?)
- External dependencies count (CDN, third-party scripts)

**Expanded audit support layers (adapted from LLM-first SEO skill patterns):**
These are not always the headline of the audit, but they make the audit sharper and catch basic misses that current providers often ignore.
- **Image audit layer**: missing alt text, oversized files, wrong formats, missing width/height dimensions, weak lazy-loading strategy, poor gallery image SEO
- **Internal-link layer**: orphan or weakly connected service/location pages, poor hub-to-spoke linking, dead-end proof pages
- **Robots / AI crawler layer**: robots.txt status, AI crawler access, llms.txt presence when relevant for AI-search strategy
- **Redirect / broken-link layer**: bad chains, loops, dead links, and support-page failures that erode trust or crawl quality
- **Social-meta layer**: weak or missing Open Graph/Twitter Card coverage on key pages
- **Verification layer**: dedupe findings, remove contradictions, and downgrade anything lacking evidence instead of overstating it

**Important:** In AuditPilot these layers support the main story. Do not let them bury the bigger ranking, content, market, and conversion narrative.

**NEW - Firecrawl v2 Extract (structured site data):**
Load scripts/firecrawl_agent.py and run:
```python
from firecrawl_agent import site_extract_helper
data = site_extract_helper("https://prospect-site.com", trade="HVAC")
# Returns: company_name, phone, address, services[], service_areas[],
#          about_summary, team_size, years_in_business, certifications[], USPs[]
```
Or CLI: `python3 firecrawl_agent.py site-extract --url "https://prospect.com" --trade "plumbing"`

This replaces multiple individual scrape calls with ONE structured extraction.
Still use /v1/map for URL inventory and /v1/scrape for raw HTML analysis.

### Subagent 2: Keywords + Competitors (terminal + web)
Use direct DataForSEO API from the MAIN session for exact domain intelligence.
Subagent 2 can do market reconnaissance and competitor discovery, but the hard numbers
should come from direct DataForSEO pulls using the shared helper script documented in
`pilot-api-reference` and `references/dataforseo-auth.md`. Pull ranked keywords for the
prospect AND top 2-3 competitors, plus relevant pages, domain rank overview, and
competitors-domain output where useful. Use keyword suggestions as a support layer, not
as the primary ranking portfolio source.

In addition to standard keyword work, this subagent should also think through:
- **SERP pattern analysis** — are the winning pages service pages, city pages, comparison pages, listicles, galleries, cost pages, or hybrids?
- **AEO / GEO opportunity analysis** — do the SERPs reward question-style pages, direct-answer blocks, comparison pages, or best-of pages that could also improve AI-search visibility?
- **Entity and mention analysis** — when relevant, look for evidence that rankings are being helped by stronger brand entities, manufacturer relationships, directories, Reddit, YouTube, or listicle presence
- **Gap classification** — separate missing core pages from more advanced strategic opportunities

**WEB_SEARCH RATE LIMITING (add to every Subagent 2 prompt):**
Include this instruction: "When running multiple web_search calls, batch them in
groups of 3, then pause 3 seconds between batches. If a web_search call fails,
fall back to web_extract on the target URL or a known competitor URL. Do NOT fire
more than 5 web_search calls without a pause. If rate-limited, switch to terminal
curl for remaining searches."

**NEW - Firecrawl v2 Agent (autonomous competitor discovery):**
Load scripts/firecrawl_agent.py and run:
```python
from firecrawl_agent import competitor_intel, review_intel

# Find and profile competitors (no URLs needed - agent searches autonomously)
competitors = competitor_intel("Prospect Name", "Phoenix", "HVAC", num_competitors=3)
# Returns: competitors[{name, website, phone, services[], service_areas[],
#          review_count, avg_rating, years_in_business, USPs[]}]

# Gather review/reputation data across platforms
reviews = review_intel("Prospect Name", "Phoenix", "HVAC")
# Returns: total_reviews, avg_rating, platforms[{platform, count, rating, url}],
#          common_complaints[], common_praise[]
```
Or CLI:
```
python3 firecrawl_agent.py competitor-intel --business "Parker & Sons" --city "Phoenix" --trade "HVAC"
python3 firecrawl_agent.py review-intel --business "Parker & Sons" --city "Phoenix" --trade "HVAC"
```

**Cost awareness:** /v2/agent uses dynamic credits (not flat per-page). Set maxCredits cap.
Competitor intel ~500 credits. Review intel ~300 credits. Budget accordingly.
Still use DataForSEO for keyword rankings (agent can't do keyword position data).

### Subagent 3: Visual + UX + Social Media (browser + web)
Homepage 5-second test, header/footer, service pages, location pages, navigation, reviews, broken elements, About, blog layout.

This subagent should also act as the **visual proof and image-quality reviewer**:
- check whether project/gallery imagery is strong enough to support ranking and conversion on service and location pages
- note missing before-and-after assets, thin galleries, weak trust imagery, or absent team/process proof
- note obvious image-SEO misses on key pages such as empty alt text patterns, oversized hero imagery, or galleries that add visual value but almost no search value

**BROWSER_VISION RESILIENCE (add to every Subagent 3 prompt):**
Include this instruction in the subagent prompt: "If browser_vision fails or returns
an error, fall back immediately to browser_snapshot(full=True) for text-based analysis.
Do NOT retry browser_vision more than twice per page. Do NOT stop the audit because
screenshots fail. The text snapshot captures all elements, links, and content needed
for analysis. Move on to the next page after 2 vision failures."

**Social media audit (when requested or when social links are found on site):**
Include Instagram/Facebook/YouTube review in this subagent since it needs browser access. Check:
- Follower count, post count, posting frequency
- Content quality (real project photos? Video reels? Before/after?)
- Engagement levels (likes, comments per post)
- Bio optimization (keywords, CTA, booking link)
- Highlights/stories organization
- Hashtag strategy (location-specific tags?)
- Cross-posting to website (is good social content trapped on social only?)

This becomes Section 09: Social Media Presence in the document (add after Technical Deep Dive).

### Scoring
4 categories (1-10): Traffic, Trust, Conversion, SEO/Content. Overall = average.

## Document Structure — Sales Audit v2 (PREFERRED, learned Apr 9 2026, AP Pest Control)

This is the structure Matthew approved after the AP Pest audit. It leads with
**ranking reality** (what they rank for, what's indexed, who's beating them)
BEFORE getting into red flags. Schema is a SUBSECTION inside Red Flags, not
its own section. The Growth Playbook sells the dream at the end.

Rule of thumb: a business owner needs to feel the pain of invisibility BEFORE
you explain the technical reasons. Show them they rank for 0/10 keywords first,
then show them the schema disaster that's causing it.

1. **Cover Page** — Clean white, eyebrow + title + info table + small stats bar at bottom.
   Stats bar should be the killer one-liner (e.g. "RANKING FOR 0 OF 10 CORE KEYWORDS | 5 OF 32 PAGES INDEXED").

2. **Section 01: Where You Stand Today** — Narrative opener + scorecard (4 categories, 1-10) + "The Verdict" callout.
   Opener acknowledges real strengths (reviews, team, design) before pivoting to "the brand is good, the website is holding it hostage."

3. **Section 02: The Ranking Reality** — THIS IS THE NEW LEAD. Two tables:
   A) Ranking table: 10 core keywords with monthly volume, their current rank, and who is #1.
      Pull the live rank from web_search (not DataForSEO SERP tasks — too slow and expensive).
      Pull exact monthly volume and CPC with the direct DataForSEO endpoint `keywords_data/google_ads/keywords_for_keywords/live` by sending the full list of exact phrases in one request. This works well for local query variants like `hvac casa grande az`, `ac repair casa grande az`, etc. Keep the exact phrase if it returns volume; if DataForSEO returns null for a phrase, label that volume as unavailable instead of inventing it.
   B) Indexing table: "In Sitemap" vs "Indexed By Google" per page type.
      Pull from `site:domain.com` Google search vs their actual sitemap count.
   Follow with narrative: "Your sitemap lists 32 pages. Google has indexed 5. The other 27 might as well not exist."
   This section alone makes the sale if they actually rank for nothing.

4. **Section 03: Who Is Outranking You** — Competitor landscape table (5-7 competitors)
   with Services, Content Footprint, Why They Rank columns. **Then the crown jewel of this
   section: "What They Are Actually Ranking For"** — a subsection with one 3-column table
   per competitor (Position | Keyword | Monthly Searches) showing exactly which keywords
   each competitor owns in the top 10 and how many searches that represents. Then two lists:
   "What every ranked competitor has that you do not" (X bullets in red)
   and "What you have that they do not" (check bullets in green).
   Close with the red mini-heading "[Prospect] Ranking for 0 of our N core keywords"
   and a punchline paragraph: "Every single keyword above is traffic that is flowing
   somewhere else. [Query A] goes to [Competitor A]. [Query B] goes to [Competitor B].
   These are the keywords you should be ranking for. Not eventually. Immediately."
   This is where we acknowledge genuine strengths while making the ranking pain visceral.

5. **Section 04: Where You Should Be Ranking** — Three phases of keyword opportunity:
   A) Phase 1: Core Money Keywords (high-CPC commercial terms with volume, CPC, intent)
   B) Phase 2: Long-Tail City Combinations (service+city patterns with combined volume)
   C) Phase 3: Informational Content (blog keyword opportunities — reference a competitor
      who ranks for these as proof of catchability, e.g. "Blue Sky ranks for 'camel spiders arizona'")
   Close with a stats bar: "TOTAL CAPTURABLE MARKET: X SEARCHES/MO | $Y MONTHLY AD VALUE"

6. **Section 05: Services You Should Be Selling** — Use critical thinking based on the
   technician's background and local market. The framing is: "You might already offer these.
   You just do not have pages selling them." Then a table of missing services with monthly
   searches and "Why You Should Have This Page" reasoning that ties back to the technician's
   actual experience. Example for AP Pest: "Matt has specific bed bug heat treatment experience
   from his Technical Innovations days. This is literally his specialty and you have no page for it."
   Follow with "Missing Location Depth" — neighborhood-level pages beyond city pages
   (Troon North, Grayhawk, Power Ranch, etc. for AZ). This shows we understand their
   market at a deeper level than any template.

7. **Section 06: Red Flags On The Site** — NOW we get to the technical issues.
   **Schema is the FIRST subsection here, not its own section.** Explain in plain English:
   "Your web developer copy-pasted a schema template from a [previous client] and never
   updated it. Every service page tells Google you are that company serving [wrong city]."
   Then the field-by-field table (What It Should Say vs What It Actually Says).
   Other subsections: Location page duplication, NAP drift / gmail, Dead social icons,
   Empty blog, Form dropdown limitations. Each subsection is an Electric Blue sub-heading
   with 1-3 short paragraphs, NOT a full section.

7. **Section 07: Revenue Impact** — Lead Economics table, Cost of Waiting narrative,
   and a three-case SEO upside model.
   Show what strong organic visibility could mean in plain business terms across:
   - conservative
   - realistic
   - aggressive

   For each case, show:
   - estimated organic traffic potential from the right keywords
   - estimated leads from that traffic
   - estimated booked jobs or customers if close-rate assumptions are available
   - estimated revenue based on average ticket assumptions
   - estimated total ROI

   Include lifetime value when the business has recurring or repeat revenue.
   Use ranges, not fake precision, and label assumptions clearly.

9. **Section 08: 30-Day Quick Wins** — Week 1/2/3/4 breakdown with check bullets.
   Same as standard audit.

10. **Section 09: The ProofPilot Growth Playbook** — SELL THE DREAM.
    Six pillars as sub-headings with arrow bullets for each:
    1. A Website That Was Actually Built To Rank
    2. Territory Domination SEO (4 service pages/mo, 4 location pages/mo, 4 blog posts/mo,
       8-12 backlinks/mo, technical SEO, GBP ops, 25+ citations)
    3. AI Search Optimization (AEO) — ChatGPT, Gemini, Perplexity, AI Overviews, entity authority
    4. Reddit, Nextdoor, and Community Groups — "Reddit currently outranks most pest sites in Phoenix"
    5. Paid Media That Works With Your Organic (Google Search, LSA, Meta, Retargeting)
    6. Know What Is Working (lead tracking, heat maps, monthly ROI reports, strategy calls)
    Reference the **ProofPilot Pricing Guide** (GDoc ID `110HqAtMFxcUcNLPirNVm9q-54yFa9ALP1QEmFjXuaHw`)
    for exact service language. Load it via Drive API export to text before writing this section.

11. **Section 10: Where We Take You In 12 Months** — Side-by-side "From Where You Are Now" (red X bullets)
    and "To Where You Are Going" (green check bullets). Close with "The Bottom Line" callout box.

12. **Closing CTA** — Centered narrative + Dark Blue CTA box with Neon Green headline.

13. **Methodology Note** — Small eyebrow + body text at bottom. No tool names.

**CRITICAL: No "CEO Talking Point" boxes in client-facing sales audits.**
Those belong to the Gap Analysis variant (internal cherry-pick doc). For sales audits,
the whole document is written TO the CEO, so calling something out as "CEO Talking Point"
breaks the fourth wall. Save callout boxes for "The Verdict" and "The Bottom Line" only.

## Sales Opportunity Proposal Mode (NEW, HTML-first variant)

Use this mode when AuditPilot is supporting a live sales opportunity and the goal is
speed, persuasion, and a clean shareable artifact rather than a long-form .docx audit.
This is especially strong for first-touch prospecting, pre-call prep, follow-up after a
sales call, or when Matthew wants a fast revenue story the prospect can skim on screen.

**Default output for this mode:** a self-contained HTML proposal artifact under 50 KB.
Use ProofPilot branding unless Matthew explicitly asks for white-label or partner branding.
The structure borrows the strongest parts of premium proposal generators but keeps the
AuditPilot evidence standard and ProofPilot positioning.

### Narrative Framework (required)

Write the proposal in this order:
1. **Current State (Pain)** - what visibility, indexing, content, or trust problems are suppressing revenue now
2. **Competitive Threat (Urgency)** - which competitors are capturing the searches, maps visibility, and traffic value instead
3. **Revenue Opportunity (Greed)** - what page-one, local-pack, and content gains are worth in traffic, leads, and revenue
4. **Strategic Solution (Trust)** - why ProofPilot's roadmap is the credible way to close the gap

This is the core sales story. Every section should map back to one of those four ideas.
Do not let the proposal become a random pile of metrics.

### Phase 1: Target Identification

- Detect the prospect website from thread context, project notes, or the shared URL
- **Confirm the root domain before proceeding**
- If multiple domains exist, pick the money domain and note any supporting microsites separately
- Capture business name, primary city, and service category early because every later table depends on them

### Phase 2: SEO Intelligence Gathering for Proposal Mode

Collect the same core AuditPilot evidence, but package it into proposal-ready summaries.
If a SearchAtlas or OTTO-style source exists in the workflow, use it. If not, map the
request to AuditPilot equivalents using Firecrawl, DataForSEO, Local Falcon, browser
review, and live SERP checks.

#### 2a. Site Health / Revenue Leak Inputs
- Gather current strength across **Technical, Content, Authority, UX**
- If platform scores exist, show **current and potential** values
- If exact scores do not exist, create evidence-backed current/potential bands from the audit findings
- Pull top issue counts by category and translate them into revenue friction, not engineering jargon

#### 2b. Organic Performance Inputs
- Top organic keywords with CPC and traffic value context
- Top competitors with traffic value or paid-equivalent benchmarks
- 6-month direction of visibility if trend data exists
- Position distribution with special focus on **positions 11-20** as striking-distance opportunities
- Top-value pages and which services or cities they map to

#### 2c. Backlink / Authority Inputs
- Referring domains and quality of authority sources
- Anchor text distribution and any over-optimized or weak patterns
- Brand authority / entity / brand-signal proxies when available
- Compare trust signals directly against the top competitor, not in isolation

#### 2d. Local Business Detection
Treat local intent as present when ANY of these are true:
- GBP / business listings are found
- Primary keyword set includes city names, neighborhoods, or "near me"
- The business serves a defined metro or multiple nearby cities

If local, run geo-grid visibility analysis for the top 1-3 commercial terms and fold it into
Competitive Threat + Revenue Opportunity sections. Use the existing Local Falcon workflow in
this skill. For proposal mode, one strong grid and one tight summary is better than dumping
raw exports.

### Phase 3: Revenue and Competitive Analysis (required math)

Turn the raw SEO data into commercial language. These proposal calculations are now part of
AuditPilot's default sales-opportunity workflow:

1. **Unrealized Revenue Proxy**
   - Start with striking-distance keywords (positions 11-20)
   - Formula: `search_volume × CTR_at_target_position × CPC` summed across keywords
   - Preferred CTR curve for proposal mode:
     - position 1 = 28.5%
     - position 2 = 15.7%
     - position 3 = 11.0%
   - If using a blended page-one estimate instead of position 1, label the assumption clearly

2. **Ad Spend Equivalent**
   - Use traffic-cost / paid-equivalent data when available
   - If exact traffic cost is unavailable, estimate with keyword CPC totals and label as proxy

3. **Competitive Gap**
   - `competitor traffic value - prospect traffic value`
   - Also express as keyword-count gap and referring-domain gap when useful

4. **Quick Wins**
   - Prioritize keywords in positions 11-20 with volume above 500/month
   - These become the "one optimization away from page one" section

5. **Critical Friction Points**
   - Surface the top 5 site-health issues by business impact
   - Phrase them as lost trust, weak crawlability, missing service coverage, or low conversion confidence

6. **Revenue Opportunity Projection**
   - Formula: `projected traffic increase × conversion rate × average order value`
   - Show conservative, realistic, and aggressive cases when enough assumptions exist
   - Every assumption must be labeled. No fake precision.

### HTML Proposal Structure (default section order)

Build the HTML proposal in this order unless Matthew asks for a custom cut:

1. **Hero Cover**
   - Use a thum.io website screenshot as the visual anchor
   - Headline: `Growth Strategy for {Business Name}`
   - Show the biggest commercial number prominently, usually unrealized monthly revenue or annualized traffic value
   - Include date and ProofPilot branding

2. **Executive Summary / The Bottom Line**
   - Plain English only
   - Lead with market capture, dollars left on the table, and which competitors are winning now
   - 3-5 tight bullets max

3. **Site Health as Revenue Leaks**
   - Four cards: Technical, Content, Authority, UX
   - Show current and potential score/state where available
   - Use color meaningfully, but explain why the score matters commercially

4. **The Competitive Reality Check**
   - Prospect vs top competitor side by side
   - Compare traffic, keyword count, traffic value, referring domains, reviews or map visibility when relevant
   - Include a top-competitors table, but keep it readable

5. **Striking Distance Opportunities**
   - Page-two keywords sorted by search volume
   - Show how many keywords are close, the upside if moved to page one, and what that means per month
   - Include a simple inline SVG position-distribution visual

6. **Revenue Opportunity Projection**
   - Show projected traffic lift, lead lift, and revenue lift
   - Include cost of inaction and paid-media equivalent framing
   - A simple 12-month cumulative value chart is strong here

7. **Backlink and Authority Profile**
   - Position as digital trust, not just SEO plumbing
   - Compare referring domains and authority profile against the leader
   - Include an inline SVG donut or bar visualization if it adds clarity

8. **Local SEO Snapshot**
   - Only include when local intent is real
   - Show geo-grid findings, visibility distribution, and one clear sentence about what happens at their front door versus across the city

9. **Strategic Roadmap (30/60/90 Days)**
   - Month 1: Fix Revenue Leaks
   - Month 2: Content Velocity
   - Month 3: Authority Building
   - Each phase needs deliverables, expected KPI movement, and milestone metrics

10. **CTA / Next Steps**
   - Clear ask
   - Simple close, no bloated paragraph
   - Position ProofPilot as the operator who can execute the roadmap

### HTML Design Spec for Proposal Mode

- Dark premium theme is allowed and preferred for this HTML variant
- Use inline CSS in a single `<style>` block
- Google Fonts CDN is acceptable
- Use responsive layout with CSS Grid / Flexbox
- All charts should be inline SVG with `viewBox`
- Keep it print-friendly with `@media print`
- Keep total HTML under 50 KB when possible for email compatibility
- Use real data only. If a metric is unavailable, omit the block instead of inventing it
- Every number needs business context: `X, which means Y for the business`

**Preferred palette for this proposal mode:**
- background `#0D0D0D`
- purple accent `#936BDA`
- blue `#5B8DEF`
- green `#4ECDC4`
- red `#FF6B6B`
- yellow `#FFE66D`

### Proposal Mode Guardrails

- This mode improves AuditPilot's sales storytelling. It does NOT replace the full Sales Audit v2 .docx when Matthew wants a heavier strategic document.
- If the data stack does not support a named metric from another platform, substitute AuditPilot's closest equivalent and label it honestly.
- Do not mention tool names in the client-facing artifact.
- The proposal should feel premium, short, and decisive. Ruthless prioritization beats completeness.
- The story should always resolve to: `here is the gap, here is the money, here is the roadmap, here is why ProofPilot should own it.`

## Legacy Standard Audit Structure (DEPRECATED for sales, use for Gap Analysis)

The old structure put Technical Issues at Section 02 and Competitor Rankings at Section 04.
This was backwards for sales — CEOs need to feel the ranking pain FIRST, then understand
the technical cause. Keep the old structure only for internal Gap Analysis docs that
Matthew will cherry-pick from.

### Optional Bonus Sections (add when requested or appropriate)

**Section 09: Technical Deep Dive** - Add when client asks for "detailed" or "technical" audit, or when pitching to a client who has a dev team. Tables covering:
- Platform & Stack (CMS, SEO plugin, theme, analytics, booking, forms, jQuery version)
- Schema Markup Audit (table: schema type, status ✅/❌/⚠️, notes)
- Performance Analysis (render-blocking JS, image optimization, CSS loading, external deps)
- Sitemap & Crawl Analysis (sitemap status, robots.txt, canonical tags, OG/Twitter, meta robots)

**Section 09: Social Media Presence** - Add when social media accounts exist or were requested. Instagram/Facebook/YouTube audit with metrics table (followers, posts, frequency, content type, engagement, bio, hashtags). Strategic recommendations for cross-posting to website. Highlight the "content trapped on social" angle: great project photos/videos on Instagram that Google cannot index.

**Section 10: Old Site vs New Site** - Add when auditing a recently redesigned website. Two lists:
- "What the New Site Does Better" (green bullets)
- "What the New Site Lost or Still Lacks" (red bullets)
- Close with a verdict like: "The redesign made the site look better but didn't address the SEO infrastructure that drives leads."
This section is powerful for showing a prospect what their web designer missed and why they need SEO specialists.

## Branding

Headings: Bebas Neue. Body: Calibri. Dark Blue #00184D, Electric Blue #0051FF, Neon Green #C8FF00. Header: PROOFPILOT | Strategic Audit. Score box: 28pt max.

**CRITICAL heading pattern**: Every section uses the eyebrow+title pattern:
1. Small Electric Blue eyebrow text (10-12pt, bold, all-caps): e.g. "SERVICE PAGE REALITY CHECK"
2. Larger Dark Blue/Black title below (20-26pt, bold): e.g. "Your main Services page does not display any services."
3. Optional italic gray tagline with light bottom border
All on WHITE background. Do NOT wrap headings in dark blue background boxes.

**Cover page**: Clean white background with:
- Electric Blue eyebrow (e.g. "WEBSITE AUDIT") + Dark Blue main title (e.g. "WEBSITE STRATEGY") centered
- Info table (Prepared For, Website, Location, Date, Competitor Benchmark)
- Small dark blue highlight bar at bottom only for strategic focus
Do NOT create a full-page dark blue box for the cover.

## Local Falcon (Geo-Grid Rankings + Heat Maps)

AuditPilot can now pull real Google Maps geo-grid rankings and embed heat maps in the audit doc. This replaces the old "we would need to buy ads" guess with actual visibility data across a 49-point (or 121-point) grid around the prospect's location.

**API key:** stored at `~/.proofpilot/secrets/local_falcon.env` as `LOCAL_FALCON_API_KEY`.
Account: ProofPilot Agency, Starter plan (7,500 credits/cycle). Helper script:
`scripts/local_falcon.py`.

**Cost model (grid_size^2 credits per scan):**
- 5x5 grid = 25 credits, ~3mi radius, good for neighborhood audits
- 7x7 grid = 49 credits, ~5-10mi radius, default for city audits
- 9x9 grid = 81 credits, ~10-15mi radius, metro audits
- 11x11 grid = 121 credits, deep metro coverage

Starter plan has ~7500 credits per cycle so budget ~50-100 credits per audit.

**Flow for AuditPilot:**
1. Check if the prospect already has saved reports:
   `python3 scripts/local_falcon.py reports --place_id <google_place_id>`
   If found, skip scanning and reuse the existing report_key + owner_key. Zero credits.

2. If not saved, find the place:
   `python3 scripts/local_falcon.py find "Business Name" --near "City, ST"`
   Grab the `place_id` and `lat`/`lng` from the top match.

3. Save it to the account (required before scanning):
   `python3 scripts/local_falcon.py add <place_id>`

4. Run the scan with the business's top commercial keyword:
   `python3 scripts/local_falcon.py scan --place_id <id> --keyword "electrician near me" \
       --lat 33.39 --lng -111.84 --grid 7 --radius 5 --measurement mi --platform google --ai --eager`
   Returns report_key, owner_key, and all metrics immediately when --eager is set.

5. Download the heatmap + grid PNGs for embedding:
   `python3 scripts/local_falcon.py images <report_key> <owner_key> --out /tmp/audit-lf/`

6. Summarize for the doc:
   `python3 scripts/local_falcon.py report <report_key> --summary`

**Always run with `--ai`.** Local Falcon's AI analysis returns a full
strategic consultation in structured format: summary narrative, major problems,
minor problems, what is working, vulnerable competitors (overtake targets), and
citation opportunities. This is sales-ready content you drop straight into the
audit doc. The cost is minor and the value is enormous.

If `rich_report(...)["ai_analysis"]` comes back null after an `--ai` scan, run
`python3 scripts/local_falcon.py report <report_key> --markdown --ai`. If it is
still unavailable, continue with the scan summary and markdown output. Do not
block the audit on missing AI text.

**Every scan returns a pre-computed rich dataset:**
- `places` dict with full profile per competitor (name, reviews, rating, phone,
  url, claimed status, categories, per-competitor ARP/ATRP/SoLV)
- `rankings.by_solv` / `by_arp` / `by_atrp` - already sorted leaderboards
- `data_points` - per-grid-point top 20 with distance from the target
- `unique_competitors` - total distinct businesses found in the scan
- `ai_analysis` when enabled (see above)

**One command extracts everything:**
```bash
python3 scripts/local_falcon.py report <report_key> --markdown --ai
```
Returns a doc-ready markdown block with: Target metrics, Top 10 competitors by
SoLV table, #1 position holders, Top 5 at Your Front Door, Strategic Summary,
Major Problems, Minor Problems, What Is Working, Vulnerable Competitors, and
Citation Opportunities. Drop this into the audit doc Section 04 (Who Is
Outranking You) + Section 05 (What Is Working) + Section 06 (Quick Wins).

**Programmatic access:**
```python
from local_falcon import fetch_report, rich_report, render_rich_markdown, download_images

data = fetch_report(report_key)
rich = rich_report(data, top_n=10)
# rich is a structured dict: target, scan, metrics, top_competitors,
# first_place_holders, top3_holders, grid_presence_leaders, center_point_top5,
# ai_analysis, images, report_key

# For the doc:
markdown = render_rich_markdown(rich)
images = download_images(report_key, owner_key, "/tmp/audit-lf/")
# images = {"grid_png": "...", "heatmap_png": "..."}
```

**Metrics to highlight in the audit doc:**
- **SoLV (Share of Local Voice)** - primary metric, % of grid where target ranks in top 20
- **ARP (Average Rank Position)** - average rank across points where they appear
- **ATRP (Average Top Rank Position)** - average including out-of-top-20 = 21
- **Found in X/Y points** - absolute coverage
- **Vulnerable competitors** - sales gold, overtakable rivals from AI analysis
- **#1 position holders** - who owns the #1 spot across the grid
- **Center-point top 5** - "who is beating you at your own front door"

**Where it goes in the doc (new structure):**
- Section 04: Who Is Outranking You -> embed the rich grid image + Top 10 by SoLV
  table + #1 position holders list
- Section 04b: At Your Front Door -> Top 5 at the center grid point
- Section 05: What Is Working -> pull from AI analysis `success` field
- Section 06: Quick Wins -> pull from AI analysis `problem.minor` field
- Section 07: Overtake Targets -> pull from AI analysis `vulnerable` field (NEW)
- Section 08: Citation Gaps -> pull from AI analysis `citations` field

The heat map on a real Google Map with ranking numbers in each circle is more
visceral than any keyword table. CEOs see red-everywhere and instantly get it.
Pair it with the AI "vulnerable competitors" list and you have a closing deck.

**When to use which platform:**
- `google` - default, local pack rankings (use for every audit)
- `gaio` - Google AI Overviews visibility (use for AI-era audits)
- `chatgpt`, `gemini` - AI search visibility (premium add-on for tech-forward clients)
- `apple` - Apple Maps (include for hospitality/restaurant audits)

**Pitfalls (learned from AP Pest test run):**

- Business MUST be saved to account before `run-scan` works. Use `add_location` first. The `add_location` response returns `[]` on success (empty array, not an object).
- `run-scan` ALWAYS returns a `{report_key, status: "pending"}` response immediately. The `eager=true` flag does not give you full data synchronously in practice. You MUST poll `/v1/reports/<report_key>/` until `code == 200`. While processing, the API returns `code: 202, data: {report_key, status: "processing"}`.
- Poll every 20-30 seconds. A 7x7 grid (49 points) takes 60-120 seconds to complete. 11x11 (121 points) can take 3-5 minutes.
- **Data structure gotcha:** In the detail report response, the field names are inverted from what you'd expect:
  - `report.points` is a STRING count like `"49"`
  - `report.data_points` is the ARRAY of actual point-level results
  The helper script's `summarize()` handles this but raw curl users will be confused.
- Each point in `data_points` has `{lat, lng, found (bool), rank, count, results: [top 20 at that point]}`. To identify dominant competitors, aggregate `results[0:3]` across all 49 points with a Counter.
- Location search (`/v2/locations/search`) uses `name` and `proximity` parameters, NOT `query`/`near`. Wrong params return HTTP 400.
- Images at `lf-static-v2.localfalcon.com/heatmap-img/<report_key>/<owner_key>`. The `owner_key` is the API account key from `account()` response field `data.key` (e.g. `ee1508534e9444f` for ProofPilot). It is NOT the same as the API key used for auth.
- Grid `radius` is HALF the total span. 5mi radius = 10mi diameter grid.
- SABs (Service Area Businesses) return `sab: true` in location search. Still scannable, use the centerpoint lat/lng from the location search response.
- When `found_in = 0` and `arp = atrp = 21.00`, the business ranks nowhere in top 20 across the entire grid. Not a bug. This is the gold finding for the audit sales angle.
- Reports older than 30 days may need re-scanning for stale competitor data. Reuse existing reports via `/v1/reports/?place_id=<id>` when available to save credits.
- Credit balance check: `python3 scripts/local_falcon.py account` then parse `data.credits.credit_package_remaining`.
- Location search costs 2 credits per call. Scan costs `grid_size^2` credits. Budget ~51 credits for a cold prospect (search + 7x7 scan), ~49 if the place_id is known.

**Poll pattern (use the built-in helper):**
```python
from local_falcon import run_scan, wait_for_report, summarize, download_images

# Kick off the scan
job = run_scan(place_id=pid, keyword=kw, lat=lat, lng=lng,
               grid_size=7, radius=5, measurement="mi", platform="google")

# Block until done (polls every 20s, 5 min max)
report = wait_for_report(job["report_key"], timeout=300, interval=20)

# Get the metrics you want for the doc
metrics = summarize(report)
# {business, keyword, grid_size, data_points, found_in, arp, atrp, solv_pct,
#  heatmap_url, grid_image_url, public_url, pdf_url, report_key}

# Download PNGs for embedding
paths = download_images(report["report_key"], owner_key="ee1508534e9444f",
                        out_dir="/tmp/audit-lf/")
# paths = {"grid_png": "...", "heatmap_png": "..."}
```

**Competitor aggregation (who is dominating the grid):**
```python
from collections import Counter
top3 = Counter()
first_place = Counter()
for pt in report["data_points"]:
    results = pt.get("results") or []
    for r in results[:3]:
        top3[r["name"]] += 1
    if results:
        first_place[results[0]["name"]] += 1

# top3.most_common(5) = top 5 competitors dominating the top 3 positions
# first_place.most_common(5) = top 5 competitors holding #1 spots
```

## Firecrawl API Reference

Three API tiers available (use the cheapest that fits):

| Endpoint | When to Use | Cost | Async |
|----------|-------------|------|-------|
| /v1/scrape | Single known page (raw HTML/markdown) | 1 credit/page | No |
| /v1/map | Get all URLs on a site | 1 credit | No |
| /v2/extract | Structured data from known URLs | ~144 credits/site | Yes |
| /v2/agent | Autonomous discovery (no URLs needed) | ~300-500 credits | Yes |

**Decision guide:**
- Know the URL, need raw content? Use /v1/scrape (cheapest)
- Need URL inventory? Use /v1/map
- Know the URL, want structured business data? Use /v2/extract
- Don't know URLs, need competitor/review research? Use /v2/agent

**API Key:** use `FIRECRAWL_API_KEY` in the local environment.
**CLI:** `firecrawl` when installed locally.
**Helper script:** scripts/firecrawl_agent.py (handles polling, schemas, credit caps)
**Python SDK:** `from firecrawl import Firecrawl` (v4.22+, NOT FirecrawlApp)

**Pitfalls:**
- /v2/agent can take 2-5 minutes. Always poll with timeout.
- Set maxCredits to avoid runaway costs (default 500 in helper script).
- /v2 jobs expire after 24 hours. Grab data promptly.
- spark-1-mini is 60% cheaper than spark-1-pro. Use mini for standard tasks.
- For KNOWN site audits, /v1/scrape is still cheaper and faster. Don't over-use /v2.
- API key env bug: verify key length ~37 chars, not duplicated in .env.
- review-intel via /v2/agent frequently hits "Agent reached max credits" (300 cap). If it fails, skip it gracefully and rely on manual Google/Yelp checks from the browser subagent instead.
- DataForSEO keyword_suggestions API requires `keyword` (singular string), NOT `seed_keywords`. Run separate requests for each seed keyword.

## Build and Upload

Terminal only (NOT execute_code). pip3 install python-docx requests composio-core. Upload via gdrive-binary-upload skill.

### Screenshot Embedding (Post-Subagent, Before Doc Build)

After subagents return, capture screenshots from the main session browser for
embedding in the .docx. This is optional but significantly improves doc quality.

```python
# In main session, before building the doc:
# 1. Navigate to key pages and save screenshots
browser_navigate("https://target-site.com")
result = browser_vision("Take a screenshot of the homepage above the fold")
# result contains screenshot_path

# 2. Embed in python-docx:
from docx.shared import Inches
doc.add_picture('/path/to/screenshot.png', width=Inches(6.0))
```

**Key pages to screenshot:**
- Homepage above-the-fold (hero, nav, first CTA)
- Pricing page (if public)
- A service page (for content quality evidence)
- Blog page (for content strategy evidence)
- Any page with a glaring issue (for "credibility killer" evidence)

**Pitfall:** browser_vision can fail. If it does, skip screenshots and build the
doc without them. A complete doc without screenshots is better than a stalled pipeline.

## Known Web Design Firm Patterns

**Nolen Walker / Plumbing Webmasters (nw-* themes):** Clean design, good DataPins integration, decent URL structure. BUT: typically ships with no city pages, empty blog, unconfigured Yoast (empty WebSite schema), no LocalBusiness schema, templated meta descriptions, thin service page content (300-500 words), outdated jQuery (1.11.x). Breadcrumb typos are common. Good design firm, weak SEO setup. Their DataPins are a genuine strength to highlight.

When you see an nw-* theme, you already know the likely findings. Focus the audit on what they built well (design, DataPins, service hierarchy) and what they left unbuilt (SEO infrastructure, content depth, schema).

**Webflow sites:** Clean modern design, good lazy loading, responsive layouts. BUT: typically ships with zero schema markup (no LocalBusiness, Service, FAQ, Organization), no canonical tags, no robots.txt, blog template artifacts in titles (e.g., "Building 128"), all images in PNG (0% WebP), render-blocking WebFont loader + jQuery in head, 10+ Google Fonts loaded, batch-published blog posts (all same date), and thin service page content. OG tags may be present on main pages but missing on blog posts. No Twitter Card tags. Webflow's "last published" date in source reveals how stale the site is. Good visual platform, weak SEO defaults.

**36pixels (web developer, multi-vertical):** Webflow sites with the most catastrophic schema copy-paste we have ever found. Every service page ships with `@id` pointing to `https://www.36pixels.com/[service-slug]`, `provider.@id` pointing to `https://www.36pixels.com/#localbusiness`, and the entire WebSite/breadcrumb/image/offer graph copy-pasted from a previous client (e.g., Kingsman Pest Exterminators in The Woodlands, TX). The `areaServed` field is hardcoded to "Las Vegas" regardless of actual client location. The offer URL literally sends Google users to the previous client's website. Homepage typically has ZERO schema (no LocalBusiness, no Organization). When you see a 36pixels-built Webflow site, run `curl -s URL/[service-page] | grep -A 100 'application/ld+json'` on 2-3 service pages FIRST. The schema findings will be the entire centerpiece of the audit. Frame it as: "Your site is telling Google it is [Previous Client Name] in [Wrong City]." This is a career-making CEO finding. Also check footer of 404 page — 36pixels often ships with placeholder strings like `https://insert google map link here/` left in production. Every location page typically uses placeholder.svg instead of real city photos for cities beyond the primary, and copies "your [Primary City] home or business" boilerplate across all secondary city pages. Alt text on location page icons often says "Fort Lauderdale, FL" (or wherever the original template was for) on every page across every state. Gold standard example: AP Pest Control audit (Apr 2026).

**405 Media Group (Minneapolis, paving-industry specialist):** WordPress + Rank Math Pro + iThemes Builder (discontinued theme). Typical pattern: site built then abandoned. Schema misconfigured (agency name in email field, wrong phone in schema, homepage typed as "Article" instead of "WebPage", author = "Admin", primaryImageOfPage = play button icon). Zero Service or FAQ schema despite Rank Math Pro having these features. Template Facebook video posts ongoing but no other marketing activity. YouTube channel created with 6 videos then abandoned. Blog bulk-date-updated (fake freshness) without content changes. Location pages in two generations (old spun 2011 + new AI-template 2025) with duplicates for same cities and no canonical/redirect cleanup. 22+ orphan pages in sitemap not linked from nav. GoHighLevel call tracking installed but no GA4. Copy-paste artifacts from other client sites (competitor names in content, conflicting experience claims across pages). No link building, no reputation management, no BBB, no Instagram despite being a visual construction company. When you see 405 Media, check schema fields FIRST (phone, email, type, image) — they're always misconfigured and make devastating CEO-facing findings.

## Variant: Gap Analysis / Deep Findings Review

When Matthew shares an EXISTING audit doc and asks to "find what I missed" or "anything worth calling out":

**This is NOT a standard audit. It's a gap analysis.** Different workflow, different output.

1. Extract the existing doc (web_extract on /export?format=txt for GDocs)
2. Run the same 3 parallel subagents but instruct them to be EXHAUSTIVE (every URL, every phone number, every schema field, every typo)
3. Compare subagent findings against what's already in the existing doc
4. Build an INTERNAL findings doc (not client-facing) organized by CEO impact:
   - Section 01: Credibility Killers (things that make prospects close the tab)
   - Section 02: Conversion Leaks (things that prevent leads from converting)
   - Section 03: Content & SEO Infrastructure (structural foundation issues)
   - Section 04: Competitive Position (rankings, reviews, listicles, competitor profiles)
   - Section 05: What's Working (genuine strengths to leverage)
   - Section 06: Full Findings Index (every finding in a single table with severity + category)

**CEO Talking Point boxes:** For each critical finding, include a small callout with Neon Green "CEO TALKING POINT:" eyebrow label and dark body text with the exact sales angle. Use sparingly, not on every finding.

**Stats bar on page 2:** Small Dark Blue highlight bar with Neon Green stats (e.g., "18 New Findings | 3 Phone Numbers | 12+ Years Broken | 1.0★ Yelp"). One line, immediate visual impact. Not a full-page dark element.

This variant is faster than a full audit (~30 min) because you skip scoring, ROI math, and keyword tables. The output is a working doc for Matthew to cherry-pick findings for the final client-facing audit.

## Variant: SEO Provider Accountability Audit

When Matthew says "find where their SEO company isn't doing anything" or "prove their provider is asleep" or asks to "go deeper" after an initial audit/gap analysis:

**This is a SECOND PASS with different subagents.** The initial audit found surface issues. This pass hunts for systemic neglect evidence.

**3 New Parallel Subagents (terminal+web, terminal+web, terminal+web):**

1. **Deep Technical SEO subagent**: Curl raw HTML of homepage + 5 service pages + 3 location pages. Check every title tag, meta description, heading hierarchy, schema per page (Service? FAQ?), canonical tags, OG/Twitter tags, render-blocking JS count, image formats, lazy loading count, cache headers, HSTS, WP-JSON exposure, GA4/GTM/Facebook Pixel presence, Rank Math configuration quality, theme status (discontinued?), sitemap hygiene (junk pages, bulk-updated dates, orphans vs nav links).

2. **Agency Research + Off-Site SEO subagent**: web_search for the agency name, their website, their reviews, their client list. Then check prospect's backlink evidence, directory citations (Yelp, BBB, Angi, HomeAdvisor, Yellow Pages, Manta, MapQuest), social media (Instagram, Facebook, YouTube, LinkedIn) activity/abandonment, GBP posting activity, any press/PR/content marketing evidence. Build the "what has the provider actually DONE" vs "what SHOULD have been done" picture.

3. **Exhaustive Keyword Position Testing subagent**: web_search for 20-25 individual keywords one by one. Primary commercial keywords, service-specific keywords, surrounding city keywords, informational/PAA queries. For each, note: does the prospect appear in top 5? Who's #1-3? Also extract 2-3 competitor service pages to compare content depth, trust signals, and conversion elements vs prospect's equivalent pages.

**Output: One combined doc with these sections:**
- 01: Executive Summary (stats bar: grade, keyword invisibility %, city ranking failures, backlinks built)
- 02: Who Is [Agency Name] (what done vs. not done tables, green/red headers)
- 03: Credibility Killers (copy-paste artifacts, schema disasters, test pages, typos)
- 04: Technical SEO Failures (scorecard table + findings)
- 05: No Keyword Strategy Exists (primary keywords table, city keywords table, bright spot table)
- 06: Content Strategy Void (PAA gap, competitor content comparison, service page depth comparison, content status table)
- 07: Conversion Leaks (broken pages, missing forms, weak reviews, no tools)
- 08: Off-Site SEO Negligence (links, reviews, directories, social, GBP, BBB)
- 09: Site Infrastructure Decay (orphans, duplicates, junk sitemap, fake freshness, missing analytics)
- 10: What's Working (genuine strengths)
- 11: The Verdict (narrative + dark CTA banner: "[Company] is paying for X. They are not getting SEO.")

**Key difference from standard audit:** This doc frames EVERY finding as provider negligence, not just site problems. "This was misconfigured" becomes "This has been misconfigured since installation and never audited." CEO talking points compare what the provider charges vs. what they deliver.

## Variant: Competitive Intelligence / Playbook Audit

When Matthew says "learn what they do well and replicate it," "reverse-engineer their playbook,"
"competitive intelligence," or audits a company we are NOT selling to but studying:

**This is NOT a sales audit. It's a strategic playbook.** Different framing, different output.
**Gold standard:** ShopPositioner Intel (Apr 2026) — https://docs.google.com/document/d/1TuBwkzWhgZYl6swXFUpHWWBmmjtz0FWX/edit

### Subagent Prompts (Copy-Paste Ready)

**Subagent 1 (Site Crawl + Content) [terminal, web]:**
Include ALL of these in the prompt:
- Sitemap curl + Firecrawl /v1/map for URL inventory
- Scrape homepage + 5+ key pages (services, about, portfolio, blog, pricing)
- Blog analysis: post count, topics, dates, frequency, quality signals
- Schema markup: `curl -s URL | grep -A 30 'application/ld+json'`
- Tech stack: CMS, plugins, hosting, CDN, chat widgets, CRM, tracking pixels
- Lead magnets: free audits, calculators, tools, guides, downloads
- Service offerings: what they sell, to whom, at what price
- Messaging analysis: how they pitch, trust signals, branded frameworks
- Content quality: real photos vs stock, video, team visibility
- robots.txt, meta robots, URL structure, internal linking

**Subagent 2 (Competitive Landscape) [terminal, web]:**
Include ALL of these in the prompt:
- web_search for 5-8 niche keywords to check subject's rankings
- web_search for "[subject name]" brand queries + reviews
- Find ALL competitors in the niche (aim for 8-12)
- For each competitor: name, URL, services, pricing, differentiator, strengths, weaknesses
- Check social media: Instagram, Facebook, YouTube, LinkedIn, TikTok
- Search for podcasts, guest posts, PR, manufacturer partnerships
- Look for community plays: Facebook groups, Discord, forums
- Estimate TAM (total addressable market) for the vertical
- **RATE LIMITING:** Space web_search calls 2-3 seconds apart. If a web_search
  fails, fall back to web_extract on known URLs. Do NOT fire 10 web_searches
  back-to-back; batch them in groups of 3 with sleeps between batches.

**Subagent 3 (Visual + UX) [browser, web]:**
Include ALL of these in the prompt:
- Navigate to homepage, take screenshot, analyze first impression
- Check nav structure, services pages, portfolio, blog, about, pricing
- Analyze CTA placement, conversion funnel, form friction
- Social proof: testimonials, logos, case study metrics, review aggregation
- Design quality, brand consistency, color scheme, typography
- Lead magnets and conversion mechanisms
- Footer analysis, chat widgets, booking tools
- **BROWSER_VISION RESILIENCE:** If browser_vision fails (returns error or
  empty), fall back to browser_snapshot(full=True) for text-based analysis.
  Do NOT stop the audit because screenshots fail. browser_snapshot captures
  all interactive elements and text content. Try browser_vision at most 2
  times per page, then move on with snapshot data.

### Post-Subagent Steps (Main Session)

After subagents complete, run these in the MAIN session before building the doc:

**Step A: Screenshot Capture**
Navigate to 3-5 key pages in the main session browser. Use browser_vision to
capture screenshots. If vision works, save screenshot_paths for embedding in
the .docx via `doc.add_picture()`. Key pages: homepage above-fold, pricing
page, case studies, a blog post, about/team page.

**Step B: Re-Query Critical Data**
If subagent summaries lack exact numbers for tables (pricing tiers, blog post
counts, competitor lists), run targeted curl/web_extract calls in the main
terminal to fill gaps. The subagent summaries are 90% complete; this step
fills the remaining 10% for document tables.

### Document Structure (Different from Standard Audit)

- Cover Page (Competitive Intelligence Report, not Website Audit)
- Stats Bar (key metrics: page count, blog posts, claimed clients, pricing, competitors found)
- Section 01: Executive Summary (who they are, how they make money, market position)
- Section 02: Tech Stack (CMS, CRM, hosting, tracking, tools)
- Section 03: Pricing Intelligence (exact packages, prices, targets, bundling strategy)
- Section 04: Positioning and Messaging (trust signals, branded frameworks, copy patterns)
- Section 05: Lead Generation Playbook (CTAs, lead magnets, forms, retargeting, content)
- Section 06: Competitive Landscape (individual competitor profiles + capability matrix)
- Section 07: What They Do Well / Replicate This (numbered tactical list with explanations)
- Section 08: Where They Are Weak / Exploit This (gaps and opportunities)
- Section 09: Our Playbook (phased entry strategy based on findings)
- Section 10: Pricing Strategy Recommendations (how to price against them)
- Section 11: Market Opportunity (TAM, SAM, revenue projections, whitespace analysis)
- Closing: Bottom line highlight bar

### CRITICAL: Table Formatting for Google Docs (Learned Apr 2026)

**Never use tables wider than 3 columns for dense text.** Google Docs renders .docx
tables at page width. 4+ columns with paragraph-length cells become unreadable
(text wraps mid-word, columns squish to 1 inch each).

**Competitor profiles: Use card-style 2-column tables, NOT one wide comparison table.**
Each competitor gets its own heading + table:
```
"1. Detailing Growth | detailinggrowth.com" (bold, Dark Blue)
| Detail         | Info                                     |
| Differentiator | Founded by 7-figure shop owner, AI tools |
| Pricing        | Websites from $250/mo, SEO from $650/mo  |
| Strengths      | MTE exhibitor, Ceramic Pro partnerships   |
| Weaknesses     | Heavily Ceramic Pro focused               |
```
This format is scannable, readable, and does not squish in Google Docs.

**Capability comparison matrix: Use 3-column format, NOT N-column grid.**
Instead of Capability | Company A | Company B | Company C | Company D (squished),
use: Capability | Who Has It | Who Doesn't. This communicates the same competitive
intelligence in a format that renders cleanly at any page width.

**Rule of thumb:** If a table has 4+ columns AND any cell contains more than 5 words,
restructure it. Card-style profiles (2 cols) or summary format (3 cols) always work.

### Key Differences from Standard Audit

- No scorecard/grades (we're studying, not judging)
- No ROI math for THEM (instead, TAM/revenue math for US)
- No "quick wins" section (replaced by "our playbook")
- No DataForSEO keyword tables (unless we want to outrank them on specific terms)
- Pricing section is INTEL, not a sales pitch
- "What they do well" is the centerpiece, not an afterthought

### NEXT: Multi-Agent Redesign (Apr 6)
Matthew approved splitting AuditPilot into 4 sub-agents via delegate_task:
1. **Crawler** — Firecrawl + sitemap, produces clean structured JSON (source of truth, no other agent modifies)
2. **Market Researcher** — DataForSEO keywords + competitors, produces FACTS and HYPOTHESES separately
3. **Strategic Analyst** — 8-dimension strategic brain, produces structured verdict (not a document)
4. **Document Builder** — python-docx branded .docx + GDrive upload, only thinks about presentation
Orchestrator (AuditPilot Director) delegates, never crawls or writes. Client knowledge base per audit: site-data.json, market-data.json, competitor-profiles.md, industry-context.md, brand-specs.md. Two cycles: Cycle 1 = discovery audit, Cycle 2 = prescriptive proposal. Core insight: cognitive task separation prevents context-switching quality loss.

## Competitive Intelligence Variant
When Matthew says "we're trying to learn what they do well and replicate it" (not sell to them), run the audit as a Competitive Intelligence playbook extraction:
- Focus on strategy, positioning, pricing architecture, content approach, conversion tactics
- Include competitor landscape with profiles and capability matrix
- Identify vulnerabilities and market gaps
- End with a phased entry playbook and pricing strategy recommendations
- Tone: strategic analyst, NOT salesy

## Variant: Finishing Partial Audit Docs In Place

When a spreadsheet or tracker already contains Google Doc links for AuditPilot outputs and some audits are only partially finished, preserve the existing doc IDs instead of creating new docs. This keeps every spreadsheet link valid and avoids re-link cleanup.

Recommended workflow:
1. Read the lead sheet first and collect the existing `AuditPilot Doc` URLs.
2. Export each linked Google Doc as plain text with:
   `https://docs.google.com/document/d/DOC_ID/export?format=txt`
3. Detect completion state by checking which section markers exist.
   - Partial audits often stop around `SECTION 07`
   - Completed audits should include `SECTION 08`, `SECTION 09`, and `SECTION 10`
4. Preserve the current doc content locally before rewriting.
5. Rebuild the document in markdown and update the SAME doc with `GOOGLEDOCS_UPDATE_DOCUMENT_MARKDOWN`.
6. Re-export the doc as text and verify the updated document now contains all expected section markers.
7. Re-check the spreadsheet tab to confirm the existing links still point to the correct doc IDs.

Why this matters:
- It is faster than creating replacement docs and then rewriting spreadsheet links.
- It preserves any sharing, comments, and existing stakeholder references.
- It gives a clean verification loop: export txt before, update in place, export txt after.

Pitfalls learned:
- Immediately after a doc update, a fresh export can briefly return an HTML/login-style response instead of plain text. Wait a moment and retry the export before assuming the doc is broken.
- `GOOGLEDOCS_UPDATE_DOCUMENT_MARKDOWN` is destructive to the document body. Save the prior exported text locally first if there is any chance you may need to restore or compare.
- For audit completion work, the existing shorter docs can be expanded by preserving their original Sections 01-07 narrative and then adding the missing page-system, territory, 12-month outcome, and bottom-line sections in the same document.

## Variant: SEO Website Strategy (Strategy + Audit)

When Matthew asks for a full strategy or says he does **not** want a technical audit, load **strategy-pilot**.

Use AuditPilot's research engine for:
- live site review
- SERP checks
- page inventory
- competitor comparisons
- market pattern analysis

Then let **strategy-pilot** handle the strategic work:
- page-system taxonomy
- opportunity classification
- prioritization
- rollout planning
- cross-vertical SEO-director reasoning

AuditPilot should support the research. StrategyPilot should own the final strategic blueprint.

## Table Formatting Rule
NEVER use 6+ column tables in .docx files destined for Google Docs — they get squished and unreadable. Max 3 substantive text columns. For competitor profiles, use individual card-style 2-column tables (Detail | Info). For comparison matrices, use 3-column format (Capability | Who Has It | Who Doesn't).

## Pitfalls (Learned Apr 2026, ShopPositioner Intel)

- browser_vision can fail silently in subagents. Always tell subagent 3 to
  fall back to browser_snapshot. Vision failures lose screenshots but NOT data.
- web_search rate limits hit after ~5 rapid calls. Subagent 2 should space
  them out or batch with sleeps.
- Subagent file isolation: files in /tmp/ are NOT accessible from main session.
  Rely on returned summaries. Re-query only for exact table data.
- Competitive landscape subagents tend to find 8-12 competitors. Good. More
  is better for this variant. Standard audits only need 2-3.
- Blog post counting: Firecrawl /v1/map returns blog URLs. Count them in
  subagent 1 for accurate numbers (don't estimate from partial scrapes).
- Pricing transparency varies. Some agencies hide pricing. Note "not published"
  in the competitor table rather than guessing.
- Screenshot path depends on the local browser tool. Save screenshots explicitly
  into `/tmp/<client>-audit/screenshots/` so the main session can find them.
  Resize with Pillow before embedding (max 900px wide).
- Subagent 2 sleep pattern: `terminal: sleep 3` between web_search batches works
  but counts as a "failed" tool call (exit code 0 but logged as error). Harmless.
  All 9 web_searches succeeded in v2 run with this pattern.
- Homepage screenshots are very tall (10000+ px full page). Crop to top 1200px
  for above-fold capture, or use Pillow to resize proportionally.
- browser_vision has an 8000px dimension limit (API returns invalid_request_error
  "image dimensions exceed max allowed size: 8000 pixels"). The screenshot file
  is still saved to browser_screenshots/ and can be shared via MEDIA: even when
  vision analysis fails. For tall pages, the screenshot_path is usable even if
  the AI analysis is not. Don't treat this as a blocking error.
- browser_vision has an 8000px dimension limit (API returns invalid_request_error
  "image dimensions exceed max allowed size: 8000 pixels"). The screenshot file
  is still saved to browser_screenshots/ and can be shared via MEDIA: even when
  vision analysis fails. For tall pages, the screenshot_path is usable even if
  the AI analysis is not. Don't treat this as a blocking error.
- Meta Pixel can be injected twice via HFCM plugin. Worth noting in tech stack.
- Parent company discovery: web_search for founder name reveals if the niche
  agency is actually a vertical brand of a larger general agency.
- Blog burst publishing: check sitemap lastmod dates, not just count. 17 posts
  in one month followed by gaps reveals batch content strategy vs consistent cadence.

## Services You Should Be Selling (Critical Thinking Section)

For Sales Audit v2, Section 05 requires critical thinking about what services
the prospect almost certainly offers but has no pages for. This is different
from a simple "missing services" list because it ties each gap to something
specific about THEIR business (their technician's background, their market,
their existing service line).

**The framing Matthew wants:** "You might already offer these. You just do
not have pages selling them. If [technician] has [specific experience], there
is no way you are turning down [service type] jobs. But your website acts
like you only do [listed services]."

**How to find the services they should be selling but aren't:**

1. **Read the About page closely.** The technician's bio is the goldmine.
   AP Pest's Matt Lawless had "Heat Treatments for Bed Bugs" in his
   Technical Innovations history at Rentokil — so the audit called out
   that bed bug heat treatment was literally his specialty and they had
   no page for it. That tie-in is what makes the section credible instead
   of generic.

2. **Check the DataForSEO keyword data for service categories they don't list.**
   If the market has big-volume searches for a service that isn't on their
   services page, that's either a missing service or an uncaptured one.

3. **Check what every competitor has.** If 5 of 7 competitors offer it,
   the prospect almost certainly gets called about it.

4. **Apply market-specific logic.** For AZ pest control: termite is the #1
   category by search volume, every real competitor has it, and no AZ pest
   company says no to a termite call. If they don't have a termite page,
   they're losing termite leads to everyone else.

**Table format:**
| Service | Monthly Searches | Why You Should Have This Page |
|---------|------------------|-------------------------------|
| Termite Control & Inspection | 2,600+ | Arizona's #1 pest concern. Every competitor has this. Matt has vector and termite experience. You almost certainly accept termite calls. You just have no page capturing them. |

**Also include "Missing Location Depth" subsection:** beyond city pages,
call out neighborhood-level pages they should build. For AZ: Troon North,
Grayhawk, Power Ranch, Seville, etc. For home service verticals, this is
where the real long-tail local SEO wins happen. Show Matthew (or whoever
reads the audit) that we understand the market at a neighborhood level
that no template-based agency does.

## The Growth Playbook Section (Selling The Dream)

Section 09 of Sales Audit v2 is where we sell ProofPilot as a growth partner,
not a website vendor. **Always load the ProofPilot Pricing Guide first** before
writing this section:

```python
# GDoc ID for ProofPilot Agency Pricing Structure & Package Guide
PRICING_GUIDE_ID = "110HqAtMFxcUcNLPirNVm9q-54yFa9ALP1QEmFjXuaHw"
# Export as text via Drive API (webhook OAuth method, see proofpilot-docx-gdrive-workflow skill)
# URL: https://www.googleapis.com/drive/v3/files/{fid}/export?mimeType=text/plain
```

Match the pricing guide's service names exactly. Key services to reference
in the playbook section (do NOT list prices in the audit):

- **Territory Domination SEO**: monthly cadence of 4 service pages, 4 location
  pages, 4 blog posts, 8-12 backlinks, advanced technical SEO, weekly GBP,
  25+ directory citations, video content, IFTTT syndication, programmatic SEO
- **AEO / AI Search Optimization**: structured content for ChatGPT/Gemini/
  Perplexity/Copilot, AI citation monitoring, conversational keyword targeting,
  AI Overview capture, entity authority building across Google Knowledge Graph
- **Geo Silo Architecture**: for location targeting at city + neighborhood level
- **Reputation Management + Review Automation**: the review flywheel
- **Google Ads + LSA + Meta Ads**: one integrated paid system
- **Lead Tracking + Heat Maps + Monthly ROI Reports**: the "know what is working" pillar

**The six pillars to structure around (battle-tested from AP Pest audit):**
1. A Website That Was Actually Built To Rank
2. Territory Domination SEO
3. AI Search Optimization (AEO)
4. Reddit, Nextdoor, and Community Groups
5. Paid Media That Works With Your Organic
6. Know What Is Working (tracking + reporting)

**Key positioning lines that worked:**
- "ProofPilot is a growth partner, not a website vendor."
- "You already own the domain and you will continue to own every page we build."
- "Nothing is locked behind a subscription."
- "Reddit currently outranks most [vertical] sites in [metro]." (check this per audit)
- "Month to month, no long term contracts. You own everything we build."

**Follow with Section 10: Where We Take You In 12 Months.** Side-by-side
"From Where You Are Now" (red X bullets for current state) and "To Where
You Are Going" (green check bullets for 12-month target state). Close with
a "The Bottom Line" callout box.

## Schema Field Audit (Always Do This)

The most powerful CEO-level findings come from schema markup mismatches. Always check:
- **Phone in schema vs. header vs. footer vs. contact page** (3 different numbers = devastating NAP finding)
- **Email field** (agency name instead of email, e.g., "405media" = embarrassing for whoever built the site)
- **Opening hours** (claims 7 days but closed weekends?)
- **Address** (schema address vs. footer address vs. GBP address)
- **Business name** (schema name vs. displayed name vs. GBP name)
- **primaryImageOfPage** (pointing to an icon or placeholder instead of real business image)

Schema mismatches are the #1 "your current marketing team is asleep at the wheel" finding. CEOs understand "Google is showing a phone number that doesn't match your website" instantly. Always run: `curl -s URL | grep -A 20 'application/ld+json'` on homepage + 2 service pages.

## Finding Quality Standard

Borrow the strongest part of LLM-first SEO workflows: every important finding should be evidence-backed.
For major findings, be able to support:
- **Finding**
- **Evidence**
- **Impact**
- **Fix**

Use confidence labels internally when useful:
- **Confirmed** — directly observed
- **Likely** — strong signal but partial verification
- **Hypothesis** — plausible, but needs more proof

Do not let likely or hypothesis-grade checks become overstated client claims.

## Embedded Audit Sub-Skills (Adapted for AuditPilot)

AuditPilot should borrow the best parts of modular SEO workflows without turning the audit into a generic tool dump. Use these as embedded thinking layers:
- **Technical baseline** — crawlability, robots, redirects, broken links, rendering, security basics
- **Content quality** — thin pages, duplication, proof gaps, E-E-A-T, generic AI-sounding copy
- **Image SEO** — alt text, formats, dimensions, lazy-loading choices, gallery/search value
- **Internal linking** — hub-to-spoke support, dead-end pages, weak commercial page support
- **Schema and entity** — trust-impacting markup issues, identity consistency, sameAs/entity clarity when relevant
- **GEO / AI-search** — llms.txt, AI crawler access, citable passages, comparison-page opportunities, listicle/mention patterns
- **AEO / zero-click** — question blocks, answer formatting, comparison pages, FAQ opportunities where appropriate
- **Verifier** — dedupe overlapping findings and remove unsupported claims before finalizing

Use these layers to make the audit more effective, strategic, and evidence-backed. Do not let them replace the main sales narrative.

## Quality Checklist (Sales Audit v2)
- Branded (Bebas Neue headings, Calibri body, exact colors)
- Cover page stats bar leads with killer one-liner (e.g. "RANKING FOR 0 OF 10 | 5 OF 32 INDEXED")
- Section 02 (Ranking Reality) has BOTH the rank-per-keyword table AND the indexed-vs-sitemap table
- Section 03 (Who Is Outranking You) has 5-7 real competitors with Content Footprint + Why They Rank
- Section 03 has per-competitor ranking tables ("What They Are Actually Ranking For") with 3 cols: Position | Keyword | Monthly Searches
- Section 03 closes with red "[Prospect] Ranking for 0 of our N core keywords" mini-heading + punchline paragraph
- Section 04 keyword tables have three phases: Core Money / Long-Tail City / Informational Blog
- Section 05 Services You Should Be Selling ties each gap to SPECIFIC prospect context (technician bio, market)
- Section 05 includes neighborhood-level Missing Location Depth for the vertical
- Section 06 Red Flags has schema as a SUBSECTION (not its own section), explained in plain English
- Section 09 Growth Playbook uses exact language from ProofPilot Pricing Guide (load GDoc 110HqAt...)
- Section 09 has all 6 pillars: Website, Territory Domination SEO, AEO, Reddit/Community, Paid, Tracking
- Section 10 is the 12-month side-by-side From/To comparison
- NO "CEO Talking Point" boxes (those are for Gap Analysis variant only)
- Strategic verdict in Section 01 callout box
- ROI section with real math and three-case funnel math (conservative, realistic, aggressive) covering traffic -> leads -> booked jobs -> revenue -> total ROI, with clear assumptions, ranges, lifetime value where relevant, and no fake precision or listed prices)
- Genuine strengths acknowledged in Section 03 "What You Have They Do Not"
- **Local Falcon rich grid image embedded (Google Map + rank numbers in each circle)**
- **Local Falcon Top 10 competitor SoLV table in Section 03**
- **Local Falcon AI analysis insights folded into Problems, What Is Working, and Overtake Targets**
- **Local Falcon SoLV / ARP / Found-in X of Y metrics called out in the stats bar**
- No em dashes, semicolons, tool names (NEVER write "Local Falcon" in the client doc, call it "geo-grid visibility scan" or "local search visibility analysis")
- Uploaded to GDrive Proposals folder (PROOFPILOT_DRIVE_FOLDER_ID)
- Link sent to Matthew for review
