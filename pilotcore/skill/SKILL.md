---
name: pilot-slack-bot
description: >
  ProofPilot's "Pilot" AI coworker. Hermes-native architecture: gateway + cron jobs + skills.
  NOT bot.py. All intelligence runs through Hermes with self-contained curl API calls.
  Use when resuming work on Pilot features, cron jobs, or ProofPilot integrations.
tags: [proofpilot, slack, ai-coworker, hermes, cron]
---

# Pilot AI Coworker — Architecture Reference

## CRITICAL: Architecture is Hermes-Native

Pilot does NOT run as a separate bot.py process. All intelligence runs through:
1. Hermes gateway (persistent systemd service on VPS srv1536232, handles Slack + Telegram)
2. Hermes cron jobs (9 scheduled, all self-contained with curl API calls)
3. Hermes skills (proofpilot-agency, pilot-communication, pilot-api-reference)

Old bot.py code is archived at ~/slack-bot/ but NOT in active use.

## Why Not bot.py (Lesson Learned the Hard Way)

We originally built a custom Slack bot (bot.py with slack-bolt) with:
- Custom tools (read_skill, clickup, composio, seo_audit)
- Custom heartbeat engine (heartbeat.py)
- Custom approval flow (approval.py with Block Kit buttons)
- Skills loaded from local files

This FAILED because:
1. The bot ran inside a Docker container that resets between Hermes sessions
2. Background processes die when terminal sessions end
3. The container filesystem is isolated from the Hermes gateway
4. Cron jobs run in fresh sessions that can't access container files or custom tools
5. We had two systems (bot.py + Hermes gateway) that didn't share state

The fix: lean INTO Hermes as the runtime. Hermes already has persistent memory, skill loading, cron scheduling, Slack messaging, and tool execution.

## Architecture Diagram

```
[Slack Events] → [Hermes Gateway on VPS] → [Hermes Agent Session]
                                                    ↓
                                          [Load proofpilot-agency skill]
                                          [Load pilot-communication skill]
                                          [Load pilot-api-reference skill]
                                                    ↓
                                          [Use terminal tool to curl APIs]
                                          [ClickUp, Composio, Slack, Fireflies]
                                                    ↓
                                          [Compose response with Slack formatting]
                                                    ↓
                                          [Deliver to Matthew DM or channel]
```

## Key Skills (all Hermes-native, accessible from every session)

- `proofpilot-agency`: Team, clients, channel IDs, pricing, workflows, communication rules
- `pilot-communication`: Slack mrkdwn formatting, tone per person, emoji structure, when to post vs stay silent
- `pilot-api-reference`: Exact curl commands for ClickUp, Composio (Gmail/GSC/GA4/Calendly/Drive), Slack, Fireflies, Firecrawl
- `proofpilot-proposals`: Full proposal generator (5 types, pricing, document structure)
- `proofpilot-brand`: Brand colors, typography, document styling
- `proofpilot-audits-proposals`: 40-point website/SEO audit framework
- `proofpilot-sow`: Statement of Work generator
- `proofpilot-pnl`: P&L statement generator
- `amped-overview-doc`: AMPED program overview doc template

## Pilot Reactor (~/pilot-reactor/) — THE PERSISTENT BRAIN

The reactor is a Socket Mode process running 24/7 on the Hostinger VPS as a systemd service.
It receives EVERY Slack message in real-time and decides what to do. This is what makes Pilot
persistent like Viktor, not just a cron scheduler.

Architecture: Message → Pre-filter (rules, no LLM) → Triage (Haiku) → Action (Respond/Track/Flag/Learn)

**systemd service:** pilot-approval.service (name is legacy, it IS the reactor)
**File:** /root/pilot-reactor/reactor.py
**Log:** /root/pilot-reactor/reactor.log
**Restart:** `ssh root@187.124.234.21 'systemctl restart pilot-approval'`

### Tiered Model System (cost-conscious)
- Tier 1: anthropic/claude-3.5-haiku — triage, scanning, simple lookups (~$0.001/call)
- Tier 2: anthropic/claude-sonnet-4 — responses, drafts, status questions (~$0.02/call)
- Tier 3: anthropic/claude-opus-4 — deep strategy, proposals, complex analysis (~$0.10/call)
- Model picked automatically by `pick_response_tier()` based on triage reason and urgency
- OpenRouter API key: sk-or-v1-***REDACTED***
- VERIFY slugs before changing: `curl -s https://openrouter.ai/api/v1/models` and filter for anthropic. Wrong slugs 404 silently.

### Budget Guardrails
- $5/day hard limit (all LLM calls stop)
- $3/day warning (Matthew gets Slack alert with tier breakdown)
- Max 3 Opus calls/hour, 30 Sonnet calls/hour (auto-downgrade if exceeded)
- Max 500 total calls/day
- Cost tracker: ~/pilot-reactor/cost_tracker.json (auto-resets daily)
- Auto-downgrade: if hourly limit hit, drops one tier instead of blocking

