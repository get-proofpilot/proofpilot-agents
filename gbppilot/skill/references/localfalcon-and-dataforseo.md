# Local Falcon and DataForSEO for GBPPilot

Use this reference when a GBP strategy or audit needs deeper evidence than a manual Maps pass.

## Why both matter

### Local Falcon answers
- How far from the business does it rank?
- Which competitors dominate the grid?
- Where does the business disappear?
- Does it only rank in the immediate office radius or one zip code?
- Which keyword-grid combinations are strongest or weakest?
- What public GBP proxy signals are visible through the scan layer?

### DataForSEO answers
- What service and city keywords have real demand?
- Which domains own the organic search surface?
- Which pages are carrying visibility?
- How branded versus non-branded is the current footprint?
- Which competitor domains overlap the most?

## Use them together

Good GBP work does not rely on only one of these.

Use Local Falcon for:
- geo-grid rank distribution
- competitor heat map pressure
- share of local voice and average rank
- proof of whether visibility collapses outside the core radius
- public GBP-supporting competitor context

Use DataForSEO for:
- local keyword demand
- ranked keyword snapshots
- competitor domains
- relevant pages
- position distribution and page-two opportunity checks

## Recommended workflow

1. Verify the live profile in Google Maps.
2. Use `searchForLocalFalconBusinessLocation` first to confirm the place_id and capture public profile proxy data such as rating, reviews, categories, SAB status, and map link.
3. Confirm the place_id if Local Falcon will be used.
4. Pull or review Local Falcon scan data for the client and core keywords.
5. Run at least one primary non-branded keyword heat map when the audit needs to prove geo relevance.
6. Run DataForSEO demand and competitor checks for the domain and seed service queries.
7. If NAP trust looks weak, run a quick branded citation check outside this toolset using web search.
8. Combine everything into one diagnosis:
   - map-pack strength
   - website support strength
   - page gaps
   - competitor gap
   - area-served gap
   - rollout priorities

## Local Falcon MCP notes

The preferred MCP server is `localfalcon` for discovery, place lookup, category context, and read-only reporting.

Practical execution rule learned in live use:
- use MCP first for `searchForLocalFalconBusinessLocation`, saved-report checks, and lightweight read operations
- if a paid scan is actually approved and `runLocalFalconScan` through MCP times out or behaves inconsistently, fall back to the direct helper script at `~/.hermes/skills/productivity/audit-pilot/scripts/local_falcon.py`
- the direct helper is more reliable for blocking workflows because it supports `wait_for_report()`, `rich_report()`, and `download_images()` in one flow
- after a paid scan, always save the `report_key`, summarize the metrics, and download the heatmap/grid PNGs so the next audit can reuse the scan instead of burning credits again

Persistence note:
- The MCP server is saved in `~/.hermes/config.yaml` under `mcp_servers.localfalcon`, which is user config and survives normal Hermes updates.
- A restore/check script is saved at `~/.hermes/skills/productivity/gbp-pilot/scripts/ensure_localfalcon_mcp.py`.
- If an update or migration ever strips the MCP block, rerun that script to restore it from `~/.hermes/secrets/local_falcon.env`.

Core useful tools include:
- `viewLocalFalconAccountInformation`
- `searchForLocalFalconBusinessLocation`
- `saveLocalFalconBusinessLocationToAccount`
- `listLocalFalconScanReports`
- `getLocalFalconReport`
- `runLocalFalconScan`
- `getLocalFalconCompetitorReport`

Use read-only tools first. Do not burn credits on new scans until:
- the place_id is confirmed
- the target keyword list is worth testing
- the user or workflow actually needs a new scan

## DataForSEO sequence

Start with:

```bash
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py ranked_keywords --target DOMAIN --limit 100
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py domain_rank_overview --target DOMAIN
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py relevant_pages --target DOMAIN --limit 20
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py competitors_domain --target DOMAIN --limit 20 --max-rank-group 10
```

For keyword demand support, use:

```bash
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py keywords_for_keywords --target "electrician mesa az" --location-code 2840
```

## Evidence labeling

When combining results, always label the source mentally even if the final client document reads smoothly:
- Local Falcon evidence
- Maps/browser evidence
- DataForSEO evidence
- website evidence
- citation evidence when used

Do not let one source overclaim what another source is needed to prove.
