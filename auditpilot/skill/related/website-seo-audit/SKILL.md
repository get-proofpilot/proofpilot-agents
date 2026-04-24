---
name: website-seo-audit
description: Comprehensive website and SEO audit system for home service businesses. Use when asked to audit a website, analyze SEO performance, evaluate local search visibility, assess AI search optimization, or create audit reports for clients. Triggers include "audit this website", "SEO analysis", "website review", "local SEO audit", "what's wrong with this site", or any request to evaluate a home service business website for traffic, trust, conversion, or search performance issues.
---

# ProofPilot Website & SEO Audit System

This skill conducts comprehensive 40-point website audits for home service businesses (electricians, plumbers, roofers, contractors, etc.) and generates actionable reports that identify problems and opportunities.

## Audit Philosophy

**For full sales-audit doc structure (Matthew-approved v4), see
`references/sales-audit-v4-structure.md`. That is the canonical 10-section
format proven on AP Pest Control. Use it whenever the audit feeds a pitch.**

**These audits are sales tools, not technical reports.** Most prospects already know their website/marketing is bad. The audit validates their feeling, quantifies the pain with real data, and builds urgency to act NOW. When an audit feeds into a proposal (most common use case), keep it high-level and strategic. Business owners do not care about PageSpeed scores, meta tag counts, or schema validation. They care about lost revenue, competitor advantages, and growth opportunities.

A website has one job: turn strangers into customers. If it's not doing that, it's failing.

**When used as part of a sales proposal**: Lead with keyword opportunity data and missing pages, NOT reviews or AI visibility. The core sales pitch is "you're missing X keywords worth Y monthly searches and Z revenue." Reviews and AI are supporting evidence, not the headline. See `proofpilot-proposals` skill Type 3 for the correct section order.

Every website that generates consistent leads has four things working together. If any one of these is broken, money is being left on the table:
1. **Traffic** - If people can't find you, nothing else matters
2. **Trust** - People buy from businesses they trust
3. **Conversion** - Traffic without conversion is wasted money
4. **SEO & Content** - Google rewards websites built right

## Scoring System

Each category is scored 1-10. The overall grade is the average of all category scores.

**Scoring Guide:**
- 1-3 = Critical problems (costing money every day)
- 4-5 = Significant issues (room for major improvement)
- 6-7 = Good foundation (minor optimizations needed)
- 8-9 = Strong performance (fine-tuning only)
- 10 = Crushing it (maintain and expand)

**Interpretation:**
- Below 5/10 overall = Website is actively losing leads
- 5-6/10 overall = Functional but underperforming
- 7-8/10 overall = Good foundation, ready for growth
- 9-10/10 overall = Market leader position

## IMPORTANT: This Is a Sales Document

This audit exists to feed a sales proposal. Frame every finding as a revenue problem or opportunity. Do NOT get lost in PageSpeed scores, Lighthouse audits, or technical SEO minutiae. Business owners do not care about CLS scores or Core Web Vitals. They care about lost leads and revenue.

## Available Tools (What We Actually Have Access To)

1. **Firecrawl Scrape** - Pull any page's content (homepage, service pages, competitor pages)
2. **Firecrawl Map** - Get full site page inventory (THE most powerful data point for showing gaps)
3. **Firecrawl Search** - Find competitors, review data, listicle placements, anything searchable
4. **Browser** - Manual review for trust signals, CTAs, conversion paths (use sparingly, do it yourself, NOT subagents)
5. **DataForSEO** via Composio REST API - keyword research, SERP analysis, keyword difficulty (see audit-pilot/references/dataforseo-auth.md for exact curl commands). Use `DATAFORSEO_GET_KW_GOOGLE_ADS_KW_FOR_KW_LIVE` for keyword data. Backlinks API NOT active.
6. **Local Falcon** via ProofPilot Agency API key at ~/.hermes/secrets/local_falcon.env. Geo-grid rank tracking with rich map images, per-competitor SoLV/ARP/ATRP, and AI strategic analysis. MANDATORY on every audit. Use the helper at audit-pilot/scripts/local_falcon.py. See audit-pilot skill "Local Falcon" section for the full workflow.

### Tools We Do NOT Have Access To
- BrightLocal (no account)
- Ahrefs / SEMrush (no account)
- PageSpeed Insights API (rate limited, and NOT needed for sales audits anyway)

## Audit Sections Overview