### Channel Onboarding (channel_onboarding.py)
When Pilot is added to a new channel, it automatically posts a Viktor-style introduction:
1. **Detection:** Two triggers: `member_joined_channel` Slack event (instant) + 15-min background scan comparing current channels vs onboarded_channels.json
2. **Context gathering:** Reads channel history (50 msgs), loads client knowledge from ~/pilot-knowledge/notes/clients/, reads channel purpose/topic
3. **Generation:** Sonnet generates intro message + 2-3 threaded proposals specific to the channel context
4. **Posting:** Main message posted, then each proposal as a thread reply (1s delay between)
5. **Tracking:** onboarded_channels.json prevents duplicate intros. Existing channels marked "pre-existing" on init.
6. **Notification:** Matthew gets a DM when onboarding happens.
Template follows Viktor's exact pattern: What I observed / What I'd do / How it works / What you'd get / What I'd need.

### App Home Tab (pilot_home_tab.py)
Rich Block Kit home tab published via views.publish API. Shows:
- System status (LLM budget, API calls, channels monitored)
- Active tasks + recently completed
- Channel pulse (from context-now.md)
- Active follow-ups
- Capabilities list, cron schedule, connected integrations
Published on startup, refreshed every 30 min, and on app_home_opened event.

### Reactor Actions
- IGNORE: Skip, not relevant
- RESPOND: Draft response. @mentions post directly. Proactive posts check auto-approve rules, stage to Matthew's DM with buttons if not approved.
- TRACK: Create follow-up in ~/pilot-reactor/followups.json. Background thread checks every 30 min. If awaited person doesn't reply in 4h, nudges Matthew. Max 3 reminders, then marks stale. Auto-resolves when thread gets a reply.
- FLAG: Immediate alert to Matthew's DM (client emergency, deadline miss, revenue risk)
- LEARN: Silently update knowledge graph with new client/project info

### Approval Buttons (Block Kit)
Three buttons on every approval message: Approve, Always Approve, Reject.
- decisions/ dir: JSON files per approval
- always_approved.json: Rules for auto-approved action types
- helpers.py: Library + CLI for posting. `smart_approval()` checks auto-rules first.
- ask_human/: "Ask Human" pattern, Pilot posts question, waits for thread reply
- Pipeline system: ~/pilot-approval/pipelines.py (Draft → Review → Approve → Execute chains)

### Cloudflare Tunnel (PERMANENT)
- URL: https://pilot-api.proofpilotapps.com
- Docker: `docker ps | grep pilot-tunnel` (--restart always, --network host)
- Health check: `curl https://pilot-api.proofpilotapps.com/health`
- NOTE: The gunicorn/Flask HTTP server is no longer needed. Reactor uses Socket Mode.
  The tunnel is kept for the health endpoint and potential future webhook needs.

### Historical note: old Socket Mode coexistence section
This section is superseded by the newer hybrid architecture below. Current state is:
- Gateway uses Slack Socket Mode for DMs, @mentions, and thread replies
- Reactor uses polling/event scanner for proactive channel monitoring
- Reactor should NOT have Socket Mode re-enabled unless explicitly redesigning the system

## Task Tracker (~/pilot-tasks.json)

Persistent JSON file tracking Pilot's claimed work. Skill: pilot-task-tracker.
Tasks have: id, project, title, status (claimed/in_progress/blocked/completed), owner, due_date, notes[].
Crons read this to report on Pilot's plate and to pick up work in the execution cron.

## Viktor Study System (~/viktor-study/)

Automated reverse-engineering of Viktor's Slack behavior. Skill: viktor-study.
Scans all channels for Viktor's messages (U0AL7SW3JKW), analyzes HOW he did things (trigger, data, tools, output structure, quality), extracts patterns, logs to learnings.md.
7 patterns documented: Channel Onboarding, Project Audit, Proactive Proposals, Client Update Drafting, Meeting Recap, Timeline/Planning, Thread Participation.
Runs autonomously. Pilot builds capabilities from learnings without asking Matthew, only asks when needing new access/permissions.

## 11 Active Cron Jobs

