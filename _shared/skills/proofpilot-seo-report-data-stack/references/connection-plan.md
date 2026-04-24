# ProofPilot SEO Report Data Connection Plan

## Fully usable now

### 1. Google Search Console
Best current path: existing Composio v3 connection.

Use for:
- clicks
- impressions
- CTR
- average position
- top pages
- top queries

Why it is good enough now:
- already connected
- stable enough for month-over-month report pulls
- easy to automate per client once `site_url` is mapped

## 2. ClickUp
Best current path: direct ClickUp API.

Use for:
- work completed
- report task status
- owner/reviewer context
- deliverable movement

Why it is good enough now:
- faster and more predictable than wrapper-only flows
- good source for live operational truth

## 3. Keyword data
Best current path: direct DataForSEO router.

Use for:
- ranked keywords
- seed keyword research
- competitive keyword context
- page-two / striking-distance opportunities

Why it is good enough now:
- already wired
- direct router is better than relying only on Composio coverage

## 4. Heat maps
Best current path: Local Falcon API.

Use for:
- monthly geo-grid checks
- before/after local visibility snapshots
- public GBP proxy details exposed in scan results

Important caveat:
- a client is not really heat-map-ready until we have a confirmed `place_id` and a monthly keyword set

## Partially connected

### 5. Google Analytics
Current state:
- account visibility exists
- durable report-metric automation does not

Best next connection:
- direct Google Analytics Data API
- dedicated service account
- property-level access granted once per client/property

Why this is the best long-term move:
- avoids depending on a thin wrapper toolkit
- stable for cron use
- supports `runReport` directly
- cleaner for monthly reporting than browser or CSV hacks

What to store per client:
- `ga_property_id`
- organic-report metric set
- timezone
- default date comparison logic

## Still needed

### 6. GBP owner insights
Current state:
- public proxy data is possible
- first-party owner insights are not yet automated

What is missing:
- website clicks
- calls
- direction requests
- profile views and interactions

Best next connection:
Option A, preferred:
- Google Business Profile Performance API with an account that has location access

Option B, acceptable fallback:
- AgencyAnalytics or equivalent export source if the API setup is messy

Why this should stay separate from heat maps:
- heat maps answer local ranking visibility
- GBP owner insights answer profile interaction performance
- both matter, but they are different reporting layers

## Recommended end-state architecture

For each client, store:
- domain
- GSC `site_url`
- GA4 `property_id`
- ClickUp `space_id`
- Local Falcon `place_id`
- default heat-map keyword set
- primary service-area location

Then run one monthly collector that outputs:
1. GSC totals + top pages + top queries
2. GA4 organic sessions + engagement + conversions
3. ranked keyword snapshot
4. Local Falcon geo-grid summary
5. GBP owner-insight summary
6. ClickUp work-completed summary

## The practical truth

We already have enough to automate a strong first-pass SEO report.

What still blocks a truly complete hands-off version is not Search Console or ClickUp.
It is:
- GA4 metric access at the property-report level
- first-party GBP owner insights
- client-by-client heat-map place_id cleanup
