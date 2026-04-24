---
name: proofpilot-seo-report-data-stack
description: >-
  Audit, wire, and collect the data stack for ProofPilot monthly SEO reports.
  Uses live integrations for Search Console, ClickUp, DataForSEO, and Local Falcon,
  while explicitly tracking gaps for GA4 metrics and first-party GBP insights.
---

# ProofPilot SEO Report Data Stack

## When to Use
Use this when Matthew asks:
- whether report data is fully automated
- to wire up the monthly SEO report stack
- what data is missing for automatic report generation
- to onboard a client into the reporting pipeline

## What This Skill Does
It creates a durable reporting layer under `~/pilot-report-data/` with:
- a client registry
- a stack audit output
- per-client monthly data snapshots

## Current Stack Philosophy
Separate the stack into 3 lanes:
1. *Live and usable now* , GSC, ClickUp, DataForSEO, Local Falcon heat maps
2. *Connected but incomplete* , Google Analytics admin/account visibility
3. *Still needs a better connection* , GA4 report metrics and first-party GBP performance insights

## Files
- `scripts/report_stack_common.py` , shared API helpers
- `scripts/bootstrap_clients.py` , creates/updates the client registry
- `scripts/audit_report_stack.py` , checks stack readiness and outputs audit JSON
- `scripts/collect_monthly_report_data.py` , pulls a client-month snapshot for report drafting
- `scripts/gbp_oauth_desktop.py` , starts the Desktop App OAuth flow for GBP, exchanges the returned localhost callback URL for a refresh token, and probes GBP account/location APIs
- `references/connection-plan.md` , best-practice recommendations for missing integrations

## Standard Workflow

### 1. Bootstrap the registry
Run:
`python3 ~/.hermes/skills/productivity/proofpilot-seo-report-data-stack/scripts/bootstrap_clients.py`

This writes:
`~/pilot-report-data/client_registry.json`

### 2. Audit the stack
Run:
`python3 ~/.hermes/skills/productivity/proofpilot-seo-report-data-stack/scripts/audit_report_stack.py`

This writes:
`~/pilot-report-data/audits/report_stack_audit_latest.json`

### 3. Pull a monthly client snapshot
Run:
`python3 ~/.hermes/skills/productivity/proofpilot-seo-report-data-stack/scripts/collect_monthly_report_data.py --client all-thingz-electric --start 2026-03-01 --end 2026-03-31`

This writes:
`~/pilot-report-data/monthly/{client}/{yyyy-mm}.json`

## Coverage Rules

### Search Console
Use as the primary source for:
- clicks
- impressions
- CTR
- average position
- top pages
- top queries

### ClickUp
Use for:
- work completed
- report task status
- recent deliverable movement
- owner/reviewer routing context

### DataForSEO
Use for:
- ranked keywords
- seed keyword research
- competitive keyword context

### Local Falcon
Use for:
- heat maps
- geo-grid rank visibility
- public GBP proxy details already exposed in a scan, like rating/review counts
- competitor pressure and share-of-local-voice context when a confirmed place_id exists

Persistence note:
- the native MCP server can be kept in `~/.hermes/config.yaml` under `mcp_servers.localfalcon`
- `~/.hermes/config.yaml` is user config and normally survives Hermes updates
- if the MCP block ever disappears, restore it with `python3 ~/.hermes/skills/productivity/gbp-pilot/scripts/ensure_localfalcon_mcp.py`

### GA4
Do *not* pretend GA4 report metrics are automated if only account-level admin access exists.
Mark it as partial until the pipeline can pull actual reporting metrics.

### GBP Insights
Split this into two layers:
- *public GBP data* , can often be proxied from Local Falcon / Maps / public search sources
- *owner insights* , calls, direction requests, website clicks, etc. This needs a first-party GBP connection or external reporting source

## Best-Practice Recommendation
For agency durability, the best end-state is:
- *GSC* via current Composio connection
- *GA4* via direct Google Analytics Data API using a dedicated service account with property access
- *Keywords* via existing DataForSEO direct router
- *GBP public + heat maps* via Local Falcon
- *GBP owner insights* via Business Profile Performance API or an AgencyAnalytics export layer
- *ClickUp* via direct API

### Credential format that actually fits this stack
- *GA4* should use a *Google Cloud Service Account JSON key*. Do not ask for a browser OAuth client, JavaScript origins, or redirect URIs for GA4 reporting.
- *GBP Performance* should preferably use an *OAuth Desktop App client JSON* plus a one-time consent flow to obtain a refresh token. This avoids unnecessary JavaScript-origin and web redirect configuration.
- Only use a *Web application* OAuth client for GBP if there is a real hosted web callback flow. Otherwise, the Desktop App client is simpler and less error-prone for Pilot's server-side automation.