All load skills: [proofpilot-agency, pilot-communication, pilot-api-reference]
All use terminal tool with curl for API calls (NOT custom Python tools)
All deliver to slack:D0AQ9PB64L8 (Matthew's DM) unless noted

| Cron | Schedule (UTC) | AZ Time | Purpose |
|------|---------------|---------|---------|
| Morning Briefing | 0 15 * * * | 8AM daily | AMPED pipeline + email + calendar |
| Email Digest | 30 15 * * * | 8:30AM daily | Gmail inbox scan |
| Cedar Gold Pulse | 0 16 * * 1,3,5 | 9AM M/W/F | Project status update |
| SEO Page QA | 0 17 * * 1-5 | 10AM weekdays | Check ClickUp for pages in review |
| Post-Meeting Capture | 0 14,17,20,23 * * 1-5 | 7/10/1/4 weekdays | Calendly + Fireflies → action items |
| AMPED Lead Watcher | 0 14,16,18,20,22,0 * * * | Every 2h daily | New leads, Calendly calls, pipeline |
| Proactive Watcher | 30 14,16,18,20,22 * * * | Every 2h daily | Unanswered questions, blockers, wins |
| PM Digest | 0 23 * * 1,3,5 | 4PM M/W/F | Cross-client task health check |
| Context Sync + Opp Scanner | 0 13,17,21,1 * * * | Every 4h | Scan channels + find opportunities to help |
| Viktor Study | 0 12,18,0,6 * * * | Every 6h | Reverse-engineer Viktor's Slack behavior |
| Task Execution | 0 16 * * 1-5 | 9AM weekdays | Pilot does actual work, not just reporting |
| Escalation Report | 0 17 * * 1-5 | 10AM weekdays | Progressive escalation check across all projects |
| EOW Client Updates | 0 22 * * 5 | 3PM Friday | Draft client updates for Katelyn to review/send |
| Workflow Discovery | 0 9 * * 2,5 | 2AM Tue/Thu | Find new automation opportunities from channel patterns |
| SEO QA Hourly (VPS) | 0 * * * * | Every hour | Script cron, no LLM. Posts only when NEW review items appear |

Note: Most crons were upgraded on 2026-03-30 to load pilot-task-tracker skill, use Viktor-standard tone, and include "Pilot's Plate" task status sections. Task Execution cron is new, does actual work not just reporting. Context Sync now also scans for response opportunities. Proactive Watcher upgraded to value-add scanner.

## Critical Rules for Cron Prompts

1. NEVER reference custom tools (read_skill, clickup, composio). Crons use Hermes tools only.
2. All API calls go through terminal tool with curl commands from pilot-api-reference skill.
3. Every cron prompt must say "Load all attached skills first" — skills are injected via the skills[] array.
4. If a section has nothing to report, output nothing or skip it. Don't pad.
5. Formatting: *single asterisks* for bold, emoji headers, no em dashes, no **double asterisks**, no # headings.
6. Context that changes (pipeline state, client status) should be read live from APIs, never hardcoded in prompts.
7. DUPLICATE PREVENTION: Every cron must run session_search before sending to check what other crons already reported in the last 4-6 hours. If the same item was already surfaced by any cron (morning briefing, context sync, proactive watcher, Cedar Gold pulse, email digest, escalation report, AMPED watcher, etc.), DO NOT report it again. Only report genuinely new developments. If nothing new, respond with [SILENT].
8. CHANNEL POSTING LOCKDOWN: No cron job may post directly to any client Slack channel. ALL output goes to Matthew's DM (D0AQ9PB64L8) only. This includes Cedar Gold Group and all other project channels. Matthew will explicitly approve channel posting when ready. Until then, DM only.
9. CRON DELIVERY vs SEND_MESSAGE (DUPLICATE BUG): When a cron job has `deliver: slack:D0AQ9PB64L8`, the cron delivery system automatically sends the agent's final response to that Slack target. If the cron agent ALSO calls `send_message` to the same DM during its run, the content appears twice — once from `send_message` and once from the cron delivery. FIX: Every cron prompt that delivers to Slack must include: "Your final response is the ONLY thing delivered to Slack. Do NOT use send_message to Matthew's DM — that causes duplicate messages. Just write your final response as the Slack message itself."

## Composio Integration

API Key: ak_***REDACTED***
Entity ID: ***REDACTED_COMPOSIO_ENTITY***
23 connected accounts: Gmail, Drive, Sheets, Docs, Calendar, Analytics, Search Console, ClickUp, GitHub, Slack, Calendly, Granola MCP, DataForSEO, Firecrawl, OpenRouter

## AMPED Sales Pipeline (Primary Interactive Use Case)

From studying Matthew's Viktor DM history, the #1 real-time work is AMPED lead pipeline management:
- Tracking 30+ electrician leads by status (cold, warm, booked, signed)
- Drafting outreach emails in Matthew's voice
- Creating branded overview docs from templates
- Checking Calendly before ANY outreach
- Cross-referencing Granola, Gmail, Slack for context
- Matthew iterates on tone (typically 2-3 rounds)

## Pitfalls Discovered

1. Container isolation: Docker containers have /tmp as tmpfs. docker cp to /tmp silently fails. Use /root/ instead.
2. Container ID changes: Hermes spins up new containers per session. The container name (hermes-XXXXXXXX) changes.
3. Cron sessions are stateless: They don't inherit env vars, can't import custom Python modules, can't read files from other containers.
4. Slack formatting: Double asterisks render literally. Use single asterisks for bold.
5. Em dashes: NEVER use them. ProofPilot-wide rule. Dead giveaway of AI writing.
6. Morning briefing delivery: Must be "slack:D0AQ9PB64L8" not "origin" (which delivers to the creating terminal).
7. Stagger cron timing: Don't fire multiple crons at the same minute.
8. Context sync can't write files: Local file writes don't persist. Use Hermes memory tool instead.
9. Slack Bot DMs: Must enable "Messages Tab" + "Allow users to send messages" in Slack app settings for DMs to work.
10. Block Kit: Use section blocks with dividers for long messages. Context blocks for footers. Requires the bot process for interactive buttons.
11. File uploads to Hermes: Container can't receive files directly. Options: paste contents in chat (fastest), SCP to VPS then docker cp into container (fragile), or upload to Google Drive and pull via Composio. A persistent upload server at VPS_IP:8080 was deployed using /root/upload-server.py on the host.
12. VPS IP: 187.124.234.21. Upload server: http://187.124.234.21:8080. SEO Gap Tool: http://187.124.234.21:8000.
13. Deep audit methodology: When evaluating agent architecture, test whether cron jobs can actually execute their prompts. Check: can they access skills, can they call APIs, does their output arrive at the delivery target, is the formatting correct. Fire each cron manually and verify output.
14. Viktor architecture insight (from their blog): Skills are one-line summaries in system prompt with lazy loading on demand. Code execution (not JSON function calling) for tool use. Agent explores new integrations and writes skill files. Context window treated like RAM in memory-constrained system.
15. SSH from container to host: ssh root@172.17.0.1 (ed25519 key auth). Use this to run commands on the VPS host directly. Never ask Matthew to run commands for you.
16. Socket Mode vs HTTP Events: Hermes gateway REQUIRES Socket Mode ON in the Slack app. If another system (like the approval Flask server) needs HTTP endpoints, it can coexist with Socket Mode, but NEVER tell the user to disable Socket Mode. That kills the gateway.
17. Upload server: Persistent Python HTTP server at http://187.124.234.21:9090 for drag-and-drop file uploads. Files land in /root/.hermes/uploads/ on the host. Read via ssh root@172.17.0.1 "cat /root/.hermes/uploads/filename".
18. Cross-session awareness: Each Hermes session (terminal, Slack, Telegram) is isolated. They share Memory and Skills but NOT conversation context. Critical decisions must be saved to memory. Use session_search to find past conversations. Read Slack channel history via API to catch up on what was discussed.
19. Slack session conflicts: Multiple Hermes sessions can give conflicting advice. The Slack session built a separate approval server and told Matthew to disable Socket Mode, which broke the gateway. Always check what other sessions have done before making infrastructure changes.
20. File upload to container: docker cp to /tmp FAILS (tmpfs mount). Use /root/ as the target path. Container names change between sessions (hermes-XXXXXXXX), always check hostname first.
21. Deep audit findings (Mar 29): Built crons that referenced custom tools (read_skill, composio) that don't exist in cron sessions. Fixed by: making all crons self-contained with terminal curl commands, attaching 3 Hermes skills to every cron, embedding API credentials in the pilot-api-reference skill.
22. Gateway max_turns: Set to 90 in config.yaml.
42. Bot-to-bot conversations (FIXED Apr 4 2026): Gateway's slack.py had `if event.get("bot_id"): return` which silently dropped ALL bot messages including Viktor. Pilot could tag Viktor but never see his reply. FIX: Changed filter to only ignore Pilot's OWN bot_id/app_id (B0APUCF8A6M / A0AP93T2LTD), allowing other bots through. Viktor's bot_id is B0ALH6RBS4R. This patch is in the combined diff file covered by the startup hook.
43. hermes update survival pattern (UPDATED Apr 8 2026 after 152-commit update):
    Three layers of defense for local patches:
    Layer 1: Startup hook at ~/.hermes/hooks/pilot-context/handler.py (fires on every gateway:startup).
      - Checks MARKERS in run.py/slack.py. If missing, tries git apply from /root/pilot-gateway-context-patch.diff.
      - If git apply fails (upstream changed those lines), FALLS BACK to /root/reapply-pilot-patches.sh.
      - Also runs _check_delegate_patch() to ensure delegate_tool.py has MAX_CONCURRENT_CHILDREN=6 (uses sed, very resilient).
      - Auto-restarts gateway after patching.
    Layer 2: Reapply script /root/reapply-pilot-patches.sh (uses git apply + sed for delegate_tool + TERMINAL_ENV fix).
    Layer 3: Manual intervention (recreate patch file if upstream restructured the patched files).
    CRITICAL LESSON (Apr 8): The hook's git apply --check path had `return` on failure, skipping the fallback. Fixed: now falls through to reapply script. Always test the FAILURE path of hooks, not just the success path.
    CRITICAL LESSON (Apr 8): After a 152-commit update, the stash restore produced merge conflicts in slack.py. The upstream version had BETTER thread handling (native _bot_message_ts + _mentioned_threads + _has_active_session_for_thread) than our old patch (_bot_participated_threads). Accepted upstream, dropped our slack.py patch entirely. When upstream catches up to your patches, let them go.
    POST-UPDATE CHECKLIST: After hermes update, always: (1) say Y to restore stash, (2) run `systemctl --user restart hermes-gateway`, (3) check `tail -20 ~/.hermes/logs/gateway.log | grep -i pilot` for hook status, (4) if patches failed, run `/root/reapply-pilot-patches.sh` manually, (5) recreate the patch file with `cd ~/.hermes/hermes-agent && git diff origin/main..HEAD -- gateway/run.py tools/delegate_tool.py > /root/pilot-gateway-context-patch.diff`.
44. hermes update flow: git stash local changes → git pull --ff-only → attempt git stash apply (may conflict) → update pip deps → sync bundled skills → config migration → auto-restart ALL gateway services. The auto-restart triggers the startup hook which re-patches. Takes 30-60s, kills active Slack sessions. Socket Mode doesn't backfill missed messages during downtime. Best time: late evening AZ.
44b. .env vs config.yaml precedence: TERMINAL_ENV in .env OVERRIDES terminal.backend in config.yaml (os.getenv at terminal_tool.py:475). hermes update may reset config.yaml but does NOT touch .env. However, if .env has TERMINAL_ENV=docker, even setting config.yaml to local won't help. The reapply script auto-fixes this.
44c. hermes update patch recreation: After resolving merge conflicts post-update, ALWAYS recreate the patch file from the current committed state: `cd ~/.hermes/hermes-agent && git diff origin/main..HEAD -- gateway/run.py gateway/platforms/slack.py tools/delegate_tool.py > /root/pilot-gateway-context-patch.diff`. This ensures the hook's git apply works on the NEXT update. Forgetting this step means the next update's hook will fail because the patch file references old line numbers.
45. Cron self-healing: All 15 cron prompts now have RELIABILITY RULES prepended (Apr 4 2026). Retry failed API calls 3x with 15s waits. Try alternative approaches. Never silently fail. Report partial results. Modeled after Viktor's March 2026 "doesn't give up anymore" feature.
46. Context pipeline architecture gap (ROOT CAUSE Apr 4 2026): When reactor Socket Mode was disabled Mar 30, the reactor's load_context() (which reads context-now.md) stopped being used for interactive conversations. The gateway took over ALL Slack messages but had NO code to read context-now.md or channel history. The VPS data pipeline (context_builder, slack_sync, data_prefetch, people_tracker, channel_memory) was running perfectly for 5 days feeding files that nothing read. Skills and cron outputs claimed "context-now.md gets injected into every Gateway session" but the injection code was never actually written. The reactor had it; the gateway didn't. Lesson: when ownership of a responsibility moves between systems, verify the new owner actually has the capability, don't just assume. At 150, a single Slack conversation could run 150 tool calls, blocking the gateway from processing any other messages for 10+ minutes. 30 is enough for typical interactions. For heavy build tasks, use delegate_task for background execution or do them in terminal.
23. Gateway responsiveness: The gateway processes messages sequentially per session. DMs share one session. If Pilot is working on a long task, new DMs queue. Symptoms: Pilot responds to some messages but ignores others. Fix: restart gateway (ssh root@172.17.0.1 "systemctl --user restart hermes-gateway"), or user sends /reset in Slack.
24. Never disable Socket Mode: The Hermes gateway requires Socket Mode. If an HTTP endpoint is needed (like for approval buttons via Cloudflare tunnel), it can coexist WITH Socket Mode enabled. Disabling Socket Mode kills all Slack message delivery to the gateway.
25. Pilot's role clarity: Pilot is NOT a client email drafter. Katelyn handles client comms. Pilot surfaces WHEN to communicate and provides context/data ("Hey Katelyn, Cedar Gold hasn't gotten an update in 10 days. Here's what I pulled together: [completed items, in progress, waiting on client]. Want help drafting the update?").
26. Session reset config: ~/.hermes/config.yaml session_reset.idle_minutes set to 1440 (24h). Was 520 (8.6h). Daily reset at 6AM remains. Memory and skills persist across resets.
27. Upload server port: 9090 not 8080 (Open WebUI uses 8080). File at /root/upload-server.py on VPS host. Run with: nohup python3 /root/upload-server.py &
28. Socket Mode Conflict + Hybrid Resolution (2026-03-30 / 2026-04-04):
Previously both Reactor and Gateway used Socket Mode simultaneously, causing event theft. Socket Mode disabled in reactor on Mar 30. On Apr 4, replaced with POLLING-BASED EVENT SCANNER (event_scanner.py) that polls all 27 channels every 30s via conversations.history. No Socket Mode conflict.
CURRENT ARCHITECTURE (Hybrid, Viktor-style):
- Gateway OWNS: DMs, @mentions, thread replies (Socket Mode)
- Reactor Event Scanner OWNS: proactive channel monitoring (polling), triage, flags, tracking, proactive responses
- Reactor Background: escalation engine, project pulse, follow-ups, home tab, gap recovery
- Cron jobs: scheduled tasks (briefings, digests, reports)
Event scanner feeds messages through triage_message() which decides IGNORE/RESPOND/TRACK/FLAG/LEARN.
Also detects team member returns (48h+ gap) for Pattern 19: Contextual Re-Engagement.
Config: event_scanner.configure(channels, triage_fn, generate_response_fn) called at reactor startup.
DO NOT re-enable Socket Mode in reactor. The polling approach eliminates the conflict entirely.
   a) context-now.md injection: On new Slack sessions, reads /root/pilot-context/context-now.md (rebuilt every 4h, ~8KB of channel activity, questions, blockers, escalation state) and injects as "## Current Workspace Context" in context_prompt. Capped at 4000 chars.
   b) Channel history injection: On new group thread sessions, fetches 30 recent channel messages via conversations_history and injects as "## Recent Channel History". Gives Pilot awareness of what was discussed before the thread. NOTE (Apr 7 2026): bot_message subtype filter removed so bot posts (AMPED Lead Bot, Viktor, etc.) are included in channel history. Previously these were silently dropped, losing critical context like lead details.
   c) Thread context injection (ADDED Apr 7 2026): On new sessions with source.thread_id, fetches parent message + all prior thread replies via conversations_replies API (limit=50) and injects as "## Thread Context". This is CRITICAL — without it, Pilot has zero knowledge of what a thread is about when someone replies. The parent message (e.g., AMPED Lead Bot's lead details) and any prior discussion are included. Messages truncated at 1500 chars each, last message excluded (it's the current user turn). Resolves display names via _user_name_cache + _resolve_user_name, falls back to bot "username" field for bot messages. This was the ROOT CAUSE of Pilot narrating "Let me figure out the client..." — it literally didn't have the thread context.
   d) Anti-thinking-leak prompt reinforcement (ADDED Apr 7 2026): Two-layer system prompt fix to prevent model from narrating its reasoning as visible text. Layer 1: SOUL.md (~/.hermes/SOUL.md) with "ABSOLUTE RULE: NO VISIBLE THINKING", forbidden patterns list, and concrete WRONG vs CORRECT examples. Loads fresh every message, no restart needed. Layer 2: config.yaml system_prompt "INVISIBLE WORK (STRICT ENFORCEMENT)" section replacing the softer "WHAT THE USER NEVER SEES". Mode 2 Step A explicitly says "ONE short sentence ONLY" then stop text and switch to tool calls. Both layers needed because the model may ignore a single instruction but is much less likely to ignore the same rule stated twice with examples.
   All three fire on `_is_new_session` + `source.platform == Platform.SLACK`.
   SURVIVAL: Patches are uncommitted changes to gateway/run.py + gateway/platforms/slack.py. `hermes update` wipes them, BUT startup hook at ~/.hermes/hooks/pilot-context/ auto-detects and re-applies from /root/pilot-gateway-context-patch.diff on every gateway restart. Covers: (a) context-now.md injection, (b) channel history injection (with bot messages included), (c) thread context injection via conversations_replies, (d) bot-to-bot conversations (only ignore own messages, allow Viktor/other bots). Manual fallback: /root/reapply-pilot-patches.sh
