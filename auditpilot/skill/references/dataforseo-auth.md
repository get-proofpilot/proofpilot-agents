# DataForSEO via direct API primary + Composio backup (Updated Apr 10 2026)

Two methods available. Prefer Method 1 (simpler, no dependencies).

## Method 1: Composio REST API (PREFERRED)

No pip installs needed. Direct curl calls.

### Keywords for Keywords (Live, synchronous)
Returns search volume, CPC, competition for seed keywords + related terms.
```bash
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/DATAFORSEO_GET_KW_GOOGLE_ADS_KW_FOR_KW_LIVE" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"arguments": {"keywords": ["electrician mesa az","plumber mesa az"], "location_code": 1014226, "language_code": "en", "sort_by": "search_volume"}, "entity_id": "***REDACTED_COMPOSIO_ENTITY***"}'
```

Response: `data.tasks[0].result[]` = array of keyword objects with:
- `keyword`, `search_volume`, `cpc`, `competition`, `competition_index`
- `monthly_searches[]` = [{month, year, search_volume}, ...]
- `high_top_of_page_bid`, `low_top_of_page_bid`

### Top Searches (Live)
```bash
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/DATAFORSEO_GET_DATAFORSEO_LABS_GOOGLE_TOP_SEARCHES_LIVE" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"arguments": {"location_code": 2840, "language_code": "en", "limit": 20, "order_by": ["keyword_info.search_volume,desc"]}, "entity_id": "***REDACTED_COMPOSIO_ENTITY***"}'
```

**Note:** `top_searches` and `bulk_keyword_difficulty` can reject some city-level `location_code` values with
`40501 Invalid Field: 'location_code'`. The shared router now auto-retries these two endpoints with `2840`
when a more local code is unsupported.

### Keyword Difficulty (Bulk, up to 1000 keywords)
```bash
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/DATAFORSEO_POST_DATAFORSEO_LABS_BULK_KEYWORD_DIFFICULTY_LIVE" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"arguments": {"keywords": ["electrician mesa az","plumber mesa az"], "location_code": 1014226, "language_code": "en"}, "entity_id": "***REDACTED_COMPOSIO_ENTITY***"}'
```

### SERP Analysis (Async: create task, then retrieve)
```bash
# Step 1: Create task
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/DATAFORSEO_CREATE_SERP_GOOGLE_ORGANIC_TASK_POST" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"arguments": {"tasks": [{"keyword": "electrician mesa az", "location_code": 1014226, "language_code": "en", "depth": 20}]}, "entity_id": "***REDACTED_COMPOSIO_ENTITY***"}'
# Returns task_id in response

# Step 2: Get results (wait ~5s)
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/DATAFORSEO_GET_SERP_GOOGLE_ORGANIC_TASK_ADVANCED_BY_ID" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"arguments": {"id": "TASK_ID_HERE"}, "entity_id": "***REDACTED_COMPOSIO_ENTITY***"}'
```

### All Working Slugs (Apr 2026)
- DATAFORSEO_GET_KW_GOOGLE_ADS_KW_FOR_KW_LIVE (keyword research)
- DATAFORSEO_GET_DATAFORSEO_LABS_GOOGLE_TOP_SEARCHES_LIVE (top searches)
- DATAFORSEO_POST_DATAFORSEO_LABS_BULK_KEYWORD_DIFFICULTY_LIVE (difficulty)
- DATAFORSEO_GET_KW_GOOGLE_KW_FOR_CATEGORY_LIVE (category keywords)
- DATAFORSEO_CREATE_SERP_GOOGLE_ORGANIC_TASK_POST (SERP create)
- DATAFORSEO_GET_SERP_GOOGLE_ORGANIC_TASK_ADVANCED_BY_ID (SERP results)
- DATAFORSEO_GET_GOOGLE_HIST_BULK_TRAFFIC_EST_LIVE (traffic estimates)