| Section | What It Measures | Scoring |
|---------|-----------------|---------|
| 1. Traffic | Visibility, rankings, GBP, local pack | /10 |
| 2. Trust | Guarantees, reviews, badges, personality, story | /10 |
| 3. Conversion | CTAs, urgency, mobile, speed, forms | /10 |
| 4. SEO & Content | Pages, URLs, content quality, technical | /10 |
| 5. Keywords | Money keywords, local keywords, gaps | Analysis only |
| 6. Heatmaps | Local pack visibility across service area | Visual |
| 7. AI Search | ChatGPT/Perplexity visibility, mentions | Bonus |

**Overall Grade = Average of Sections 1-4**

## Detailed Scoring

See `references/scoring-guide.md` for complete scoring criteria with examples for each subsection.

## Tool Instructions

See `references/tool-instructions.md` for step-by-step guides on running BrightLocal audits, Local Falcon scans, and interpreting results.

## AI Search Visibility

See `references/ai-search-audit.md` for the complete methodology on auditing AI search visibility (ChatGPT, Perplexity, Reddit mentions, "Best Of" listicles, unstructured citations).

---

## Section 1: TRAFFIC (Score /10)

If people can't find you, nothing else matters.

**1A: Organic Traffic & Rankings**
- Source: Ahrefs/SEMrush
- What: Monthly organic traffic volume and trend
- Key insight: Quality > quantity. Local traffic > national blog readers.

**1B: On-Page SEO Score**
- Source: BrightLocal Local SEO Audit > On-Page section
- What: Title tags, meta descriptions, H1s, schema markup

**1C: Link Profile**
- Source: BrightLocal Local SEO Audit > Links section
- What: Referring domains, link quality

**1D: Citations (NAP Consistency)**
- Source: BrightLocal Local SEO Audit > Citations section
- What: Name, Address, Phone consistency across directories

**1E: Google Business Profile**
- Source: BrightLocal GBP Audit
- What: Profile completeness, posts, Q&A, categories
- Note: List what's missing. Name competitors who outrank them.

**1F: Local Pack Visibility**
- Source: Local Falcon geo-grid
- What: Map pack rankings across service area
- Note: Screenshot the heatmap. Green = getting calls. Red = competitors get them.

---

## Section 2: TRUST (Score /10)

People buy from businesses they trust. Manual website review.

**2A: Risk Reversal / Guarantee**
- What: Does the business reduce perceived risk?
- Look for: Satisfaction guarantee, free estimates, warranty, "no surprises" pricing

**2B: Reviews & Social Proof**
- What: Star ratings, testimonials, review counts displayed
- Look for: Google review widget, testimonials with real names, video testimonials

**2C: Trust Badges & Reputation**
- What: License, insurance, certifications, awards, BBB
- Look for: License number visible, "Licensed & Insured", industry certifications

**2D: Personality & Face**
- What: Real people visible, not stock photos
- Look for: Owner photo, team photos, branded trucks, behind-the-scenes

**2E: "Like, Know & Trust" Factor**
- What: Is the business approachable and relatable?
- Look for: Friendly tone, community involvement, family business feel

**2F: Emotional Backstory / Mission**
- What: Why did they start? What do they care about?
- Look for: About page with story, mission statement, values, community ties

---

## Section 3: CONVERSION (Score /10)

Traffic without conversion is wasted money. Manual review.

**3A: Calls to Action**
- What: How easy is it to contact them?
- Look for: Phone in header, "Get Quote" buttons, click-to-call on mobile

**3B: Incentive to Act Now**
- What: Urgency or reason to call today
- Look for: Limited offers, seasonal specials, "Call today" messaging

**3C: Mobile Responsiveness**
- What: Does it work perfectly on mobile?
- Test: View on phone, check tap targets, test forms

**3D: Page Speed & Functionality**
- What: Fast loading, no broken elements
- Source: PageSpeed Insights, manual testing

**3E: Form Friction**
- What: How easy is the form?
- Best: Name + Phone only. Worst: 10+ required fields.

---

## Section 4: SEO & CONTENT (Score /10)

Google rewards websites built right.