TO RESTORE SOCKET MODE IN REACTOR (if needed for interactive buttons): Uncomment lines 1868-1869 in /root/pilot-reactor/reactor.py. WARNING: This will cause event conflicts again.
29. Composio v3 API migration: Old v1/v2 trigger endpoints are deprecated, return "upgrade to v3" errors. The v3 trigger API routes don't exist yet. Don't waste time on Composio triggers. Use Slack Events API directly via Socket Mode (which is what the reactor does).
34. Composio API from VPS: Python urllib gets Cloudflare 1010 blocked. Use curl subprocess instead. The v2 execute endpoint (`POST /api/v2/actions/{ACTION}/execute`) requires `appName` alongside `entityId` and `input`.
35. Calendly API requires user URI for LIST_EVENTS. Two-step: GET_CURRENT_USER first, extract `data.resource.uri`, pass as `user` param.
36. Reactor triage negation trap: LLM tracks "I'm NOT going to do X" as a commitment. Triage prompt must explicitly exclude negations.
37. OpenRouter model slugs: Verify via /api/v1/models before updating reactor. Wrong slugs 404 silently, reactor logs "LLM call failed" but keeps running with no response.

38. Hermes update breaks gateway: When `hermes update` runs on VPS, it kills the gateway process and restarts it. If Matthew sends a DM during this window (22:05-22:18 was 13 minutes of downtime), the message is lost because Socket Mode doesn't backfill missed events. FIX: Ask Matthew to resend if gateway was restarted.