### Exact GA4 wiring pattern that worked
1. Create the service account in Google Cloud and download the JSON key.
2. Grant the service account email access inside *Google Analytics Admin*, not just Google Cloud IAM.
3. Enable *both* APIs on the Google Cloud project:
   - `analyticsdata.googleapis.com`
   - `analyticsadmin.googleapis.com`
4. Store the JSON locally at:
   - `~/.hermes/secrets/ga4_service_account.json`
5. Verify in this order:
   - token generation works
   - Admin API `accountSummaries` returns property mappings
   - Data API `runReport` succeeds for target properties

### Exact OAuth posture that worked for GBP
- Keep the OAuth app as *External + Testing*.
- Do *not* publish the app for this workflow yet.
- Do *not* switch to Internal.
- Add the authenticating Google account as a *test user*.
- For Desktop App clients, no JavaScript origins or redirect URIs are needed.
- For the GBP OAuth app settings, *keep Publishing status = Testing* and *User type = External* during setup. Do not publish the app just to generate a refresh token for a small internal workflow.
- A workable consent pattern for Pilot is: generate a Desktop App auth URL with PKCE, have the user open it in the managing Google account, then copy the full failing `http://127.0.0.1:...` callback URL from the browser bar back into Slack. Pilot can exchange that callback URL for the refresh token without needing a hosted web callback.
- Add the actual Google account doing the GBP consent flow as a *Test user* on the OAuth consent screen before attempting auth.
- After exchanging the GBP callback URL, expect three separate API readiness checks:
  - `mybusinessaccountmanagement.googleapis.com` for listing GBP accounts
  - `mybusinessbusinessinformation.googleapis.com` for listing locations and location details
  - `businessprofileperformance.googleapis.com` for owner-insight metrics
- If Account Management or Business Information return `403 SERVICE_DISABLED`, those APIs still need to be enabled on the Google Cloud project.
- After enabling them, re-test. These APIs can move from `403 SERVICE_DISABLED` to `429 RESOURCE_EXHAUSTED` with quota limit `0`, which means auth is fine but the project still has no usable request budget.
- If Performance responds but shows quota `0` / `RESOURCE_EXHAUSTED`, the API is technically on but not yet usable for reporting until quota is available.
- There was no clean first-party fallback that bypassed the quota issue. The legacy `accounts.locations.reportInsights` route is deprecated and not a practical backup for this workflow. If GBP owner-insight quota stays blocked, the realistic fallback is public GBP proxy data via Local Falcon or a third-party reporting/export source such as AgencyAnalytics.
- For GA4 service account creation, the Google Cloud *Service account users role* and *Service account admins role* fields are optional and should usually be left blank for this workflow.
- After creating the GA4 service account key, the real access step happens inside *Google Analytics Admin*: add the *service account email* to each needed property or account with at least *Viewer* access, preferably *Analyst* if report needs expand.

## Verification Checklist
Before saying the stack is ready, confirm:
1. registry exists and includes the client
2. GSC query returns rows
3. ClickUp space is mapped
4. DataForSEO returns a summary for the client domain or seed keyword
5. Local Falcon account is live and credits remain
6. Heat map place_id exists for that client, or is explicitly marked missing
7. GA4 metric pipeline is either working or explicitly marked partial
8. GBP owner-insight pipeline is either working or explicitly marked missing

## Pitfalls
- Composio's Google Analytics toolkit can expose account/admin visibility without exposing the actual report metrics you need. In practice, `LIST_ACCOUNTS` and `GET_ACCOUNT` worked, but no usable `runReport`-style metric tool was available during the stack audit.
- A valid GA4 service-account JSON is not enough by itself for automatic property discovery. The Google Analytics *Admin API* (`analyticsadmin.googleapis.com`) must also be enabled on the Google Cloud project, or account-summary/property discovery returns `403 SERVICE_DISABLED` even when token generation works.
- Local Falcon readiness is not the same thing as every client having a mapped `place_id`
- Local Falcon location search can return `true_count > 0` with an empty `results` array. Do not treat that as a resolved match. The better fallback is scanning existing reports and extracting the `place_id` from a confirmed historical report.
- Public GBP data is not the same thing as owner GBP insights
- Report automation should output a *coverage map*, not a fake "all green" status
- One client may be fully heat-map ready while another is still missing the GBP/place mapping. Track readiness per client, not per tool globally.

## Output Standard
A good result gives Matthew three things:
- what is fully wired
- what is partial
- what exact connection should be added next, and why