**Strategy-first content architecture**
When the user asks for a growth SEO strategy, prioritize the page system over technical minutiae. Think like an SEO director, not a technical auditor. If the request is primarily strategic and should become a full strategy document, load `strategy-pilot` and use this skill only as supporting research. The goal is to identify the content and search levers that will actually move rankings, qualified traffic, and conversions. Frame the audit around the content architecture that drives revenue:
- **Service pages** — one page per real money service, with unique intent, proof, FAQs, internal links, and clear reasons this page deserves to rank
- **Location pages** — city pages first, then neighborhood/service-area pages where demand, project proof, and competition justify them
- **Competitor/comparison pages** — pages built for comparison intent, like "X vs Y", "best X in [city]", "how to choose a [service] company", or category-level installer comparison pages
- **Material pages** — material / product / option pages that help buyers choose, especially in visual or specification-heavy verticals
- **INSPO pages** — style, use-case, gallery, and inspiration pages that win consumers earlier in the buying journey
- **Project pages** — case-study or project-gallery pages that act as trust assets, internal-linking support, and localized proof for city/service clusters
- **Partnership / authority pages** — manufacturer, installer, partner, certification, or "top-rated" authority pages when they strengthen trust, comparison intent, and AI-search visibility
- **AI-search / AEO comparison content** — pages such as "best [product/service] for [market]" or "top-rated [installer/category]" that help the site become citable in AI answers and comparison-style search journeys

Always explain *why* each page type matters. The work is not just naming missing pages. It is identifying which page systems are core SEO strategy, which require critical thinking about the market, and which are genuine result-driving opportunities the client is currently leaving on the table.

**4A: Page Inventory**
- What: Dedicated pages for each service and location?
- Check: Count pages, compare to GBP categories

**4B: URL Structure**
- What: Clean, descriptive URLs
- Good: /services/panel-upgrade/ Bad: /page?id=123

**4C: Service Page Quality**
- What: Substantial or thin content?
- Look for: 500+ words, unique content, proper headings, images

**4D: Location Pages**
- What: Pages for each city served?
- Look for: City pages, service+city combo pages

**4E: Content Quality (Blog)**
- What: Helpful and authoritative or generic AI filler?
- Red flag: Blog posts about unrelated topics (sign of spam)

**4F: FAQ Quality**
- What: FAQs match People Also Ask?
- Check: Compare to Google's PAA for their keywords

**4G: Technical SEO Basics**
- What: Meta titles, descriptions, schema, sitemap
- Check: View source, SEO browser extension

---

## Section 5: KEYWORD ANALYSIS

Not scored. Informs strategy.

**5A: Money Keywords** - High commercial intent (ready to hire)
**5B: Local Keywords** - City + service combinations
**5C: Keyword Gaps** - What competitors rank for that this site doesn't

---

## Section 6: LOCAL RANKING HEATMAPS (MANDATORY)

**Every audit includes at least one Local Falcon scan.** No exceptions. The rich
grid image is the single most visceral piece of evidence in the doc.

**Steps:**
1. Find the business:
   `python3 ~/.hermes/skills/productivity/audit-pilot/scripts/local_falcon.py find "Business Name" --near "City, ST"`
2. Add to account if new:
   `python3 ~/.hermes/skills/productivity/audit-pilot/scripts/local_falcon.py add <place_id>`
3. Run the scan with AI analysis enabled:
   `python3 ~/.hermes/skills/productivity/audit-pilot/scripts/local_falcon.py scan --place_id <id> --keyword "primary keyword" --lat <lat> --lng <lng> --grid 7 --radius 5 --measurement mi --platform google`
   (Manually trigger ai_analysis=true in the scan call if needed, see the helper.)
4. Wait for the scan to complete (check status via the reports endpoint), then:
   `python3 ~/.hermes/skills/productivity/audit-pilot/scripts/local_falcon.py report <report_key> --markdown --ai`
5. Download the rich grid image for embedding:
   `python3 ~/.hermes/skills/productivity/audit-pilot/scripts/local_falcon.py images <report_key> <owner_key> --out /tmp/audit-lf/`

**Use the rich grid image** (`/image/<report_key>/<owner_key>`) which shows the
Google Map with rank numbers in each circle. NOT the bare heatmap overlay.