38b. Codex incomplete-turn Slack warning (Apr 14 2026): If Slack shows `:warning: Codex response remained incomplete after 3 continuation attempts`, this does NOT necessarily mean Codex is down. Root cause can be a live thread auto-trigger plus a turn where the Codex Responses API returns 3 consecutive `finish_reason: incomplete` assistant messages with empty visible content and no tool calls, only encrypted `codex_reasoning_items`. Diagnose by checking the saved session JSON under `~/.hermes/sessions/` for that thread and confirming repeated incomplete assistant entries. Live runtime can still be healthy — verify separately with a one-line `AIAgent(... api_mode='codex_responses')` smoke test returning `OK`. Product lesson: user-facing Slack should suppress this internal fallback, and Pilot should stay silent in threads where humans have clearly taken over unless explicitly re-engaged.
38c. Durable fix for the above (Apr 16 2026): Slack thread events now carry a `trigger_reason` on `SessionSource` (`mention`, `bot_thread_reply`, `mentioned_thread_reply`, `active_session_thread_reply`, etc.). GatewayRunner suppresses the internal Codex incomplete warning only for implicit Slack thread follow-ups with no visible assistant text, keeping silence for "no response needed" turns while still allowing explicit mentions to surface real failures.

39. Gateway file-descriptor exhaustion root cause (Apr 14 2026): If Pilot seems "alive but jammed" and Slack sends fail with `aiohttp.client_exceptions.ClientConnectorDNSError: Cannot connect to host slack.com:443 ... [Too many open files]`, do NOT assume Slack is down. Check all three live signals first: `systemctl --user status hermes-gateway`, `ls /proc/$PID/fd | wc -l`, and `grep '^Threads' /proc/$PID/status`. In the confirmed incident, the gateway was active for 4 days but pinned at the soft limit (`FDSize 1024`), had ~828 Python threads, and `lsof -p $PID` showed ~407 TCP sockets stuck in `CLOSE_WAIT`. `py-spy dump --pid $PID` showed hundreds of idle `asyncio_*` threads, pointing to a leak in the sync->async bridge path rather than a single bad Slack request.