## Method 2: Composio Webhook (Legacy fallback)

Only use if Method 1 fails. Requires pip install composio-core.

```python
import os, time, requests
os.environ['COMPOSIO_API_KEY'] = 'ak_***REDACTED***'
from composio import ComposioToolSet

DFS_CONNECTION = "d69d7e6d-756f-4654-93ea-f981bb7528fc"
ENTITY = "***REDACTED_COMPOSIO_ENTITY***"

toolset = ComposioToolSet(entity_id=ENTITY)
r = requests.post("https://webhook.site/token")
wh = r.json()["uuid"]
toolset.execute_request(endpoint=f"https://webhook.site/{wh}", method="GET", connection_id=DFS_CONNECTION)
time.sleep(3)
r = requests.get(f"https://webhook.site/token/{wh}/requests?sorting=newest")
# Extract auth header from captured request
```

## DataForSEO Site Explorer Equivalents (AuditPilot research, Apr 10 2026)

If the goal is to replace SearchAtlas-style domain intelligence with DataForSEO,
these are the direct API equivalents to use.

### 1) Domain-level organic keywords portfolio
**Endpoint:** `POST /v3/dataforseo_labs/google/ranked_keywords/live`
- Returns the keywords any domain or page ranks for
- Includes search volume, CPC-related keyword data, SERP element data, and optional clickstream fields
- Supports filters like `ranked_serp_element.serp_item.rank_group <= 20`
- Supports sorting via `order_by`
- Best fit for: top 100 ranking keywords, page-2 keywords, quick wins, keyword portfolio exports

**Recommended usage:**
- target = root domain without `https://` or `www.`
- location_code = 2840 for national market sizing, or market-specific local code when needed
- limit = 100
- sort by highest-value signal available
  - preferred default: `ranked_serp_element.serp_item.etv,desc` for a top-100-by-traffic style export
  - safe fallback: `keyword_data.keyword_info.search_volume,desc`

### 2) Organic competitors table
**Endpoint:** `POST /v3/dataforseo_labs/google/competitors_domain/live`
- Returns competitor domains with organic and paid metrics
- Includes overlap-style metrics for keywords where both domains rank in the same SERP
- Best fit for: competitor table, traffic-value gap, shared-SERP competitive pressure

**Recommended usage:**
- sort by `metrics.organic.etv,desc` or `metrics.organic.count,desc`
- set `exclude_top_domains=true` to strip obvious junk like reddit, youtube, wikipedia when needed
- use `max_rank_group=10` or `20` to keep the result commercial and relevant
- post-filter the returned list to remove the target domain itself and any obvious publisher / medical / directory domains that are not true sales competitors

### 3) Position distribution by domain
**Endpoint:** `POST /v3/dataforseo_labs/google/domain_rank_overview/live`
- Returns domain ranking distribution buckets directly
- Organic fields include:
  - `pos_1`
  - `pos_2_3`
  - `pos_4_10`
  - `pos_11_20`
  - `pos_21_30` ... through `pos_91_100`
- Also returns organic `etv`, total ranked count, and `estimated_paid_traffic_cost`

**Best fit for:**
- position distribution charts
- striking-distance counts
- addressable-market capture framing

### 4) Top organic pages by domain
**Endpoint:** `POST /v3/dataforseo_labs/google/relevant_pages/live`
- Returns `page_address` plus rankings and traffic metrics for each page
- Page metrics include the same organic position buckets and organic `etv`
- Best fit for: top pages table, top service/location pages, page-level traffic opportunity

**Recommended usage:**
- sort by `metrics.organic.etv,desc`
- limit = 20
- use `historical_serp_mode=live`

### 5) Referring domains table
**Endpoint:** `POST /v3/backlinks/referring_domains/live`
- Returns detailed referring-domain data and backlink aggregates per referring domain
- Best fit for: authority-source table, quality-vs-quantity analysis, trust-gap comparisons

