# GBPPilot Research Workflow

Use this before writing strategy recommendations.

## Core principle

Do not guess what the business should do in GBP.
Build the plan from:
- the real website
- the live Google Maps or GBP surface
- actual service areas
- visible competitors
- local demand signals
- current trust and proof assets

Use `no-miss-audit-checklist.md` as the final process backstop before you call the audit complete.

## Phase 1: Pull existing context

Before fresh research:
- run `session_search` for the client name, domain, and business name
- review any prior StrategyPilot, AuditPilot, ProjectPilot, or QAPilot work
- note any existing category, service, NAP, or review-response decisions

## Phase 2: Capture business basics

From the website and business profile, confirm:
- legal or display business name
- primary city
- service-area cities
- storefront vs service-area business
- core services
- highest-value service lines
- guarantees, certifications, licenses, years in business
- phone number and address format

## Phase 3: Audit the website support layer

Check at minimum:
- homepage H1 and title intent
- service pages and service hubs
- location pages
- about page and trust pages
- contact page and footer NAP
- internal links between homepage, services, locations, and contact
- whether the website language matches how people search locally

Location-page discovery rule:
- do not rely on one sitemap pull alone to decide whether location pages exist
- run at least one search-engine `site:` query for likely city pages
- check both `www` and naked-domain variants if the site resolves on both
- watch for location pages that reuse the homepage title or generic template copy, because those can exist without showing up clearly in a shallow sitemap summary

Suggested tools:
- `web_extract` for homepage and core pages
- browser tools for rendered page review
- `web_search` for `site:` discovery when page systems are unclear
- DataForSEO router when the site has enough footprint to justify deeper analysis

## Phase 4: Inspect the live Maps or GBP surface

Use the process in `live-review-workflow.md`.

Capture:
- current visible primary category
- rating and review count
- visible owner-post count in the last 30 to 60 days when possible
- products, services, and photo quality cues
- whether a services list is visible and whether it looks duplicated, bloated, or thin
- whether areas served are visible and whether obvious priority cities are missing
- Q and A coverage if visible
- whether the listing looks complete or thin

If Google blocks the share link or gives a limited view:
- switch to the direct Maps place URL when possible
- pull Maps URLs from the website if available
- use `web_extract` on the Maps place URL for public panel text
- continue the audit with explicit unverified labels instead of stopping

## Phase 5: Find the real competitors

Do not assume the user's named competitors are the only local competitors.

Look for three types:
- direct business competitors
- map-pack competitors for core service terms
- organic competitors for service plus city pages

For each strong competitor, note:
- category positioning
- service coverage
- review count and freshness
- visible offers, products, or guarantees
- areas served pattern if visible
- website page depth

## Phase 6: Pull demand, geo relevance, and citation evidence

Preferred sequence for domains with measurable footprint:

```bash
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py ranked_keywords --target DOMAIN --limit 100
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py domain_rank_overview --target DOMAIN
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py relevant_pages --target DOMAIN --limit 20
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py competitors_domain --target DOMAIN --limit 20 --max-rank-group 10
```

Use the results to answer:
- what non-branded service terms the site already owns
- whether visibility is mostly branded
- what pages already carry local intent
- who the true search competitors are

When place_id and credits allow, use Local Falcon to answer:
- whether the business only ranks near the office
- where visibility drops off across the service area
- which keyword deserves the main heat map screenshot or summary in the final audit

When NAP trust looks weak, run a quick branded citation pass to confirm:
- name consistency
- phone consistency
- city or area consistency
- category consistency on major listings

## Phase 7: Translate evidence into GBP decisions

Every recommendation should map to one of these buckets:
- category decision
- service coverage decision
- product and photo decision
- review and response decision
- posting and content decision
- areas-served decision
- website mirroring decision
- KPI and rollout decision

## Research output checklist

Before drafting the final document, have a compact working brief that includes:
- business summary
- website gaps
- GBP surface notes
- visible post, product, service, and area-served findings
- competitor notes
- category shortlist
- candidate service list
- mirroring matrix draft
- page gaps
- top trust assets
- top local opportunities