40. Root cause and permanent fix for the FD leak (Apr 14 2026): The leak came from gateway sync callers running async tool code via a fresh `ThreadPoolExecutor(max_workers=1)` + `asyncio.run()` per call in `model_tools._run_async()` and `agent/context_references.preprocess_context_references()`. Over long-lived Slack sessions, that pattern accumulated idle executor threads and related sockets. Permanent fix: replace the per-call thread creation with one persistent bridge event loop thread and dispatch via `asyncio.run_coroutine_threadsafe(...)`. After patching, run `python -m py_compile model_tools.py agent/context_references.py` to verify syntax.

41. Safe mitigation sequence before restart (Apr 14 2026): If the gateway is already wedged, raise the live file limit first so Pilot can breathe before you bounce it: `prlimit --pid $(systemctl --user show -p MainPID --value hermes-gateway) --nofile=16384:16384`. Then kill any stale child preview servers attached to the gateway process group, especially leftover `npm run preview -- --host 0.0.0.0 --port 4173` Vite processes from report prototyping. Permanent service hardening: add `LimitNOFILE=16384` to `~/.config/systemd/user/hermes-gateway.service`, run `systemctl --user daemon-reload`, and then restart the gateway from SSH with `systemctl --user restart hermes-gateway`. The live `prlimit` helps immediately, but the code fix and clean state only take effect after the restart.