**Important:** requires active DataForSEO Backlinks subscription.

### 6) Anchor text distribution
**Endpoint:** `POST /v3/backlinks/anchors/live`
- Returns anchors used when linking to the specified website with aggregated backlink metrics for each anchor
- Best fit for: anchor distribution charts, over-optimized anchor detection, brand vs non-brand breakdown

**Important:** requires active DataForSEO Backlinks subscription.

### 7) Brand signal / AI-era authority proxy
There is no exact native `brand signal score` equivalent in DataForSEO Labs.
Use these AI Optimization endpoints as the closest replacement:

**Endpoints:**
- `POST /v3/ai_optimization/llm_mentions/aggregated_metrics/live`
- `POST /v3/ai_optimization/llm_mentions/top_domains/live`
- `POST /v3/ai_optimization/llm_mentions/search/live`

These provide metrics such as:
- mentions count
- impressions
- AI search volume
- most frequently mentioned domains / pages

**Best fit for:**
- brand visibility proxy
- AI citation footprint
- source-domain breadth in AI answers

### 8) Bonus support endpoints
- `POST /v3/dataforseo_labs/google/domain_intersection/live`
  - keyword overlap / gap vs competitor
- `POST /v3/backlinks/domain_intersection/live`
  - referring-domain gap / link-gap research
- `POST /v3/dataforseo_labs/google/keywords_for_site/live`
  - relevant keyword discovery for a site, good for expansion ideas but NOT a ranking portfolio endpoint

## Current Composio exposure gap

The DataForSEO API supports the endpoints above directly, but Composio currently exposes only a subset of them in our environment. Live tests and catalog review show:
- supported in the catalog / previously available via Composio: keyword ideas, historical bulk traffic estimation, SERP create/get, on-page crawl, some backlinks summary, and LLM top domains
- NOT currently exposed as Composio wrappers in our environment: ranked_keywords, competitors_domain, relevant_pages, domain_rank_overview, domain_intersection, referring_domains, anchors

**Updated Apr 10 2026:** after the DataForSEO whitelist change, Composio is usable again for
some overlapping endpoints. However, it still does not expose the core site-explorer style
Labs endpoints we need for ranked keywords, competitors_domain, relevant_pages,
domain_rank_overview, and domain_intersection.

For AuditPilot, the best setup is:
- direct DataForSEO = primary
- Composio = backup where wrappers exist and are proven working
- shared router = `python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py`

Recommended AuditPilot command set:
```bash
# Prospect keyword portfolio
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py \
  ranked_keywords --target prospect.com --limit 100

# Page-2 quick wins
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py \
  ranked_keywords --target prospect.com --limit 100 --filter-page-two

# Competitor table
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py \
  competitors_domain --target prospect.com --limit 20 --max-rank-group 10

# Top organic pages
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py \
  relevant_pages --target prospect.com --limit 20

# Position distribution / striking distance
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py \
  domain_rank_overview --target prospect.com
```

That means the clean long-term solution is still to call DataForSEO directly for the core
 domain-intelligence endpoints instead of waiting on Composio wrappers.

## Google Ads Equivalent Calculation
```python
total_ads_cost = sum(
    (item.get('search_volume', 0) or 0) * 0.03 * (item.get('cpc', 0) or 0)
    for item in keywords
)
```

## Pitfalls
- Positions are NATIONAL. Never claim local rankings from DataForSEO.
- CPC can be None. Always default to 0.
- Backlinks API NOT active on our subscription.
- DEAD SLUG: DATAFORSEO_KEYWORDS_DATA_GOOGLE_ADS_SEARCH_VOLUME_LIVE (returns 404)
- If any slug returns 404, search for updated name before failing:
  `curl -s "https://backend.composio.dev/api/v3/tools?search=DATAFORSEO+keyword&limit=20" -H "x-api-key: ak_***REDACTED***"`