**Colors in the rich grid:** Green (#1-3) = In pack. Yellow (#4-7) = Close. Red (#8+) = Losing. Gray/"20+" = Invisible.

**Credit budget:** 49 credits per 7x7 scan + a few for AI analysis. Starter plan
has ~7500/cycle so budget 50-100 credits per audit. Check `python3
~/.hermes/skills/productivity/audit-pilot/scripts/local_falcon.py account`
before running if credits are a concern.

---

## Section 7: AI SEARCH VISIBILITY (BONUS)

See `references/ai-search-audit.md` for full methodology.

**7A: AI Recognition** - Does ChatGPT/Perplexity recommend them?
**7B: Multi-Platform Reviews** - Google, Yelp, Facebook, BBB, industry sites
**7C: "Best Of" Listicles** - Are they on local best-of lists?
**7D: Reddit/Forum Mentions** - Community discussions
**7E: PR/News Citations** - Local media, press releases

---

## Output Format

### Final Scorecard

| Category | Score |
|----------|-------|
| Traffic Score | X/10 |
| Trust Score | X/10 |
| Conversion Score | X/10 |
| SEO & Content Score | X/10 |
| **OVERALL GRADE** | **X/10** |

### Key Findings

**What's Working Well**
1. [Strength with evidence]
2. [Strength with evidence]
3. [Strength with evidence]

**Critical Issues to Fix**
1. [Urgent problem + impact]
2. [Second priority + impact]
3. [Third priority + impact]

**Quick Wins (Easy Fixes, Big Impact)**
1. [Low effort, high impact]
2. [Low effort, high impact]
3. [Low effort, high impact]

**Pages Needed But Missing**
1. [Missing page + keyword opportunity]
2. [Missing page + keyword opportunity]
3. [Missing page + keyword opportunity]

### Mandatory SEO Visibility Section

Every audit/report for Matthew must include this, even when the rest of the document is more sales-focused:

**1. Keyword Snapshot**
- Present this like a Search Atlas / SEMrush domain report, not a loose narrative
- For the top 20-25 keywords, show:
  - keyword
  - search volume
  - estimated traffic from that keyword
  - current position
  - landing page / URL
- Split into useful buckets when possible:
  - primary service keywords
  - service + city keywords
  - informational / blog keywords
- Label the columns clearly as `Keyword Volume` and `Estimated Traffic` so they are never conflated

**2. Local Pack / Geo-Grid Snapshot**
- Local Falcon summary for at least one primary money keyword
- What the grid says in plain English: strong / mixed / weak
- Best visible zones, weak zones, and which competitors dominate where relevant
- If a live scan cannot be run, state that limitation internally and use the best available local-pack evidence instead

**3. Traffic / Visitor Estimate**
- Estimated monthly organic visitors / traffic
- High-level quality read on whether traffic is meaningful or inflated by low-intent blog content

**4. Top Pages**
- Top organic pages where data is available
- Identify whether the winners are service pages, location pages, or blog posts
- Call out if traffic is being driven by buyer-intent pages versus informational pages

**5. SEO Buckets That Matter**
- Which services appear to rank best
- Which location buckets appear to rank best
- Which keyword buckets are weak or missing
- Tie the buckets back to business value, not just raw rankings

---

## Workflow (Practical, Tested)

Target: 15-20 minutes of data gathering, then build the document.

1. **Firecrawl Search** - Find the business website, get initial competitor landscape (2 min)
2. **Firecrawl Scrape** - Pull homepage content: meta title, description, CTAs, trust signals, services listed (2 min)
3. **Firecrawl Map** - Get full site page inventory. Count service pages, location pages, blog posts, combo pages. This single data point tells you more than any technical audit. (2 min)
4. **Keyword / traffic pull** - Capture the top keywords, ranking positions, estimated organic traffic, and top pages before writing conclusions. If possible, bucket the rankings into service, service+location, and blog/informational groups. (3-5 min)
5. **Firecrawl Search** - Pull review data: "[Business Name] reviews rating" to get Google, Yelp, BBB ratings. Multi-platform review inconsistency (e.g., 4.9 Google but 2.1 Yelp) is a powerful sales lever. (2 min)
6. **Firecrawl Search** - Competitor search: "best [service] [city]" to find who ranks in listicles and who the competitors are. (2 min)
7. **Local Falcon geo-grid + AI analysis (MANDATORY)** - Run the scan early so it
   completes while you do other work. 7x7 grid, 5mi radius, primary keyword, ai_analysis=true. 
   See Section 6 for exact commands. (kick off in 30 sec, scan completes in 1-3 min in background)
8. **Browser** (optional) - Quick manual review ONLY if scrape data is insufficient for trust/conversion scoring. Do it yourself, NOT via subagents (they time out). (5 min max)
9. **Pull Local Falcon rich report** - `local_falcon.py report <report_key> --markdown --ai`
   gives you doc-ready markdown with Top 10 competitors, #1 holders, AI summary, 
   major/minor problems, what's working, vulnerable overtake targets, and citation opportunities. (1 min)
10. **Score and compile findings** - Use data from steps 1-9 to score each section and write findings
11. **Generate .docx document** - Use python-docx with ProofPilot brand styling. Embed the rich Local Falcon grid image.

**Total time:** 30-45 minutes including document generation

### Critical Lessons (Mar 30 2026)
- DataForSEO national SERP positions ≠ local rankings. NEVER claim a client doesn't rank for a keyword based on DataForSEO position data. Trust the client for local positions.
- Always crawl BOTH client AND competitor sitemaps before making page claims (e.g., "they don't have a commercial page"). Verify everything.
- Don't inflate keyword gaps. If client has 36 service pages, don't say 23. Count from the actual sitemap.
- Don't over-index on review scores or AI search. The meat is keyword/competitor data.
- Section titles should be natural ("Who Is Outranking You") not labeled ("THE PROBLEM: Who Is Outranking You"). No colons.
- Don't name tools (DataForSEO, Firecrawl) in client-facing docs.
- Consolidate related sections. Don't split competitor overview and keyword data into separate thin sections.
- Matthew expects the keyword section to look like a Search Atlas domain report: `Keyword | Keyword Volume | Estimated Traffic | Position | URL`, plus traffic share if available. Do NOT present a narrative-only keyword summary when he asked for SEO visibility.
- DataForSEO `etv` / estimated traffic is useful, but do NOT present it as directly interchangeable with Search Atlas estimated traffic. Vendor models can be materially different, sometimes by 4x or more on the same domain. If Search Atlas numbers are the benchmark in context, label DataForSEO clearly as `DataForSEO estimated traffic` and separate it from first-party GSC / GA4 actual traffic.
- For DataForSEO Labs domain-report style endpoints (`ranked_keywords`, `domain_rank_overview`, `relevant_pages`), use `location_code=2840` for the US benchmark unless there is a confirmed reason to use another supported location. A market code like `1014226` can fail with `40501 Invalid Field: 'location_code'` on these Labs endpoints even though it works elsewhere.

## Fallback Workflow (When Firecrawl/web_extract Is Down)

Both web_extract and web_search can go down (400 errors). When this happens, use this browser-first workflow instead. It's equally effective, just a bit more manual.

1. **Sitemap via curl** - `curl -s https://example.com/page-sitemap.xml | grep '<loc>' | sed 's/.*<loc>//' | sed 's/<\/loc>.*//'` gives you the full page inventory instantly. Works on any Yoast/RankMath site. This replaces Firecrawl Map and is actually faster.
2. **Browser for homepage** - Navigate to homepage, use `browser_snapshot(full=true)` for content and `browser_vision` for visual layout/trust signals/CTAs.
3. **Browser for key pages** - Hit /services/, /about/, /reviews/, /areas-we-serve/, and one sample service page. Snapshot each for content analysis.
4. **Browser for competitors/reviews** - If web_search is also down, check the Yelp link from the site header, Google Maps link, or search Google manually via browser.
5. **Score and compile** - Same as normal workflow.

The sitemap curl trick is so reliable it should be used FIRST even when Firecrawl is available, since it gives you the exact same page inventory data for free in 2 seconds.

## Parallel Subagent Data Gathering (Tested Mar 31 2026)

The fastest approach for a full audit is 3 parallel subagents via delegate_task(tasks=[...]):

1. **Site Crawl subagent** (terminal+web): Pulls sitemap via curl, scrapes homepage + services + 5+ individual service pages via Firecrawl. Reports: full URL inventory, title tags, meta descriptions, headings, word counts, content analysis, missing services, URL structure.
2. **Keyword Research subagent** (terminal+web): Runs DataForSEO keyword queries for the service area, searches for competitors via Firecrawl, scrapes competitor sitemaps for page count comparison.
3. **Visual Audit subagent** (browser): Navigates the site visually, checks trust signals, CTAs, broken elements, review widgets, schema in source, footer, mobile indicators. Takes screenshots of issues.

All 3 run simultaneously (~5-9 min total). Subagent summaries contain all the data needed to build the document. NOTE: Subagent files are sandboxed and NOT accessible from the main session. Don't rely on files they save. The summary text returned is your data source.

After subagents complete, build the .docx in terminal (NOT execute_code, which has a separate sandbox where python-docx output can't be accessed for upload).

## Pitfalls (learned the hard way)
- Browser audit subagents DO work now (previously timed out). Give them the browser toolset and they return detailed visual + technical findings in ~5 min.
- Do NOT try to run DataForSEO backlinks API. Subscription not active, returns "Access denied."
- DEAD DataForSEO slug: `DATAFORSEO_KEYWORDS_DATA_GOOGLE_ADS_SEARCH_VOLUME_LIVE` (404). Use `DATAFORSEO_GET_KW_GOOGLE_ADS_KW_FOR_KW_LIVE` instead.
- Do NOT spend time on PageSpeed Insights. Google's free API is rate-limited, and business owners don't care about CLS scores.
- Do NOT try to use BrightLocal or Ahrefs. We don't have accounts.
- Local Falcon caveat: if `local_falcon.py scan ...` returns HTTP 403 and `local_falcon.py account` shows `on_demand_api: false`, stop retrying scan creation. This account can still read existing reports and account data, but live API scan creation may be blocked on the current plan. In that case, use browser/search/manual local-pack evidence or existing Local Falcon reports if available, and note the scan limitation internally instead of burning time.
- Best fallback for geo-grid read when Local Falcon scan creation is blocked: use DataForSEO `serp/google/local_finder/live/advanced` with `location_coordinate` across a 5-point or 9-point sample grid around the business. Run the same money keyword at center plus directional coordinates, record the business rank at each point, and summarize average rank, top-3 count, top-10 count, and any points where the business drops out. This is not a native Local Falcon heatmap, but it gives a solid directional geo-grid proxy for internal audits.
- Firecrawl Map is the single most valuable tool. A site with 576 pages but only 23 service pages tells the whole story.
- web_extract and web_search can both go down simultaneously (400 errors). Don't waste time retrying. Switch to browser+curl fallback immediately.
- Check /reviews/ page early. If it returns 502/404, that's a finding itself AND you need to get review data elsewhere.
- Always check for NAP inconsistency between the site title/tagline city and the physical address. Common on sites built by agencies who template the city name.
- Always check schema markup fields (phone, email, address) for agency artifacts. Common finds: agency name in email field, third phone number in schema that doesn't match header or footer, wrong address. Run `curl -s URL | grep -A 20 'application/ld+json'` on homepage. Schema mismatches are the #1 "your marketing team is asleep" finding for CEOs.
- Check ALL service pages for copy-paste artifacts: competitor names left in content, conflicting experience claims (50 years on one page, 25 on another), test/draft pages indexed (/test-page/, /auto-draft-*), form typos. These are devastating CEO-level credibility findings.
- Check image alt text site-wide. If every image has empty alt text, that's a major SEO + accessibility finding (Google can't "see" project photos).

---

## Critical Reminders

- **THIS IS A SALES DOCUMENT, NOT A TECHNICAL CHECKLIST.** The audit exists to feed the proposal. Frame every finding as a revenue problem or opportunity. Do NOT get lost in PageSpeed scores, Lighthouse audits, or technical SEO minutiae. Business owners do not care about CLS scores. They care about lost leads.
- Traffic quality > traffic volume. 100 local searches beat 10,000 national blog readers.
- Track attribution: "Did a lead come from that page?"
- AI content about unrelated topics is spam. Flag it immediately.
- Use specific examples and competitor names. Generic findings are useless.
- The audit should feel like a diagnostic from a growth strategist, not a checklist.
- Multi-platform review gaps (strong Google, weak Yelp) are the #1 sales lever. Always check.
- Page inventory gaps (few service pages, missing combo pages) are the #2 sales lever. Firecrawl Map gives you this instantly.
- Do NOT spend time on tools you don't have access to (BrightLocal, Ahrefs). Use what you have: Firecrawl for site mapping and scraping, Firecrawl search for competitor/review data, browser for manual review, Local Falcon for geo-grid + AI analysis. Move fast.
- **Local Falcon is MANDATORY on every audit.** Always run at least one geo-grid scan with AI analysis before building the document. See Section 6 for the command sequence.

## Data Gathering Workflow (Practical)

Use these tools in this order. Total time target: 15-20 minutes of data gathering, then build the document.

1. **Firecrawl Search** - Find the business website and initial competitor landscape
2. **Firecrawl Scrape** - Pull homepage content (meta title, description, CTAs, trust signals, services listed)
3. **Firecrawl Map** - Get full site page inventory (count service pages, location pages, blog posts, combos)
4. **Firecrawl Search** - Pull Yelp rating/review count, Google review data from Birdeye/Trustindex
5. **Firecrawl Search** - Competitor search ("best [service] in [city]" listicles)
6. **Browser (optional)** - Quick manual review only if scrape data is insufficient for trust/conversion scoring

That gives you everything you need: page inventory, review data, competitor names, and homepage analysis. Do NOT run PageSpeed, Lighthouse, DataForSEO crawls, or deep technical audits unless specifically asked. The sales pitch does not need them.