41b. Persistent watcher added (Apr 14 2026): A user-level systemd timer now runs `/root/pilot-work/scripts/gateway_watchdog.py` every 5 minutes via `pilot-gateway-watchdog.timer`. It writes state to `/root/.hermes/watchdog/gateway_watchdog_state.json`, appends scans to `/root/.hermes/watchdog/gateway_watchdog.log`, and DMs Matthew only on state changes or cooldown expiry. It watches four live signals: fd usage, thread count, CLOSE_WAIT sockets, and stale preview child processes. Use `systemctl --user status pilot-gateway-watchdog.timer` and `systemctl --user list-timers --all | grep pilot-gateway-watchdog` to verify. To seed state without sending an alert while you're already working the incident, run `python3 /root/pilot-work/scripts/gateway_watchdog.py --sync-state-only`.

42. Model mismatch: .env has LLM_MODEL=anthropic/claude-opus-4.6 but config.yaml has model.default: minimax/minimax-m2.7. Gateway likely used Opus (expensive) while Reactor used MiniMax M2.7. Check which is actually being used in the gateway logs.

40. Gateway Telegram/Matrix disable: Tokens commented out in /root/.hermes/.env to reduce reconnect noise. Gateway now runs with "1 platform(s)" (Slack only). Logs show "✗ telegram failed to connect" and "✗ matrix error" still appearing from old cached connections. Need to fully remove these platforms from gateway initialization to stop the noise.

