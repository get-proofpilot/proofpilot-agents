# WebsitePilot Audit Research Phase

This is the first research block WebsitePilot should run before writing an audit, strategy, or homepage/demo brief. It combines the current AuditPilot and StrategyPilot guidance into one local, repo-owned workflow.

## 1. Confirm the target
- Business name
- Root domain
- Primary city or service market
- Main service category
- Any known competitors or sales priorities

Do not start the audit document until the root domain and market are clear.

## 2. Build the live site inventory
Use the current AuditPilot research stack:
- Firecrawl map for full URL inventory
- Firecrawl scrape or extract for homepage, service pages, location pages, about page, blog/resource pages, and contact page
- Sitemap and robots checks
- Homepage, service page, location page, and footer/header review
- Schema extraction from homepage and at least two service pages

Key outputs:
- total page inventory
- major page families
- services currently shown
- cities or service areas currently shown
- missing or weak commercial pages
- visible trust, reviews, credentials, proof, and conversion issues

## 3. Run ranking reality checks
For sales audits, this comes before technical findings.

Required checks:
- 10 high-intent live SERP searches for the market
- record whether the target appears in the top 10
- record who is number 1 for each query
- compare indexed pages from `site:domain.com` against sitemap/page inventory

The cover-level finding should be phrased like:
`Ranking for X of 10 core keywords | Y of Z pages visibly indexed`

## 4. Pull domain intelligence
Use the DataForSEO router from `_shared/skills/pilot-api-reference/scripts/dataforseo_router.py`.

Prospect sequence:
1. ranked keywords
2. page-two keywords
3. domain rank overview
4. relevant pages
5. competitors by domain

Competitor sequence for the top 2 to 3 true sales competitors:
1. ranked keywords
2. relevant pages
3. domain rank overview
4. optional domain intersection

Use this to understand keyword portfolio, traffic value, position distribution, top pages, page-two opportunities, and competitor gaps.

## 5. Run competitor and SERP pattern research
Use 20 to 25 query sweeps when the audit needs the stronger Sales Audit v2 structure. Track the prospect plus the main competitors.

Look for:
- which competitors rank for the money terms
- whether winning pages are service pages, city pages, service plus city pages, comparison pages, cost pages, guides, galleries, or listicles
- page systems competitors have that the prospect does not
- services and locations competitors cover more deeply
- question and decision-stage content competitors are using

## 6. Run local visibility research when local intent exists
For local businesses, include a geo-grid visibility scan through the Local Falcon workflow or MCP tools.

Default:
- Google Maps platform
- 7x7 grid for city audits
- AI analysis enabled when available
- top commercial keyword

Use the output for:
- share of local voice
- average rank position
- found-in points
- competitor pressure
- front-door visibility
- overtake targets
- grid/heatmap image for the audit doc

Client-facing documents should call this a geo-grid visibility scan or local search visibility analysis, not the tool name.

## 7. Review UX, conversion, proof, and visual quality
Check:
- first impression and headline clarity
- above-the-fold CTA
- phone/form visibility
- header/footer trust
- review presentation
- real photos vs stock
- team, project, case study, certification, warranty, financing, and process proof
- social profiles when relevant

Use screenshots when they strengthen the document.

## 8. Run the support-layer checks
These make the audit sharper but should not bury the main sales story.

Support layers:
- schema and entity consistency
- content quality and duplication
- image SEO, alt text, formats, file weight, dimensions
- internal linking and orphan-like pages
- broken links and redirect problems
- robots, crawlability, indexability
- social metadata
- AEO/GEO readiness, including citable passages, FAQ structure, AI crawler access, and comparison/cost/best-of opportunities

Every major finding should have finding, evidence, impact, and fix.

## 9. Convert research into strategy
StrategyPilot owns this layer. Turn the audit evidence into:
- strategic diagnosis
- current page-system map
- pages competitors have that the prospect does not
- core service pages to build or improve
- location pages and service plus city matrix
- problem, cost, comparison, best-of, FAQ, and content-pillar opportunities
- internal linking and hub-and-spoke plan
- GBP alignment layer when local
- 30/60/90-day build order
- 12-month future state
- ROI or lead-economics model with clear assumptions

## 10. Build the audit document
Use AuditPilot Sales Audit v2 unless Matthew asks for a different variant.

Preferred audit structure:
1. Cover page with stats bar
2. Where You Stand Today
3. Ranking Reality
4. Who Is Outranking You
5. Where You Should Be Ranking
6. Services You Should Be Selling
7. Red Flags On The Site
8. Revenue Impact
9. 30-Day Quick Wins
10. ProofPilot Growth Playbook
11. Where We Take You In 12 Months
12. Closing CTA
13. Methodology note

Use StrategyPilot instead when the request is more about what to build next than diagnosing the current site.

## 11. Feed the demo brief
For full WebsitePilot runs, convert the audit and strategy into an AutoPilot demo brief:
- homepage thesis
- primary offer
- buyer pains
- trust/proof requirements
- required sections
- service/page priorities
- local proof and service-area copy
- design direction

The demo should be anchored in audit evidence, not a generic homepage prompt.
