---
name: pilot-api-reference
description: >-
  Use when making ANY API call to Slack, ClickUp, Gmail, Google Calendar,
  Google Search Console, Calendly, DataForSEO, Firecrawl, Fireflies, or
  Google Drive. Contains exact curl commands, token/credential values,
  Composio tool slugs, response parsing patterns, and field-level pitfalls.
  Critical for cron jobs and any session that queries or writes to external
  systems. Includes multi-channel fetch patterns and cross-sandbox pitfalls.
---

# Pilot API Reference

All API calls should be made via the terminal tool using curl.

### Critical: Multi-Channel Fetch Pattern (execute_code vs terminal)
When fetching data from multiple API endpoints (e.g., scanning 10 Slack channels), `terminal()` inside `execute_code` can silently fail to write `curl -o` output files — the command reports success but files don't appear on disk. This was confirmed Apr 3, 2026.

**Correct pattern for multi-endpoint fetches:**
1. Use the **direct `terminal` tool** (not execute_code's `terminal()`) with a bash loop:
```bash
TOKEN="***REDACTED***"
for pair in "name1:CHAN1" "name2:CHAN2" "name3:CHAN3"; do
  name="${pair%%:*}"
  chan="${pair##*:}"
  curl -s "https://slack.com/api/conversations.history?channel=${chan}&limit=10" \
    -H "Authorization: Bearer $TOKEN" -o "/tmp/slack_${name}.json"
done
```
2. Then parse all files with a **separate** `terminal` call running a python3 script:
```bash
python3 /tmp/parse_all.py
```
3. Write the parse script to disk first via `write_file`, then execute it.

**Why this matters:** Cron jobs that scan multiple channels or APIs in a loop will fail silently if they use execute_code's terminal() for curl file output. Always use the direct terminal tool for multi-file curl operations.

## Slack API
Token: Use the environment variable SLACK_BOT_TOKEN, or this token:
xoxb-***REDACTED***

### Slack User IDs (verified Apr 3 2026)
Matthew=U097JMZ2M2A, Marcos=U097N0PSVLJ, Katelyn=U0AKNBHEG8L, Kevin=U09CQS8HMEG,
Hammad=U0AM5T0CEPQ, Anthony Aguilar=U0AC124JXQ9, Jo Paula=U098XM223CZ, Rachalle=U0ACUE8MS4A,
John=U0AQPMMRZ4J, Charles=U0AMMT31A84. Viktor=U0AL7SW3JKW (bot), Pilot=U0AP93XPHFV (bot).
Anthony Celestino=U08UK1LUKSM (AMPED lead buyer), Charlie=U09D4PU8CS1 (Cedar Gold content),
Kyle=U0AGJVDJ9Q8 (video editor).
WARNING: Old IDs (U08TDUQF4B9, U09126M46QH, U0965NNF59C, U097TPL5H25,
U09G71SLS5U, U09FDK2RDJM) are DEAD/user_not_found. Do NOT use them.

### Channel IDs (full workspace, 23 monitored channels)
Internal: pm-team=C0AFPA546F3, general=C097JMZ91RC, approvals=C09FUEHE2A3, seo-team=C097JN65KAS
Clients: cedar-gold=C0AC89HP4N4, heropm=C0AM6EZ2CBX, iss=C09FD47CERF, pce=C097JNC232A,
  saiyan=C097NGURDB6, dolce=C097NGVQZB6, wild-within=C0AKRPXLVV3, trading-academy=C0AKWJFFHLL,
  adam-levinstein=C097NH0BFBN, all-thingz=C097NGWLXQC, alpha-pm=C0ALT4X97GT,
  laf-counseling=C0AD4NA2RS8, powerroute=C097JNANU4W, house-dental=C0AQ0ECRMTK
AMPED: buyer-leads=C0AGVHV1AA1, lead-gen=C0ACGKRB272, new-leads=C0AFC562UHM
Specialized: cedar-content=C0AMY95FJTY, seo-reports=C0AMLUPJENM
Matthew DM: D0AQ9PB64L8

Read channel messages:
```bash
curl -s "https://slack.com/api/conversations.history?channel=CHANNEL_ID&limit=20" -H "Authorization: Bearer ***REDACTED******REDACTED***"
```

Post a message (simple):
```bash
curl -s -X POST "https://slack.com/api/chat.postMessage" -H "Authorization: Bearer ***REDACTED******REDACTED***" -H "Content-Type: application/json" -d '{"channel":"CHANNEL_ID","text":"message"}'
```

### Slack Post Pitfall: Shell Escaping
When posting messages with unicode (bullet chars, em dashes), newlines, parentheses, or special characters, inline `-d '{...}'` breaks with bash syntax errors. Always use the file method for complex messages:
```python
# In execute_code:
from hermes_tools import terminal, write_file
import json
payload = {"channel": "CHANNEL_ID", "text": "complex message with \u2022 bullets\nand newlines"}
write_file("/tmp/slack_payload.json", json.dumps(payload))
terminal('curl -s -X POST "https://slack.com/api/chat.postMessage" -H "Authorization: Bearer ***REDACTED***" -H "Content-Type: application/json" -d @/tmp/slack_payload.json')
```
Rule of thumb: if the message has any formatting (emoji, bullets, newlines, unicode), write to file first.

### Slack Text Pitfall: hash-prefixed IDs can render as color tokens in Slack rich text
Confirmed Apr 14 2026 during heartbeat delivery for a new AMPED lead. A DM line like:
- `active C-10 licenses #379795 / #606030`
was accepted by `chat.postMessage`, but Slack's rendered rich-text blocks interpreted `#379795` and `#606030` as color values instead of plain license numbers.

Reliable fix:
- Do NOT prefix contractor license numbers, task IDs, or other numeric identifiers with `#` in normal Slack prose unless you want color-token behavior.
- Prefer one of these instead:
  - `license 379795 and 606030`
  - ``licenses `379795` and `606030``` 
  - `license nos. 379795 / 606030`

Use this whenever posting California contractor licenses, ClickUp numeric IDs, or any six-digit identifier that could resemble a hex color.
### Slack Post Pitfall: Cross-Tool Filesystem Isolation (Cron Jobs)
Files created in `execute_code` are NOT visible to `terminal` (separate sandboxes). If you build a JSON payload in `execute_code` and then try `curl -d @/tmp/payload.json` in `terminal`, curl fails with "error encountered when reading a file." Two correct patterns:

### Preferred helper: slack_post.py
Use `~/.hermes/skills/productivity/pilot-api-reference/scripts/slack_post.py` for cron deliveries and structured Slack sends. It supports:
- plain text
- `--text-file /tmp/message.txt`
- `--blocks-file /tmp/blocks.json --fallback-text "..."`
- `--payload-file /tmp/payload.json`
- `--thread-ts TS`
- `--replace-ts TS` for `chat.update`
- `--reply-broadcast` when a thread reply should also surface in channel

Pair it with these helpers when the Slack message itself matters:
- `slack_blocks.py` for reusable Block Kit builders and collapse estimation
- `pilot_message_templates.py` for canonical Viktor-style layouts like PM digests, quiet heads-ups, lead cards, and morning briefings
- `render_pilot_message.py` to turn structured JSON input into ready-to-post Block Kit for those canonical layouts
- `send_threaded_reply.py` for Viktor's summary-in-channel, detail-in-thread pattern
- `update_existing_message.py` for placeholder → done updates
- `react_to_message.py` for low-noise ack/done reactions
- `upload_and_share_file.py` for file upload + permalink share flows

This is the easiest way to send polished coworker-style Slack messages from any Hermes environment.

### Slack Post Pitfall: helper can fail with `invalid_auth` even when the raw bot token still works
Confirmed Apr 13 2026 during heartbeat recovery. `slack_post.py` returned Slack `{"ok": false, "error": "invalid_auth"}` three times from the cron sandbox, but a direct `curl` call to `chat.postMessage` using the canonical bot token succeeded immediately and delivered the DM.

Reliable fallback:
```bash
# 1. Write payload to a file first
cat >/tmp/slack_payload.json <<'EOF'
{"channel":"D0AQ9PB64L8","text":"Your message here"}
EOF

# 2. Post directly with curl using the bot token
curl -s -X POST "https://slack.com/api/chat.postMessage" \
  -H "Authorization: Bearer ***REDACTED******REDACTED***" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d @/tmp/slack_payload.json
```

Rule: if `slack_post.py` fails with `invalid_auth`, do not keep treating the delivery as failed. Fall back immediately to direct `chat.postMessage`, then verify via `conversations.history` on the destination channel/DM.

**Pattern 1 (preferred for crons): Single Python script via `terminal`**
Write a self-contained .py script with `write_file`, then run it via `terminal`. The script uses `urllib.request` to post directly, no curl needed:
```python
# Written via write_file to /tmp/post_slack.py, then run via terminal("python3 /tmp/post_slack.py")
import json, urllib.request
message = "your formatted message here"
payload = json.dumps({"channel": "CHANNEL_ID", "text": message})
req = urllib.request.Request(
    "https://slack.com/api/chat.postMessage",
    data=payload.encode("utf-8"),
    headers={"Authorization": "Bearer ***REDACTED***", "Content-Type": "application/json"}
)
resp = urllib.request.urlopen(req)
result = json.loads(resp.read().decode())
print("ok:", result.get("ok"), "ts:", result.get("ts"))
```

**Pattern 2: `write_file` + `terminal curl`**
Use the `write_file` tool (not `execute_code`) to create the payload file, then `terminal` can see it:
```
write_file("/tmp/slack_payload.json", json.dumps(payload))  # via the write_file tool
terminal('curl -s -X POST ... -d @/tmp/slack_payload.json')  # via the terminal tool
```

### Slack Read Pitfall: JSON Parsing
Slack API responses contain control characters (tabs, raw newlines inside message text) that break `json.loads()` with default settings. Always parse with `json.loads(output, strict=False)`. Note: `json_parse()` from hermes_tools is NOT available inside `execute_code` scripts — use `json.loads(s, strict=False)` directly. For channels with long messages (Cedar Gold, HEROPM), even `limit=15` can produce responses that truncate in execute_code's 50KB stdout cap — use `limit=10` or lower, or write a standalone script and run via `terminal()`.

### Slack Read Pitfall: curl Pipe + Heredoc Eats the Response
This shell pattern looks valid but fails:
```bash
curl -s "https://slack.com/api/conversations.history?..." | python3 - <<'PY'
import sys
raw = sys.stdin.read()
PY
```
When you use `python3 - <<'PY'`, the heredoc itself becomes Python's stdin, so the piped `curl` response never reaches `sys.stdin.read()`. Result: empty input and JSON parse errors like `Expecting value: line 1 column 1 (char 0)`.

**Correct pattern:** save the API response to a file first, then read the file in Python:
```bash
curl -s "https://slack.com/api/conversations.history?..." \
  -H "Authorization: Bearer ***REDACTED***" -o /tmp/slack_resp.json
python3 - <<'PY'
import json
raw = open('/tmp/slack_resp.json').read()
data = json.loads(raw, strict=False)
print(data.get('ok'), len(data.get('messages', [])))
PY
```
Use this file-first pattern for Slack, Gmail, ClickUp, and any other JSON API response you want to inspect with an inline Python heredoc.

Check thread replies (verify if a message was answered):
```bash
curl -s "https://slack.com/api/conversations.replies?channel=CHANNEL_ID&ts=MESSAGE_TS&limit=5" -H "Authorization: Bearer ***REDACTED******REDACTED***"
```
Note: Returns `thread_not_found` error for top-level messages with no replies. This confirms the message is unanswered. Alternatively, check `reply_count` field in `conversations.history` results (0 = no replies).

### Thread Timestamp Pitfall (Multi-Channel Scan Pattern)
When building a scan script that collects messages from `conversations.history` and then follows up with `conversations.replies`, you MUST store the raw Slack `ts` field (e.g., `1775169180.330719`) in your scan results. If you convert timestamps to datetime strings for display, keep the original `ts` or `thread_ts` as a separate field. The `conversations.replies` endpoint requires the exact Slack timestamp format. Converting to datetime and back introduces floating-point drift that causes `thread_not_found` errors.

List channel members:
```bash
curl -s "https://slack.com/api/conversations.members?channel=CHANNEL_ID" -H "Authorization: Bearer ***REDACTED******REDACTED***"
```

## Composio API (Gmail, GSC, Calendar, Drive, Sheets, Docs, ClickUp, Calendly, DataForSEO)
API Key: ak_***REDACTED***
Entity ID: ***REDACTED_COMPOSIO_ENTITY***

Execute any tool:
```bash
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/TOOL_SLUG" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"arguments": {ARGS}, "entity_id": "***REDACTED_COMPOSIO_ENTITY***"}'
```

Search for tools:
```bash
curl -s "https://backend.composio.dev/api/v3/tools?search=QUERY&limit=10" \
  -H "x-api-key: ak_***REDACTED***"
```

### Key Tool Slugs

Gmail:
- GMAIL_FETCH_EMAILS: args: {"max_results": 20, "query": "is:unread newer_than:1d"}
- GMAIL_SEND_EMAIL: args: {"recipient_email": "email", "subject": "subj", "body": "text"}
  - PITFALL: The field is `recipient_email`, NOT `to`. Using `to` returns "missing: {'recipient_email'}" error. Confirmed Apr 2026.
  - HARD RULE (Apr 17 2026): For Pilot, direct terminal calls to `GMAIL_SEND_EMAIL` are now intentionally blocked in the gateway approval guard. Do NOT send email by calling the Composio endpoint directly from a normal Pilot session.
  - REQUIRED SEND PATH: (1) post the email draft for Slack approval, then (2) after Matthew approves it, send only through `python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/send_approved_email.py --approval-id APPROVAL_ID`.
  - The wrapper enforces: correct approval type (`send_email`), approval must be from Matthew (`U097JMZ2M2A`), and each approval can only be used once.
  - CRITICAL CLIENT-EMAIL RULE: Never send a test message to a client to validate the send path. If delivery needs verification, use a draft, fetch/list call, or send the test to an internal address only. Do not use the client's inbox as the test surface.
  - PRACTICAL FALLBACK (Apr 17 2026): if the local `google-workspace` skill is not authenticated (`setup.py --check` returns `NOT_AUTHENTICATED`) and `himalaya` is unavailable, you can still send an approved one-off email through Composio Gmail as long as the connected Gmail account is ACTIVE under the ProofPilot entity. Reliable pattern:
    1. Confirm Gmail connected accounts via `GET /api/v3.1/connected_accounts?toolkit_slugs=gmail&limit=20`
    2. Post the draft for Slack approval and capture the `approval_id`
    3. Send only with `send_approved_email.py --approval-id ...`
    4. Report back using the verified subject + timestamp, not just the send API success response
  - Confirmed on an AMPED no-show follow-up: Composio send returned a message id/threadId immediately, and fetch verification showed the sent message in Matthew's mailbox from `Matthew Anderson <matthew@getproofpilot.com>`.
- GMAIL_CREATE_EMAIL_DRAFT: args: {"recipient_email": "email", "subject": "subj", "body": "text"}
  - PITFALL: Despite older examples using `to`, the live tool can reject draft creation with `Following fields are missing: {'recipient_email'}`. Safe pattern is to pass `recipient_email`, and optionally include `to` too for compatibility. Confirmed Apr 16 2026.

### Gmail Fetch Pitfalls
- **Response is HUGE**: 30 emails = ~3.6MB JSON. The `execute_code` 50KB stdout cap truncates it, and `read_file` prepends line numbers that corrupt JSON parsing.
- **Correct approach**: Use `terminal` with `curl -o /tmp/gmail_full.json` to save to disk, then parse with `terminal('python3 << PYEOF ... PYEOF')` heredoc that reads the file directly.
- **Response structure**: `data.messages[]` array. Each message has: `sender` (NOT `from`), `subject`, `messageText`, `messageTimestamp` (ISO8601), `messageId`, `threadId`, `labelIds`, `payload`, `preview` (dict with `body` and `subject` keys), `to`, `attachmentList`.
- **Field name gotcha**: The sender field is `sender`, NOT `from`. Using `m.get("from")` returns None.
- **Parsing**: Always use `json.loads(content, strict=False)` since email bodies contain control characters.
- **Recommended pattern for email digest cron**:
```bash
# Step 1: Fetch to disk
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/GMAIL_FETCH_EMAILS" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"arguments": {"max_results": 30, "query": "is:inbox newer_than:1d"}, "entity_id": "***REDACTED_COMPOSIO_ENTITY***"}' \
  -o /tmp/gmail_full.json
```
```python
# Step 2: Parse with terminal python3 heredoc (NOT execute_code, NOT read_file)
import json
with open('/tmp/gmail_full.json') as f:
    data = json.loads(f.read(), strict=False)
msgs = data['data']['messages']
for m in msgs:
    print(f"{m['messageTimestamp']} | {m['sender'][:50]} | {m['subject'][:70]}")
```

Google Calendar:
- GOOGLECALENDAR_EVENTS_LIST: args: {"calendar_id": "primary", "timeMin": "2026-04-04T00:00:00-07:00", "timeMax": "2026-04-04T23:59:59-07:00", "maxResults": 15}
  - Response path: data.items[] (each has start.dateTime, end.dateTime, summary, status)
  - PITFALL: GOOGLECALENDAR_FIND_EVENT and GOOGLECALENDAR_FIND_EVENTS both return "Tool not found" as of Apr 2026. Only EVENTS_LIST works.
  - Args are camelCase: timeMin, timeMax, maxResults (not time_min, time_max)
  - calendar_id: "primary" is REQUIRED or you get stale/wrong events
  - CRON PITFALL (Apr 2026): direct Python urllib POSTs to the Composio v3 calendar execute endpoint can return HTTP 403 from cron/sandbox contexts even when the exact same request works via curl. Reliable pattern: call GOOGLECALENDAR_EVENTS_LIST with terminal + curl, save the JSON to /tmp, then parse it in a separate Python step. Treat curl as primary for heartbeat/calendar scans, urllib as non-authoritative fallback.
  - RECURRENCE PITFALL (Apr 2026): EVENTS_LIST can still return recurring-series artifacts that look outside your requested window. Confirmed Apr 12 2026: a Feb 3 recurring Saiyan meeting showed up in a next-48h fetch. Do not trust the raw array blindly. Post-filter locally on parsed start/end datetimes before deciding what is upcoming or recently ended.

Google Search Console:
- GOOGLE_SEARCH_CONSOLE_LIST_SITES: args: {}
  - Response path: data.response_data.siteEntry[] (each has permissionLevel, siteUrl)
- GOOGLE_SEARCH_CONSOLE_SEARCH_ANALYTICS_QUERY: args: {"site_url": "https://site.com/", "start_date": "2026-03-01", "end_date": "2026-03-28", "dimensions": ["query"], "row_limit": 20}
  - Response path: data.response_data.rows[] (NOT data.rows or data.data.rows)
  - Each row has: clicks, impressions, ctr, position, keys[] (dimension values)
  - PITFALL: Narrow date ranges (e.g. last 7 days) may return empty rows even when data exists. Use full-month ranges (e.g. "2026-03-01" to "2026-03-31") for reliable results. GSC data has a 2-3 day lag.
  - For MoM comparison: query current month and previous month separately, sum clicks/impressions across rows

Calendly:
- CALENDLY_LIST_EVENTS: args: {"user": "USER_URI", "organization": "ORG_URI", "min_start_time": "ISO8601", "count": 10, "status": "active"}
  - REQUIRES user + organization args or returns 400 "At least one of organization, group or user must be filled"
  - Known values (Matthew): user = "https://api.calendly.com/users/5c324794-9144-4ef4-b786-9d1bf32b9e12", organization = "https://api.calendly.com/organizations/c06ba6ea-f6cf-489e-93b1-fdf891f4d55e"
  - Response path: data.collection[] (each event has uri, name, start_time, end_time, status, invitees_counter)
  - If user/org URIs are unknown, call CALENDLY_GET_CURRENT_USER first. Response path: data.resource.uri and data.resource.current_organization
  - TIMEZONE PITFALL (Apr 14 2026): Do not trust the human-readable time in the Calendly notification email subject as your canonical meeting time. The email can reflect a different timezone/view than the heartbeat's Arizona framing. Use `CALENDLY_LIST_EVENTS.start_time` as the source of truth, then convert that ISO8601 UTC timestamp to Arizona/local time in code before deciding urgency or composing a call-prep message. Confirmed on Daniel Kerber: the email subject said `01:00pm Fri, Apr 17, 2026`, while the API returned `2026-04-17T17:00:00Z`, which is `10:00 AM` Arizona.
- CALENDLY_LIST_EVENT_INVITEES: args: {"uuid": "EVENT_UUID"}
  - IMPORTANT: The argument key is "uuid", NOT "event_uuid". Using "event_uuid" returns "missing: {'uuid'}"
  - Extract EVENT_UUID from event URI (last path segment of event.uri)
  - Response path: data.collection[] (each invitee has name, email, status, timezone, questions_and_answers)
  - CRON PITFALL (Apr 2026): standalone Python `urllib.request` POSTs to the Composio v3 invitees endpoint can return HTTP 403 from cron/sandbox contexts even when the same payload succeeds via `curl`. Reliable pattern: write the JSON payload to a temp file, call `curl -s -X POST ... -d @payload.json -o /tmp/calendly_invitees.json`, then parse the saved response in a second step.
- CALENDLY_GET_CURRENT_USER: args: {}
  - Returns Matthew's user URI and org URI. Response path: data.resource.uri and data.resource.current_organization
  - Only needed if the hardcoded URIs above stop working

Google Drive:
- GOOGLEDRIVE_LIST_FILES: args: {}
  - To list files in a specific folder: args: {"q": "'FOLDER_ID' in parents"}
- GOOGLEDRIVE_FIND_FILE: args: {"search_query": "filename", "include_team_drives": true}
  - Returns full metadata including id, name, mimeType, capabilities
- GOOGLEDRIVE_DOWNLOAD_FILE: args: {"file_id": "ID"}
- GOOGLEDRIVE_COPY_FILE: args: {"file_id": "ID"}

### Google Drive Pitfalls (Team/Shared Drives)
- GOOGLEDRIVE_LIST_FILES with `q` parameter CAN list files on team drives
- GOOGLEDRIVE_FIND_FILE with `include_team_drives: true` CAN find files on team drives
- BUT GOOGLEDRIVE_DOWNLOAD_FILE and GOOGLEDRIVE_PARSE_FILE FAIL with "File not found" on team drive files, even with include_team_drives flag
- The Composio service account has metadata access but NOT download access to team drive files
- Workaround: ask user to share files directly, make them publicly accessible, or copy-paste content
- For Google Docs (not raw files), use GOOGLEDOCS_GET_DOCUMENT_BY_ID (field: `id`, NOT `document_id`). Response body is at `data.response_data.body.content` (NOT `data.body.content`)
- The old GOOGLEDRIVE_LIST_FILES_IN_A_FOLDER and GOOGLEDRIVE_GET_FILE_CONTENT slugs are DEPRECATED and return "Tool not found"

Google Sheets:
- GOOGLESHEETS_GET_SPREADSHEET is not reliable here. Prefer these instead:
- GOOGLESHEETS_GET_SPREADSHEET_INFO: args: {"spreadsheet_id": "ID"}
  - Reliable for listing current tabs/sheet IDs before writes. Response path: data.response_data.sheets[].properties.{title,sheetId,index}
  - Use this first when restructuring a workbook or when you may need to delete an old tab later
- GOOGLESHEETS_BATCH_GET: args: {"spreadsheet_id": "ID", "ranges": ["Sheet1!A1:N100"]}
  - Reliable for reading cell values from one or more tabs. Response path: data.valueRanges[].values
  - IMPORTANT: for tab names with spaces or ampersands, the returned `range` may be quoted, e.g. `'Electricians & Plumbers'!A1:N100`. Strip outer single quotes when parsing the tab name.
- GOOGLESHEETS_ADD_SHEET: args: {"spreadsheetId": "ID", "properties": {"title": "Tab Name", "gridProperties": {"rowCount": 1000, "columnCount": 13}}}
  - IMPORTANT: uses camelCase `spreadsheetId`, not `spreadsheet_id`
  - `properties.title` creates the tab name
  - `properties.tabColorStyle.rgbColor` works for tab colors
  - `properties.gridProperties.frozenRowCount` works for freezing the header row on creation
- GOOGLESHEETS_CLEAR_VALUES: args: {"spreadsheet_id": "ID", "range": "Tab Name!A:Z"}
  - Best pattern before rewriting an entire tab so old rows do not remain below the new dataset
- GOOGLESHEETS_BATCH_UPDATE: args: {"spreadsheet_id": "ID", "sheet_name": "Tab Name", "first_cell_location": "A1", "valueInputOption": "RAW", "values": [[...], [...]]}
  - Reliable for writing a full tab in one call after creating it
  - IMPORTANT: this tool uses snake_case `spreadsheet_id`, unlike ADD_SHEET
  - Include header row in `values` when building a fresh tab
  - `first_cell_location: "A1"` overwrites from the top-left; omitting it appends instead
- GOOGLESHEETS_DELETE_SHEET: args: {"spreadsheetId": "ID", "sheet_id": 123456789}
  - Reliable cleanup step for removing obsolete tabs after a workbook reorganization
  - Requires numeric `sheet_id`, so fetch it from GET_SPREADSHEET_INFO first
- Recommended workbook-restructure flow:
  1. GET_SPREADSHEET_INFO to inspect current tabs and IDs
  2. BATCH_GET or public CSV export to read current data
  3. Build transformed datasets locally
  4. ADD_SHEET for missing tabs
  5. CLEAR_VALUES on target tabs
  6. BATCH_UPDATE each tab with full header + rows
  7. DELETE_SHEET for obsolete tabs if needed
  8. BATCH_GET sample ranges to verify row counts, headers, and column placement
- Styling tools that work reliably for branded Google Sheets:
  - GOOGLESHEETS_FORMAT_CELL: args include `spreadsheet_id`, `worksheet_id`, 0-based start/end row and column indexes, plus background RGB (`red`,`green`,`blue`) and basic text flags (`bold`,`italic`,`underline`,`strikethrough`,`fontSize`)
  - IMPORTANT LIMITATION: FORMAT_CELL does NOT expose text color, alignment, wrap, or font family. For ProofPilot-style styling, use light backgrounds so default dark text stays readable. Good pattern: neon green title row, light gray subtitle row, pale blue header row, pale green highlight columns.
  - GOOGLESHEETS_UPDATE_SHEET_PROPERTIES can set `index`, `tabColorStyle`, `gridProperties.frozenRowCount`, `gridProperties.frozenColumnCount`, and `gridProperties.hideGridlines` in one call. Field mask example: `index,tabColorStyle,gridProperties.frozenRowCount,gridProperties.frozenColumnCount,gridProperties.hideGridlines`
  - Reliable branded-sheet workflow:
    1. BATCH_GET current tab values
    2. Rebuild each tab with 3 top rows: branded title, subtitle, and focus/summary line
    3. BATCH_UPDATE rewritten values back into the tab
    4. UPDATE_SHEET_PROPERTIES for tab color, row/column freeze, and hidden gridlines
    5. FORMAT_CELL title row, subtitle row, summary row, header row, and key metric columns
    6. Use browser_vision on the live sheet for final visual QA if needed
  - Quota pitfall: repeated FORMAT_CELL calls can hit Google Sheets per-minute read quotas. Add retry/backoff for 429 errors and keep formatting calls focused on banner rows plus key columns instead of every single row when possible.
- Verification trick for public sheets: export each gid directly with no auth
  - Pattern: `https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv&gid=GID`
  - Useful for row counts and confirming headers after tab creation
- Python pitfall: Composio Google Sheets requests that succeed via terminal `curl` may return HTTP 403 when sent with `urllib.request` from a standalone Python script. If this happens, call the same endpoint from Python via `subprocess.run([...curl...])` instead of urllib. Confirmed Apr 11 2026 while writing multiple lead tabs into one live sheet.

Google Docs:
- GOOGLEDOCS_GET_DOCUMENT_BY_ID: args: {"id": "DOC_ID"} (NOT "document_id")
  - Response path: data.response_data.body.content[] (NOT data.body.content)
  - Parse paragraphs: element["paragraph"]["elements"][i]["textRun"]["content"]
  - Parse tables: element["table"]["tableRows"][i]["tableCells"][j]["content"]
  - DEAD SLUG: GOOGLEDOCS_GET_DOCUMENT returns "Tool not found". Always use _BY_ID variant.
- GOOGLEDOCS_CREATE_DOCUMENT_MARKDOWN: args: {"markdown_text": "...", "title": "...", "folder_id": "..."}

### Google Docs Fallback: Public Export (No Auth Needed)
When Composio returns permissions errors for shared docs you don't own, use the Google Docs export endpoint directly:
```bash
curl -sL "https://docs.google.com/document/d/DOC_ID/export?format=txt" -o /tmp/doc.txt
```
This works for any doc with "anyone with the link" sharing enabled. No auth needed. Returns plain text (UTF-8 with BOM). Also supports `format=pdf`, `format=docx`, `format=html`.
PITFALL: The browser tool's `page.goto()` fails on export URLs with "Download is starting" error. Always use curl in terminal, not the browser tool.

### DataForSEO (Verified Apr 10 2026)

Keyword Research via Composio (LIVE, synchronous):
```bash
# Keywords for Keywords (search volume + CPC + competition for seed keywords)
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/DATAFORSEO_GET_KW_GOOGLE_ADS_KW_FOR_KW_LIVE" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"arguments": {"keywords": ["electrician mesa az"], "location_code": 1014226, "language_code": "en", "sort_by": "search_volume"}, "entity_id": "***REDACTED_COMPOSIO_ENTITY***"}'
```

### Direct DataForSEO API for Site Explorer Equivalents (preferred for AuditPilot / StrategyPilot)

**Use direct DataForSEO API, not Composio, for the site-explorer style domain intelligence layer.**
Composio currently does NOT expose the core DataForSEO Labs endpoints we need for:
- ranked keywords
- competitors by domain
- relevant pages
- domain rank overview
- domain intersection
- backlinks referring domains
- backlinks anchors

Credentials are stored in:
- `~/.hermes/secrets/dataforseo_direct.env`

Preferred router script:
- `~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py`

Lower-level direct helper:
- `~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_direct.py`

Routing policy:
- **Direct DataForSEO is primary** for SearchAtlas-style domain intelligence and any endpoint where direct API is cleaner or richer
- **Composio is backup** where an overlapping wrapper exists and succeeds
- For endpoints not exposed in Composio, the router stays on direct automatically

Example commands:
```bash
# Domain-level position distribution + ETV + paid-equivalent traffic cost
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py \
  domain_rank_overview --target orkin.com

# Top ranking keywords for a domain, sorted by estimated traffic value by default
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py \
  ranked_keywords --target orkin.com --limit 100

# Page-2 / striking-distance keywords only
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py \
  ranked_keywords --target orkin.com --limit 100 --filter-page-two

# Organic competitors table
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py \
  competitors_domain --target orkin.com --limit 20

# Top organic pages by estimated traffic value
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py \
  relevant_pages --target orkin.com --limit 20

# Historical traffic with direct primary, Composio fallback available
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py \
  historical_traffic --target orkin.com

# Keyword ideas with direct primary, Composio fallback available
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py \
  keywords_for_keywords --target "pest control phoenix" --location-code 1014226

# Top searches, with automatic fallback to 2840 if a local Labs location code is unsupported
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py \
  top_searches --target seed --location-code 1014226

# Bulk keyword difficulty, with automatic fallback to 2840 if a local Labs location code is unsupported
python3 ~/.hermes/skills/productivity/pilot-api-reference/scripts/dataforseo_router.py \
  bulk_keyword_difficulty --target seed --keywords "pest control phoenix,bed bug exterminator phoenix" --location-code 1014226
```

Direct API smoke tests confirmed these work on Matthew's DataForSEO account:
- `/v3/dataforseo_labs/google/ranked_keywords/live`
- `/v3/dataforseo_labs/google/competitors_domain/live`
- `/v3/dataforseo_labs/google/relevant_pages/live`
- `/v3/dataforseo_labs/google/domain_rank_overview/live`
- `/v3/dataforseo_labs/google/domain_intersection/live`
- `/v3/keywords_data/google_ads/keywords_for_keywords/live`
- `/v3/dataforseo_labs/google/bulk_keyword_difficulty/live`
- `/v3/dataforseo_labs/google/historical_bulk_traffic_estimation/live`
- `/v3/serp/google/organic/live/advanced`
- `/v3/on_page/task_post` + `/v3/on_page/summary/{id}`

Composio backup re-test status on Matthew's DataForSEO account:
- working after whitelist change for overlapping endpoints like `historical_traffic`, `keywords_for_keywords`, `bulk_keyword_difficulty`, `serp` create/get, and `on_page` create/get
- still not exposed in Composio for the core SearchAtlas-style domain intelligence endpoints: ranked keywords, competitors_domain, relevant_pages, domain_rank_overview, domain_intersection

Current subscription blockers on Matthew's account:
- Backlinks API endpoints return `40204 Access denied`
- AI Optimization / LLM Mentions endpoints return `40204 Access denied`

Other working DataForSEO slugs:
- DATAFORSEO_GET_KW_GOOGLE_ADS_KW_FOR_KW_LIVE (keyword research, live, returns monthly_searches)
- DATAFORSEO_GET_DATAFORSEO_LABS_GOOGLE_TOP_SEARCHES_LIVE (top searches with volume/CPC)
- DATAFORSEO_GET_KW_GOOGLE_KW_FOR_CATEGORY_LIVE (keywords by category, up to 700)
- DATAFORSEO_POST_DATAFORSEO_LABS_BULK_KEYWORD_DIFFICULTY_LIVE (difficulty scores, up to 1000 keywords)
- DATAFORSEO_CREATE_SERP_GOOGLE_ORGANIC_TASK_POST (SERP analysis, async: create then GET by ID)
- DATAFORSEO_GET_SERP_GOOGLE_ORGANIC_TASK_ADVANCED_BY_ID (SERP results retrieval)
- DATAFORSEO_CREATE_KEYWORDS_DATA_GOOGLE_TRENDS_EXPLORE_TASK (Google Trends)
- DATAFORSEO_GET_GOOGLE_HIST_BULK_TRAFFIC_EST_LIVE (historical traffic for domains)

DEAD SLUGS (404, do not use):
- DATAFORSEO_KEYWORDS_DATA_GOOGLE_ADS_SEARCH_VOLUME_LIVE (old name, removed)

If a slug returns 404, search for updated version:
```bash
curl -s "https://backend.composio.dev/api/v3/tools?search=DATAFORSEO+keyword&limit=20" \
  -H "x-api-key: ak_***REDACTED***"
```

PITFALL: `DATAFORSEO_CREATE_SERP_GOOGLE_ORGANIC_TASK_POST` now requires a `tasks` array inside `arguments`, not a flat `keyword` payload. Working pattern:
```bash
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/DATAFORSEO_CREATE_SERP_GOOGLE_ORGANIC_TASK_POST" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"arguments": {"tasks": [{"keyword": "electrician mesa az", "location_code": 1014226, "language_code": "en", "depth": 10}]}, "entity_id": "***REDACTED_COMPOSIO_ENTITY***"}'
```
Using a flat payload returns `Invalid request data provided - Following fields are missing: {'tasks'}`.

### Granola MCP — WORKING via Direct OAuth (Apr 7 2026)

Credentials stored at `~/.hermes/granola/credentials.json`.
Composio's Granola MCP integration is broken (tool slugs 404, tokens masked). Bypass it entirely.

**Endpoint:** `https://mcp.granola.ai/mcp` (streamable HTTP, POST only)
**Auth:** Bearer ***REDACTED*** from `https://mcp-auth.granola.ai`
**Token lifetime:** 6 hours, refresh via `https://mcp-auth.granola.ai/oauth2/token`

**Our registered client:**
- client_id: `client_01KNN2JY3H0AYV7Q9YSF3APYMT`
- client_secret: `0b827711cec7278b1e2d3bc7db35220a132b68fd038143a1facd37ec8dca030b`

**Available MCP tools:**
- `query_granola_meetings` — natural language search across all meeting notes (preferred for open-ended questions)
- `list_meetings` — list by time_range (this_week, last_week, last_30_days, custom) or folder_id
- `get_meetings` — full details by meeting_ids (array of UUIDs, max 10)
- `get_meeting_transcript` — verbatim transcript by meeting ID
- `list_meeting_folders` — browse folders, get folder IDs for filtering

**Calling pattern (Python):**
```python
import requests, json

with open(os.path.expanduser("~/.hermes/granola/credentials.json")) as f:
    creds = json.load(f)

# MCP tools/call
r = requests.post(
    "https://mcp.granola.ai/mcp",
    headers={
        "Authorization": f"Bearer {creds['access_token']}",
        "Content-Type": "application/json",
        "Accept": "application/json, text/event-stream"
    },
    json={
        "jsonrpc": "2.0",
        "method": "tools/call",
        "params": {
            "name": "list_meetings",
            "arguments": {"time_range": "last_30_days"}
        },
        "id": 1
    },
    timeout=30
)
# Response is SSE: parse lines starting with "data: "
for line in r.text.split("\n"):
    if line.startswith("data: "):
        data = json.loads(line[6:])
        for c in data.get("result", {}).get("content", []):
            print(c.get("text", ""))
```

**Token refresh pattern:**
```python
r = requests.post(
    "https://mcp-auth.granola.ai/oauth2/token",
    data={
        "grant_type": "refresh_token",
        "refresh_token": creds["refresh_token"],
        "client_id": creds["client_id"],
        "client_secret": creds["client_secret"]
    }
)
new_tokens = r.json()
# Update credentials.json with new access_token and refresh_token
```

**PITFALL: `Session expired. Please sign in again.` on Granola tools/call**
Confirmed Apr 13 2026 during heartbeat / post-meeting capture. A normal MCP `tools/call` request can return HTTP `401` with:
```json
{"message":"Session expired. Please sign in again."}
```
even when `~/.hermes/granola/credentials.json` exists and worked earlier the same day.

Reliable recovery pattern:
1. Read `~/.hermes/granola/credentials.json`
2. POST to `https://mcp-auth.granola.ai/oauth2/token` with `grant_type=refresh_token`
3. Overwrite `credentials.json` with the new `access_token` and any returned `refresh_token`
4. Retry the original MCP `tools/call`

Cron-safe example:
```python
import json, os, requests
creds_path = os.path.expanduser('~/.hermes/granola/credentials.json')
with open(creds_path) as f:
    creds = json.load(f)

r = requests.post('https://mcp-auth.granola.ai/oauth2/token', data={
    'grant_type': 'refresh_token',
    'refresh_token': creds['refresh_token'],
    'client_id': creds['client_id'],
    'client_secret': creds['client_secret'],
}, timeout=30)
r.raise_for_status()
new = r.json()
creds['access_token'] = new.get('access_token', creds['access_token'])
if new.get('refresh_token'):
    creds['refresh_token'] = new['refresh_token']
with open(creds_path, 'w') as f:
    json.dump(creds, f)
```
Then rerun the original Granola query. Treat 401 as refreshable auth drift first, not as proof the meeting/notes are missing.

**PITFALL: CloudFront path routing**
- ONLY `/mcp` routes POST correctly. Root `/` and `/sse` block POST with CloudFront 403.
- GET to any path returns origin 405 ("use POST") — useful to verify the server is alive.

**Re-auth flow (if tokens fully expire):**
1. Register new client: POST `https://mcp-auth.granola.ai/oauth2/register`
2. Build authorize URL with PKCE S256 code_challenge
3. User opens URL, authorizes, pastes back the callback URL with code
4. Exchange code at `https://mcp-auth.granola.ai/oauth2/token` with code_verifier
5. Save tokens to `~/.hermes/granola/credentials.json`

**Why Composio doesn't work (for future reference):**
- Composio registers the app (actionsCount: 4) but tool slugs are never wired to their execute pipeline
- All slug variations return "Tool not found" on v2/v3/MCP endpoints
- Composio masks tokens in API responses (`eyJh...`), preventing extraction for direct use
- The mcp.composio.dev proxy 301 redirects to marketing pages

### Composio Triggers - DO NOT USE
Composio trigger endpoints are broken as of March 2026:
- v1/v2 trigger endpoints (enable, subscribe, setCallbackURL) return "This endpoint is no longer available. Please upgrade to v3 APIs."
- v3 trigger endpoints don't exist (404)
- The `composio-core` Python SDK (v0.7.21) hits the dead v1/v2 endpoints
- The `composio-client` Python SDK (v1.29.0) has `trigger_instances.upsert()` but fails with "Connected account not found" using the old UUID format
- Composio's Slack connected account (UUID 3cb6ed12-6bcf-4b3f-bef6-f422ee75b65f) doesn't map to the new ID format (ca_*)
- SOLUTION: Use native Slack Events API via the approval server at ~/pilot-approval/server.py instead. Events queue at ~/pilot-approval/events/queue.json.

### Composio Connected Accounts (New ID Format)
As of March 2026, Composio switched to ca_* format IDs:
- ca_jg3G6hPkVSuy = clickup
- ca_2qO-chnX_cs- = googlecalendar
- ca_EjXagIWWBEsQ = gmail
- ca_jp8Nt5Es-1-z = googledrive
- ca_wLBfN2y7n3oJ = googlesheets
- ca_d-bblFPsogcR = googledocs
- ca_9na2ci6hkPoY = gmail (contacts)
- ca_x1mY8UZcjmCP = dataforseo
- ca_4053rORrrz1C = github
- ca_qLLdUZls65dR = google_analytics
- ca_xXhi2MaqZc_E = stripe (ACTIVE, livemode true, discovered Apr 13 2026 via v3.1 connected_accounts)
NOTE: No Slack account in new format. Slack is only in old format (3cb6ed12...).
WARNING: Composio Slack tools (SLACK_LIST_MESSAGES_IN_CHANNEL etc.) return "Tool not found" as of Mar 2026. Always use native Slack API (see above) for reading/posting messages.
WARNING: Composio Slack tools (SLACK_LIST_MESSAGES_IN_CHANNEL etc.) return "Tool not found" as of Mar 2026. Always use native Slack API (see above) for reading/posting messages.

### Composio Connected Accounts lookup pattern (critical when a user says "it should be connected now")
Use the v3.1 connected accounts endpoint, not local config files or env vars:
```bash
curl -s "https://backend.composio.dev/api/v3.1/connected_accounts?toolkit_slugs=stripe&limit=20" \
  -H "x-api-key: ak_***REDACTED***"
```
This returns ACTIVE connections even when nothing shows up in `~/.hermes/config.yaml`, env vars, or browser sessions.

### Composio Stripe (confirmed Apr 13 2026)
Search tools first:
```bash
curl -s "https://backend.composio.dev/api/v3/tools?search=STRIPE&limit=200" \
  -H "x-api-key: ak_***REDACTED***" -o /tmp/stripe_tools.json
```
Then inspect locally with Python if needed.

Confirmed working Stripe tool slugs:
- STRIPE_CREATE_CUSTOMER
- STRIPE_CREATE_INVOICE
- STRIPE_SEARCH_CUSTOMERS
- STRIPE_LIST_INVOICES
- STRIPE_LIST_CUSTOMERS
- STRIPE_CREATE_PRICE
- STRIPE_CREATE_PRODUCT
- STRIPE_CREATE_SUBSCRIPTION
- plus retrieve/list/update helpers

### Stripe invoice pitfall: Composio exposes draft invoice creation, but NOT invoice item creation
As of Apr 13 2026, the Stripe toolkit did NOT expose a `STRIPE_CREATE_INVOICE_ITEM` / invoice item write action in Composio search results.

Re-verified Apr 16 2026:
- `v3/tools` still exposes `STRIPE_CREATE_INVOICE`, `STRIPE_CREATE_CUSTOMER`, `STRIPE_CREATE_PRODUCT`, `STRIPE_CREATE_PRICE`, and `STRIPE_LIST_INVOICES`, but no invoice-item or payment-link write action.
- Deprecated v2 execution still works for known Stripe actions if you use the old connected-account UUID from `v3.1/connected_accounts` (`033b2f3d-9fe8-4093-9ee2-5f26d797d9b1` for the current Stripe connection), but guessed invoice-item actions like `STRIPE_CREATE_INVOICE_ITEM`, `STRIPE_CREATE_INVOICEITEM`, and `STRIPE_ADD_INVOICE_ITEM` all return `Tool ... not found`.
- Conclusion: with the current Composio Stripe connection, Hermes can only create the draft invoice shell, not the billable line item.

Practical consequence:
- You can create the customer
- You can create the draft invoice with `collection_method: send_invoice`, `days_until_due`, metadata, custom_fields, footer, etc.
- But the created invoice may have `lines.data: []`, `subtotal: 0`, and `total: 0` because there is no exposed invoice-item action to attach the billable line item through Composio
- If Matthew wants true end-to-end invoice drafting with populated line items, the forward path is NOT more Composio probing. Use Stripe CLI or Stripe MCP with write access for Customers, Invoices, Invoice Items, and Prices.

Working pattern used successfully:
```bash
# 1. Search existing customer by email
cat >/tmp/stripe_search_customer.json <<'EOF'
{"arguments":{"query":"email:'myelectricjob@gmail.com'","limit":10},"entity_id":"***REDACTED_COMPOSIO_ENTITY***"}
EOF
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/STRIPE_SEARCH_CUSTOMERS" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d @/tmp/stripe_search_customer.json

# 2. Create customer if no match
cat >/tmp/stripe_create_customer.json <<'EOF'
{"arguments":{"name":"Juan Giron","email":"myelectricjob@gmail.com","phone":"+15625726889","description":"JRG Electric Inc, AMPED lead generation buyer"},"entity_id":"***REDACTED_COMPOSIO_ENTITY***"}
EOF
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/STRIPE_CREATE_CUSTOMER" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d @/tmp/stripe_create_customer.json

# 3. Create draft invoice
cat >/tmp/stripe_create_invoice.json <<'EOF'
{"arguments":{"customer":"cus_...","collection_method":"send_invoice","days_until_due":3,"auto_advance":false,"currency":"usd","description":"AMPED EV Charger + Panel Upgrade Leads, April 2026 starting budget for JRG Electric Inc.","metadata":{"budget_amount_usd":"1000","budget_month":"April 2026"}},"entity_id":"***REDACTED_COMPOSIO_ENTITY***"}
EOF
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/STRIPE_CREATE_INVOICE" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d @/tmp/stripe_create_invoice.json
```

### Reporting rule for Stripe draft invoices via Composio
After creation, explicitly tell Matthew whether the invoice has billable lines attached.
If `lines.data` is empty or total is zero, report that the draft exists but still needs the actual line item added before sending.
Do NOT imply the invoice is fully ready to send when the toolkit only created an empty draft shell.

## Stripe via Composio v3 (confirmed Apr 13 2026)

Active connected account:
- stripe: `ca_xXhi2MaqZc_E`

Useful Stripe tools exposed in Composio v3:
- `STRIPE_SEARCH_CUSTOMERS`
- `STRIPE_CREATE_CUSTOMER`
- `STRIPE_CREATE_PRODUCT`
- `STRIPE_CREATE_PRICE`
- `STRIPE_CREATE_INVOICE`
- plus list/retrieve helpers for customers, invoices, charges, payment intents, subscriptions, refunds, products, and payment links

Working patterns:
- Search customer by email:
```bash
cat >/tmp/stripe_search.json <<'EOF'
{"arguments":{"query":"email:'bigbenelectric@gmail.com'","limit":10},"entity_id":"***REDACTED_COMPOSIO_ENTITY***"}
EOF
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/STRIPE_SEARCH_CUSTOMERS" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d @/tmp/stripe_search.json
```
- Create customer, product, and one-time price for a $1,000 AMPED setup using the corresponding `STRIPE_CREATE_*` tools.
- Create an invoice draft shell with `STRIPE_CREATE_INVOICE`.

Critical Stripe limitations discovered:
- `GET /api/v3/connected_accounts` shows the Stripe connection, but the embedded `access_token` is masked as `sk_l...`. You CANNOT lift a usable raw Stripe secret key from that response for direct REST calls.
- No `STRIPE_CREATE_PAYMENT_LINK` tool is exposed right now. Only `STRIPE_LIST_PAYMENT_LINKS` exists.
- No Stripe invoice-item creation tool is exposed right now. Because of that, `STRIPE_CREATE_INVOICE` can create a draft invoice shell, but not populate line items by itself.
- If `collection_method` is `send_invoice`, Stripe requires `due_date` or `days_until_due`. Omitting both returns:
  - `Failed to create invoice: If invoice collection method is 'send_invoice', you must specify 'due_date' or 'days_until_due'.`

Practical consequence:
- From Hermes today, you can stage the Stripe customer + product + price and create a draft invoice shell.
- You cannot generate the hosted payment link or a fully line-itemed Stripe invoice unless a payment-link/invoice-item capable integration is added or the work is finished manually in the Stripe dashboard.

### Stripe invoice monitoring pattern (confirmed Apr 13 2026, updated Apr 16 2026)
When Matthew asks which AMPED buyers were invoiced, or wants a follow-up notification once an invoice is paid, the reliable pattern is:

1. Call `STRIPE_LIST_INVOICES` via Composio v3 and save the full response to disk
2. Parse `data.data[]` locally and filter by the exact `invoice_id`, `customer_email`, or `metadata.company`
3. Read these fields directly from each invoice object:
   - `id`
   - `status` (`open`, `paid`, etc.)
   - `paid` (boolean)
   - `amount_due`, `amount_paid`, `amount_remaining`
   - `customer_name`, `customer_email`, `customer_phone`
   - `description`
   - `metadata`
   - `lines.data[]` for the actual billed item description and amount
4. For Slack notifications, dedupe first by checking the target thread replies before posting a paid alert

Observed response shape from `STRIPE_LIST_INVOICES`:
- top-level: `data.data[]`
- each invoice already includes hosted invoice URL, line items, metadata, and payment state, so a separate retrieve call is often unnecessary for monitoring

Useful interpretation notes:
- `status='open'` + `paid=false` + `amount_remaining > 0` = still unpaid
- `status='paid'` + `paid=true` + `amount_remaining = 0` = safe to announce as cleared
- Recent AMPED invoices can be identified cleanly by `description`, `metadata.company`, or the customer email when multiple invoices exist for the same account
- REVISION PITFALL (Apr 16 2026): Stripe can revise an invoice into a new invoice ID. In `STRIPE_LIST_INVOICES`, the original invoice may stay `open` while a successor invoice shows `from_invoice.action='revision'` with `from_invoice.invoice='ORIGINAL_ID'`, and the original invoice may point back via `latest_revision='NEW_INVOICE_ID'`. If the monitoring rule is tied to the exact original invoice ID, do NOT announce payment based on the successor invoice alone. Either (a) keep the exact-ID rule and treat the original as unpaid until that exact object is `status='paid'`, `paid=true`, `amount_remaining=0`, or (b) explicitly broaden the monitor to follow the revision chain.

Thread-dedupe rule for one-time paid notifications:
- Before posting a payment update into a buyer thread, call Slack `conversations.replies` on that exact `channel` + `thread_ts`
- Dedupe against both the exact invoice id and the human headline phrase you plan to post, for example:
  - invoice id: `in_...`
  - headline phrase: `JRG Electric Inc invoice paid`
- If either appears in an existing thread reply, treat it as already announced and do not post again
- This is safer than deduping on customer/company name alone, which may match unrelated earlier messages in the same lead thread
- In practice, the posted Slack message may auto-render contact fields as `mailto:` / `tel:` links, so compare the stable headline phrase and invoice id, not the full raw message body

## ClickUp API

### Method 1: Direct API (preferred for bulk queries)
Token: pk_***REDACTED***
Workspace: 9006070686

Get tasks by status:
```bash
curl -s "https://api.clickup.com/api/v2/team/9006070686/task?statuses[]=ready%20for%20review&subtasks=true&page=0" -H "Authorization: pk_***REDACTED***"
```

Get tasks for a specific space:
```bash
curl -s "https://api.clickup.com/api/v2/team/9006070686/task?space_ids[]=SPACE_ID&subtasks=true&include_closed=false&page=0" -H "Authorization: pk_***REDACTED***"
```

Get single task:
```bash
curl -s "https://api.clickup.com/api/v2/task/TASK_ID" -H "Authorization: pk_***REDACTED***"
```

Get task comments:
```bash
curl -s "https://api.clickup.com/api/v2/task/TASK_ID/comment" -H "Authorization: pk_***REDACTED***"
```

### Method 2: Composio v3 tools/execute (preferred for single-task CRUD)

**WARNING (Apr 4 2026):** The old Composio MCP SSE endpoint (`backend.composio.dev/v3/mcp/155a88e0-f6bd-4b36-857b-d98dcdf410a4/mcp?user_id=...`) returns 404 as of Apr 2026. Composio deprecated the MCP proxy URLs. Use the v3 REST endpoint instead:

```bash
curl -s -X POST "https://backend.composio.dev/api/v3/tools/execute/CLICKUP_GET_TASK" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"arguments": {"task_id": "TASK_ID"}, "entity_id": "***REDACTED_COMPOSIO_ENTITY***"}'
```

Available ClickUp tools via v3: CLICKUP_CREATE_TASK, CLICKUP_UPDATE_TASK, CLICKUP_DELETE_TASK, CLICKUP_CREATE_TASK_COMMENT, CLICKUP_GET_TASK, CLICKUP_CREATE_LIST, CLICKUP_CREATE_FOLDER, CLICKUP_CREATE_DOC, CLICKUP_CREATE_DOC_PAGE, CLICKUP_GET_DOC_PAGE_CONTENT, CLICKUP_MOVE_TASK_TO_HOME_LIST.

### Method 3: Composio v2 with connectedAccountId (for write operations from VPS)
Connection ID: 467c804d-231b-4eb3-a5e5-9552949741bd

Create task:
```bash
curl -s -X POST "https://backend.composio.dev/api/v2/actions/CLICKUP_CREATE_TASK/execute" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"connectedAccountId": "467c804d-231b-4eb3-a5e5-9552949741bd", "appName": "clickup", "input": {"list_id": "LIST_ID", "name": "Task name", "description": "Description"}}'
```

Direct API task/subtask creation pattern (confirmed Apr 15 2026):
```bash
# Create a parent task directly in a list
curl -s -X POST "https://api.clickup.com/api/v2/list/LIST_ID/task" \
  -H "Authorization: pk_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Saiyan Rewiring Campaign Launch",
    "markdown_content": "Goal: launch the rewiring campaign.",
    "assignees": [57244480],
    "status": "in progress",
    "notify_all": false
  }'

# Create a subtask in the SAME list by adding parent: TASK_ID
curl -s -X POST "https://api.clickup.com/api/v2/list/LIST_ID/task" \
  -H "Authorization: pk_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Create ads",
    "assignees": [57244480],
    "status": "planning",
    "notify_all": false,
    "parent": "PARENT_TASK_ID"
  }'
```
Notes:
- `parent` is the ClickUp task ID string for the parent task.
- The parent task must be in the same list used in the path.
- `assignees` takes numeric user IDs. Matthew Anderson's ClickUp user ID is `57244480`.
- `markdown_content` works for rich descriptions on create.
- Verify creation with `GET /task/TASK_ID` and check the returned `parent` field on subtasks.

Update task:
```bash
curl -s -X POST "https://backend.composio.dev/api/v2/actions/CLICKUP_UPDATE_TASK/execute" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"connectedAccountId": "467c804d-231b-4eb3-a5e5-9552949741bd", "appName": "clickup", "input": {"task_id": "TASK_ID", "status": "complete"}}'
```

Add comment:
```bash
curl -s -X POST "https://backend.composio.dev/api/v2/actions/CLICKUP_CREATE_TASK_COMMENT/execute" \
  -H "x-api-key: ak_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"connectedAccountId": "467c804d-231b-4eb3-a5e5-9552949741bd", "appName": "clickup", "input": {"task_id": "TASK_ID", "comment_text": "Comment here"}}'
```

**PITFALL (Apr 2026):** Composio v2 CLICKUP_CREATE_TASK_COMMENT sometimes requires `notify_all` and `assignee` fields or returns "missing fields" error. If this happens, fall back to the direct ClickUp API:
```bash
curl -s -X POST "https://api.clickup.com/api/v2/task/TASK_ID/comment" \
  -H "Authorization: pk_***REDACTED***" \
  -H "Content-Type: application/json" \
  -d '{"comment_text": "Comment here", "notify_all": false}'
```

Available write actions: CLICKUP_CREATE_TASK, CLICKUP_UPDATE_TASK, CLICKUP_DELETE_TASK, CLICKUP_CREATE_TASK_COMMENT, CLICKUP_ADD_TAG_TO_TASK, CLICKUP_REMOVE_TAG_FROM_TASK, CLICKUP_CREATE_CHECKLIST, CLICKUP_CREATE_LIST, CLICKUP_CREATE_FOLDER

The reactor has a clickup_write.py module at /root/pilot-reactor/ that wraps all these.

### When to use which
- **Bulk task queries** (all tasks in space, filtered by status): Use Direct API (Method 1)
- **Single task CRUD** (get/create/update one task): Use MCP (Method 2) or Composio v2 (Method 3)
- **Write from VPS reactor**: Use clickup_write.py module (wraps Method 3)
- **Write from Hermes cron**: Use Method 2 (MCP) or Method 3 (curl)

### When to use which ClickUp method
- **Bulk task queries** (all tasks in space, filtered by status): Use Direct API (Method 1)
- **Single task CRUD** (get/create/update one task): Use v3 tools/execute (Method 2) or v2 connectedAccountId (Method 3)
- **Composio v2 execute endpoint without connectedAccountId**: AVOID for ClickUp reads. Has Pydantic validation errors on null fields (color, text_content, userid). Direct API and v3 don't have this issue.

### ClickUp Task Field Pitfalls
- **Status is a nested dict**, not a string: `task['status']['status']` gives you the status name (lowercase). Don't use `task.get('status')` directly as a string.
- **Assignees is a list of dicts**: `[a.get('username') for a in task.get('assignees', [])]` to get names.
- **Due date is a Unix timestamp in milliseconds** (string): `datetime.fromtimestamp(int(due_date)/1000)`.
- **Space name is NOT included in workspace-wide queries.** `task['space']` only has `{"id": "90171147412"}` with no name field. You MUST map space IDs to project names yourself. Use the space ID map from the proofpilot-agency skill (ClickUp Space IDs section).
- **Cron environments may not have SSH keys** to VPS. Always have a fallback path using direct API calls when VPS data files are unavailable.
- **Direct Viktor-disclosed gotchas**: `pd_clickup_update_task` dueDate can execute while leaving `due_date` null, and `assignees` updates can 500. Safer fallback is the proxy/direct write path rather than trusting the wrapper blindly.
- **Dispatcher wrappers now exist** in `scripts/tools_dispatcher.py` for `clickup.create_task`, `clickup.add_comment`, `clickup.set_due_date`, and `clickup.update_assignees` so direct API-safe writes do not require rebuilding raw request logic every time.
- **Wrapped proxy responses need parsing**: some proxy calls return nested JSON under `content`, then `body`. Defensive parser pattern:
  ```python
  def parse_resp(resp):
      if 'content' in resp and isinstance(resp['content'], str):
          inner = json.loads(resp['content'])
          body = json.loads(inner['body']) if isinstance(inner.get('body'), str) else inner.get('body', {})
          return body
      return resp
  ```

### ClickUp Bulk Query Pitfalls
The workspace has 3000+ open tasks. Bulk queries return 100 tasks/page and require 30+ pages.
- **DO NOT use execute_code for pagination**: Each page response is large JSON. The 50KB stdout cap truncates responses, and the 50 tool-call limit gets exhausted during pagination alone.
- **Correct approach**: Use `terminal` with `curl -o /tmp/clickup_page_N.json` to save each page to disk, then process all files in a single `terminal` python3 heredoc script.
- **Pagination pattern**:
```bash
# Fetch all pages to disk
for page in $(seq 0 40); do
    code=$(curl -s -o /tmp/clickup_page_${page}.json -w "%{http_code}" \
      "https://api.clickup.com/api/v2/team/9006070686/task?include_closed=false&subtasks=true&page=${page}" \
      -H "Authorization: pk_***REDACTED***")
    count=$(python3 -c "import json; f=open('/tmp/clickup_page_${page}.json'); d=json.load(f); print(len(d.get('tasks',[])))")
    echo "Page $page: $count tasks"
    [ "$count" = "0" ] && break
done
```
Then process with a single python3 heredoc that reads all `/tmp/clickup_page_*.json` files.
- **Stale task detection**: Due date before current month = overdue. No due date + created 90+ days ago + untouched 45+ days = stale. Status "move to next month" is the #1 indicator of abandoned tasks.
- **`date_status_changed` is null in workspace-wide queries** (Apr 2026): When querying tasks via `/team/{id}/task?statuses[]=...`, the `date_status_changed` field returns `None` for all tasks. Use `date_created` as a proxy for task age instead. The `date_updated` field IS populated and reflects the most recent modification timestamp.
- **Unknown space ID 90171147564**: Appears in workspace queries with SEO strategy tasks (Page Strategy Tab, Content Strategy Tab, GBP Strategy Tab, etc.). Not mapped to any known client. Likely an internal/template space.

## Fireflies API (GraphQL)
Token: 154c9662-8f64-456e-9ec6-50a21f373c85

List recent meetings:
```bash
curl -s -X POST "https://api.fireflies.ai/graphql" -H "Content-Type: application/json" -H "Authorization: Bearer ***REDACTED***" -d '{"query": "{ transcripts(limit: 5) { id title date duration speakers { name } } }"}'
```

Get transcript with action items:
```bash
curl -s -X POST "https://api.fireflies.ai/graphql" -H "Content-Type: application/json" -H "Authorization: Bearer ***REDACTED***" -d '{"query": "{ transcript(id: \"ID\") { title summary { overview action_items } sentences { text speaker_name } } }"}'
```

### Fireflies transcript date pitfall
When listing transcripts, the `date` field may come back as a Unix timestamp in milliseconds instead of an ISO8601 string. Confirmed Apr 16 2026 during heartbeat: values like `1776364200000` mapped cleanly to Arizona-local meeting times once converted from epoch ms.

Reliable parsing pattern:
- if `date` is an int / float, parse with `datetime.fromtimestamp(date/1000, tz=timezone.utc)`
- if `date` is a string, keep the normal `fromisoformat(...replace('Z', '+00:00'))` path
- do not assume `date.replace('Z', '+00:00')` is always safe, because numeric dates will throw attribute errors or get misclassified as malformed

### Fireflies GraphQL Pitfall: write request JSON to a file for transcript queries
When the GraphQL query contains nested quotes, inline `-d '{...}'` payloads are easy to break with shell escaping. A malformed payload returns Fireflies `400 bad_request` with errors like `Expected ',' or '}' after property value in JSON...`.

Reliable pattern:
```bash
cat >/tmp/fireflies_req.json <<'EOF'
{"query":"{ transcript(id: \"ID\") { title summary { overview action_items } } }"}
EOF
curl -s -X POST "https://api.fireflies.ai/graphql" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ***REDACTED***" \
  -d @/tmp/fireflies_req.json
```
Use the file method anytime the query includes an ID or gets longer than a trivial one-liner.

## Firecrawl (Web Search + Scrape + Agent)
API Key: fc-***REDACTED***

### Firecrawl CLI (v1.12.2, installed globally on sandbox + VPS)
Binary: `/usr/bin/firecrawl` (on PATH globally, no export needed)
Auth: Persistent credentials stored via `firecrawl config`. Working on both sandbox and VPS. Apr 2026.

**All CLI commands:**
```bash
# Status + auth check
firecrawl --status                          # Check auth, credits, concurrency

# Scrape (single or multiple URLs, concurrent)
firecrawl scrape URL --format markdown      # Scrape single page to stdout
firecrawl scrape URL -o output.md           # Scrape to file
firecrawl scrape URL1 URL2 URL3             # Multiple URLs scraped concurrently, saved to .firecrawl/

# Search (web search via Firecrawl)
firecrawl search "query" --limit 5          # Web search, results to stdout
firecrawl search "query" --scrape --limit 5 -o dir/  # Search AND scrape results to files

# Map (discover all URLs on a domain, 1 credit)
firecrawl map URL                           # All URLs on a domain
firecrawl map URL -o sitemap.json           # Save to file

# Download (map + scrape entire site into nested directory)
firecrawl download URL -o site-data/        # Full site download as nested markdown files

# Crawl (recursive crawl with progress)
firecrawl crawl URL --wait --progress -o out.json  # Recursive crawl with all page data

# Interact (post-scrape browser interaction on any page)
firecrawl interact URL                      # Interactive session: click, type, navigate

# Agent (autonomous AI research, no URLs needed)
firecrawl agent "prompt"                    # AI agent discovers and extracts data autonomously
```

**CLI Auth Pitfall:** The FIRECRAWL_API_KEY env var is NOT auto-detected by the CLI. Auth must be persisted via `firecrawl config`. The interactive prompt doesn't accept piped stdin. Re-auth programmatically:
```javascript
// Save as /tmp/auth_fc.js, run with: node /tmp/auth_fc.js
const { spawn } = require('child_process');
const proc = spawn('firecrawl', ['config'], { stdio: ['pipe', 'pipe', 'pipe'] });
setTimeout(() => proc.stdin.write('2\n'), 1000);
setTimeout(() => proc.stdin.write('fc-***REDACTED***_KEY\n'), 2000);
setTimeout(() => proc.stdin.end(), 3000);
proc.on('close', () => console.log('Done'));
setTimeout(() => process.exit(0), 5000);
```

**When to use CLI vs SDK:**
| Use Case | Best Tool |
|----------|-----------|
| Bulk site scrape/download | CLI `download` or `crawl` (filesystem, no context bloat) |
| Search + scrape combo | CLI `search --scrape` (one command, files saved) |
| Site URL discovery | CLI `map` or SDK `app.map()` (both 1 credit) |
| Single page analysis in scripts | SDK `app.scrape()` with rawHtml/links/images |
| Automated QA pipelines | SDK via `firecrawl_agent.py` scripts |
| Interactive form/CTA testing | CLI `interact` or SDK `app.interact()` |
| Autonomous research | CLI `agent` or SDK `app.agent()` |

### Python SDK (v4.22+)
SDK: `pip3 install firecrawl-py` (v4.22+, use `from firecrawl import Firecrawl`)

### Python SDK (preferred -- handles async polling, schemas, typed responses)
```python
from firecrawl import Firecrawl
from firecrawl.v2.types import ScreenshotFormat
app = Firecrawl(api_key="***REDACTED***")

# Scrape (1 credit, sync) -- formats: markdown, html, rawHtml, links, images, screenshot, summary, json, branding, audio
doc = app.scrape("URL", formats=["markdown", "rawHtml", "links", ScreenshotFormat(full_page=True)], mobile=False)
# doc.markdown, doc.raw_html, doc.links, doc.screenshot (URL), doc.metadata_dict

# Map (1 credit, sync) -- get all URLs on a site
result = app.map("https://domain.com", search="service page", limit=500)
# result.links (list of objects with .url, .title)

# Search (sync) -- Google search via Firecrawl
result = app.search("best electrician mesa az", limit=5)
# result.web (NOT .data) -- list with .url, .title, .description

# Batch scrape (async) -- multiple URLs at once
result = app.batch_scrape(["URL1", "URL2"], formats=["markdown", "links"])

# Agent (async, 300-500 credits) -- autonomous research, no URLs needed
result = app.agent(prompt="Find top 3 HVAC companies in Phoenix AZ", model="spark-1-mini", max_credits=500)

# Interact (2-7 credits/min) -- click, type, navigate after scrape
doc = app.scrape("URL"); scrape_id = doc.metadata_dict.get("scrapeId")
app.interact(scrape_id, prompt="Click the contact button")
app.stop_interaction(scrape_id)  # ALWAYS stop to stop billing
```

### SDK Gotchas (Apr 2026)
- Use `Firecrawl` not `FirecrawlApp` (v4.22+ import change)
- Search results: `.web` not `.data`
- Map results: `.links` returns objects with `.url` attribute, not plain strings
- `mobile=True` on scrape gives mobile viewport rendering
- `ScreenshotFormat(full_page=True)` for full-page screenshots
- Screenshot URLs expire after 24 hours
- Agent maxCredits default is 2500 -- always set lower with `max_credits=500`

### curl (fallback)
```bash
curl -s -X POST "https://api.firecrawl.dev/v1/scrape" -H "Authorization: Bearer ***REDACTED******REDACTED***" -H "Content-Type: application/json" -d '{"url": "URL", "formats": ["markdown"]}'
```

### QAPilot Scripts (for QA workflows)
The qapilot skill has dedicated Firecrawl wrapper scripts at ~/.hermes/skills/productivity/qapilot/scripts/firecrawl_agent.py. Use those for QA tasks instead of writing raw SDK calls.