41. Gateway Socket Mode events not received: Despite showing "Socket Mode connected", the gateway doesn't process incoming message events. Only cron jobs run. Check reactor logs - if reactor shows "MSG: Matthew in DM" but gateway shows no corresponding event, the Socket Mode connection is routing events to reactor only. Restarting gateway multiple times doesn't fix it - the Socket Mode connection itself may be the issue.
30. Cloudflare named tunnel: Use `docker run -d --name pilot-tunnel --restart always --network host cloudflare/cloudflared:latest tunnel --no-autoupdate run --token TOKEN`. The --network host flag is critical so the container can reach localhost:3000 on the VPS. Token is from Cloudflare Zero Trust dashboard.
31. VPS Python deps: The VPS runs Ubuntu 24.04 with Python 3.12. Use `pip3 install --break-system-packages` flag (Ubuntu 24 enforces PEP 668). Flask, gunicorn, slack-bolt, slack-sdk are installed.
32. Budget guardrails in reactor: ALWAYS check cost_tracker.json before making reactor changes. The daily limit is $5, warning at $3. Auto-downgrade tiers instead of blocking. Track costs per LLM call using OpenRouter's usage response data.
33. Reactor model routing: Tier selection is automatic based on triage reason. "strategy/proposal/audit/complex" → Opus. "question/help/draft/update" → Sonnet. Everything else → Haiku. This keeps daily cost to ~$1-2 under normal traffic.

## Persistent Context System (~/pilot-context/)

The context builder runs every 4 hours via VPS crontab (not Hermes cron). It scans all 27 Slack
channels via API (expanded Apr 4 from 18 to include ShopStack, House Dental, Cedar Content
Platform, SEO Team, all Pilot AI channels, and apr-tech), loads tasks, events, pending
approvals, and writes context-now.md. The reactor's ACTIVE_CHANNELS was also updated to match.

**VPS crontab:** `15 */4 * * * cd /root/pilot-context && /usr/bin/python3 context_builder.py`
**Output:** ~/pilot-context/context-now.md (~10KB, refreshed every 4h, 21+ active channels)
**Script:** ~/pilot-context/context_builder.py

### What context-now.md contains:
- Channel activity (hours since last message, latest message preview per channel)
- Open questions and blockers per channel
- Pilot's active tasks from pilot-tasks.json
- Unprocessed real-time events (mentions, messages)
- Pending approval decisions

### Knowledge Accumulation Loop
The context builder also WRITES BACK to the knowledge graph. When it scans channels and finds
recent activity for a client, it appends a timestamped entry to that client's note.
This is how Pilot's institutional memory grows over time without manual updates.

## Knowledge Graph (~/pilot-knowledge/notes/)

Obsidian-style markdown notes with [[backlinks]]. 20+ notes initialized from agency context.
- clients/: One per client (cedar-gold-group.md, etc.)
- people/: One per team member
- projects/, meetings/, decisions/: Created as events happen
- Builder: ~/pilot-knowledge/build_graph.py
- Functions: create_client_note(), add_event_to_note(), search_notes(), create_decision_note()

## Deploying Changes to VPS

All persistent infrastructure lives on the Hostinger VPS (187.124.234.21), NOT in the Hermes
container. The container is ephemeral. To deploy changes:

```python
import paramiko
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('187.124.234.21', username='root', password='***REDACTED***')
# Upload: sftp.put(local, remote)
# Run: ssh.exec_command(cmd)
# Restart reactor: ssh.exec_command('systemctl restart pilot-approval')
```

Key lesson: pip3 install paramiko at the start of every session (it doesn't persist in container).
Always test imports on VPS before restarting services.

## SEO Gap Finder Tool

Built and tested at /root/seo-gap-tool/ (also deployed as Docker container seo-gap-tool on VPS port 8000):
- FastAPI + HTMX + Tailwind + SQLite + Firecrawl
- Crawls websites, compares against ideal electrician page taxonomy
- Identifies missing service pages, location pages, combos, blog gaps
- Generates programmatic pages from templates
- Tested: Saiyan Electric (80 pages crawled, 128 gaps found, 60.2% coverage)
