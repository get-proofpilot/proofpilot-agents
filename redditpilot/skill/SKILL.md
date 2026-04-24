---
name: redditpilot
description: >
  RedditPilot v2.0: ProofPilot's named agent for Reddit marketing automation.
  19,995 lines across 37 Python modules + dashboard + deploy. Full MiloAgent
  integration complete. AI-powered discovery, opportunity scanning, content gen
  with anti-AI-detection, self-learning, A/B testing, web dashboard, Slack
  approval, cookie-based Reddit, resource monitoring. Multi-client agency model.
  Codebase at /root/redditpilot/. Aliases: RedditPilot, Reddit Pilot,
  "reddit agent", "reddit bot", "post on reddit", "reddit marketing"
tags: [agents, reddit, marketing, automation, proofpilot, social-media, content-generation, dashboard, fastapi]
---

# RedditPilot v2.0 — ProofPilot Reddit Marketing Agent

## Location
Codebase: `/root/redditpilot/redditpilot/`
Config template: `redditpilot init` creates `~/.redditpilot/config.yaml`
Database: `~/.redditpilot/redditpilot.db`
Dashboard: `redditpilot dashboard` → http://localhost:8420

## Architecture

Full pipeline: **DISCOVER → SCAN → SCORE → GENERATE → CHECK → APPROVE → POST → LEARN**

Built by merging RedditPilot's multi-client agency architecture with MiloAgent's operational depth (31K lines). Keeps RP's typed dataclass config, Slack approval, and multi-client model as foundation; grafts Milo's safety, intelligence, dashboard, and self-learning.

### Module Map (19,995 lines: 17,142 Python + 2,853 static)

#### Core (4 modules)
| Module | Path | Lines | Purpose |
|--------|------|-------|---------|
| Config | `core/config.py` | 220 | YAML + env var config. Dataclasses: RedditAccount, ClientProfile, LLMConfig, SafetyConfig, SlackConfig |
| Database | `core/database.py` | 977 | 17+ table SQLite with WAL. Schema migration system (v1→v2). Thread-safe write lock. Auto-maintenance (WAL checkpoint, cleanup). New tables: subreddit_intel, decision_log, failure_patterns, account_health |
| Reddit Client | `core/reddit_client.py` | 369 | PRAW wrapper. Human-like delays (Gaussian jitter). AccountPool with round-robin |
| Resource Monitor | `core/resource_monitor.py` | 674 | CPU/RAM/disk monitoring. Auto-pause on pressure. Throttle factor. get_status_dict() for dashboard API. Cross-platform (Linux primary, macOS fallback) |
| Business Manager | `core/business_manager.py` | 551 | Config hot-reload (mtime polling). Client CRUD with YAML persistence. DB sync. on_reload() callbacks |
| Cookie Manager | `core/cookie_manager.py` | 396 | JSON cookie storage per account. Browser paste import (document.cookie + Netscape). Expiry checking. Thread-safe |

#### Engines (9 modules)
| Module | Path | Lines | Purpose |
|--------|------|-------|---------|
| Discovery | `engines/discovery.py` | 237 | Subreddit discovery: seed subs + keyword search + local city + AI verification |
| Scanner | `engines/scanner.py` | 369 | 6-dimension scoring: relevance, intent, engagement, freshness, competition, SEO. 20+ intent patterns |
| Strategy | `engines/strategy.py` | 875 | Adaptive scoring (0-10). Client selection with weighted round-robin. Warmth stages (new/warming/established/trusted). Smart scheduling. Keyword/subreddit expansion from learning |
| Content Gen | `engines/content_generator.py` | 434 | 6 tone profiles, persona system, anti-AI rules from BotBuster, artifact cleanup |
| LLM Client | `engines/llm_client.py` | 195 | Multi-provider: OpenAI, Anthropic, Groq, Ollama. Automatic failover |
| Learning | `engines/learning.py` | 1,131 | Self-learning: tone/timing/keyword/post-type weights, sentiment analysis (keyword-based, no LLM), prompt evolution, LLM-powered discovery, performance benchmarks, strategy rules. Recency decay (0.95) |
| A/B Testing | `engines/ab_testing.py` | 613 | Tests: tone, post_type, content_length, promo_ratio. Balanced assignment. 15% significance threshold. Auto-create experiments. Max 2 per client. 14-day expiry. Winners auto-applied |
| Subreddit Intel | `engines/subreddit_intel.py` | 814 | Public JSON API analysis. Opportunity scoring (0-10). Rate-limited. Staleness refresh. get_best_subreddits(client_id) |
| Research Engine | `engines/research_engine.py` | 577 | Trend discovery, knowledge base, industry news (Google News RSS), competitor tracking. Multi-client |
| Content Curator | `engines/content_curator.py` | 484 | Article curation from news + subreddits. LLM commentary generation. Ready-to-share items |

#### Safety (5 modules)
| Module | Path | Lines | Purpose |
|--------|------|-------|---------|
| Account Manager | `safety/account_manager.py` | 793 | Karma tiers (new=3, growing=7, established=12, veteran=20). Round-robin + LRU fairness. Health states (healthy/cooldown/warned/banned). Per-client assignment. Hot-reload. Thread-safe |
| Ban Detector | `safety/ban_detector.py` | 618 | Multi-indicator shadowban detection via public Reddit JSON API. 4 checks: profile 404, low-score comments, removed comments, hidden permalinks. Confidence scoring (none/low/high). Rotating User-Agent. Caching |
| Content Dedup | `safety/content_dedup.py` | 454 | Jaccard word-overlap + trigram n-gram similarity. 6 checks: hash, target, thread, Jaccard, trigram, client-subreddit recency. Fail-safe (blocks on DB error). DedupResult dataclass |
| Content Validator | `safety/content_validator.py` | 791 | Merged: 55+ bot patterns (RP + Milo). BotBuster AI scoring (0-10, threshold 4.0). Quality score (0.0-1.0, threshold 0.6). Business fact-checking, pricing claims, organic leakage, URL accuracy. Subreddit restrictions. ValidationResult dataclass |
| Rate Limiter | `safety/rate_limiter.py` | 160 | Karma tier daily caps, circuit breaker, hourly limits, Gaussian jitter delays |
| Captcha Solver | `safety/captcha_solver.py` | 278 | OCR fallback: ddddocr > Tesseract > give up. Image preprocessing. Stats. Cooldown on failure |

#### Platforms (1 module)
| Module | Path | Lines | Purpose |
|--------|------|-------|---------|
| Reddit Web | `platforms/reddit_web.py` | 1,208 | Cookie-based Reddit (no API app needed). Login, read, comment, post via web endpoints. Session persistence. CSRF handling. Circuit breaker. Same API as PRAW client |

#### Dashboard (2 modules + 4 static files)
| Module | Path | Lines | Purpose |
|--------|------|-------|---------|
| Web Dashboard | `dashboard/web.py` | 1,450 | FastAPI. 28 API endpoints. Auth (bcrypt). WebSocket logs. Resource time-series. Client CRUD. Emergency stop |
| Static Assets | `dashboard/static/` | 2,853 | Cosmic dark theme (blue accent). Chart.js. Heatmap. Funnel. Client filter. Landing page |

#### Other
| Module | Path | Lines | Purpose |
|--------|------|-------|---------|
| Orchestrator | `orchestrator.py` | 1,336 | APScheduler. Hard timeouts (scan=400s, act=150s). Resource-aware. Emergency stop. Signal handlers. 6+ scheduled jobs |
| CLI | `cli.py` | 824 | Click CLI. 15+ commands. Groups: client, account. Commands: dashboard, doctor, discover, scan, generate, post, cycle, run, learn, monitor, report, validate, init |
| Slack | `integrations/slack_approval.py` | 259 | Block Kit Approve/Edit/Reject buttons, performance reports |
| Prompts | `prompts/` | 12 files | External templates: 4 comment types, 2 post types, system base, anti-AI rules, 4 personas. Home services focused |
| Deploy | root level | 6 files | Dockerfile, docker-compose.yml, deploy.sh, redditpilot.service, .env.example, requirements.txt |

## CLI Commands

```bash
redditpilot init                                  # Create config template
redditpilot validate                              # Check config
redditpilot doctor                                # System health check (config, DB, Reddit API, disk/RAM)
redditpilot dashboard --port 8420                  # Start web dashboard
redditpilot discover --client acme-plumbing        # Find subreddits
redditpilot scan --client acme-plumbing            # Find opportunities
redditpilot generate --client acme-plumbing        # Generate content (→ Slack approval)
redditpilot post                                   # Post all approved content
redditpilot cycle --client acme-plumbing           # Full pipeline once
redditpilot run                                    # Continuous scheduler
redditpilot learn                                  # Run learning cycle
redditpilot monitor                                # Check account health/shadowbans
redditpilot report --days 7                        # Performance report
redditpilot client list                            # List all clients
redditpilot client add                             # Interactive client creation
redditpilot client show acme-plumbing              # Client detail
redditpilot account list                           # List all accounts
redditpilot account check-shadowban username       # Check specific account
```

## Dashboard API Endpoints (28 total)

```
GET  /health                    No auth — Docker healthcheck
POST /api/auth/login            Username/password → session token
GET  /api/status                Paused, mode, uptime, clients, emergency
GET  /api/stats                 24h action stats by client/type/subreddit
GET  /api/clients               All clients with action counts
GET  /api/clients/{slug}        Client detail with subreddits, performance
GET  /api/accounts              Accounts with health, karma, daily usage
GET  /api/opportunities         Pending opportunities by score
GET  /api/actions               Recent actions feed
GET  /api/schedule              Scheduled jobs with countdown
GET  /api/insights              Learning data, A/B tests, best tones/hours
GET  /api/server                CPU, RAM, disk, RSS, DB size
GET  /api/logs                  Log entries with level/category filter
GET  /api/decisions             Decision audit log
GET  /api/failures              Failure patterns
GET  /api/history               Hourly/daily aggregation for charts
GET  /api/comments              Comments with status/client filter
GET  /api/subreddit-intel       Subreddit intelligence data
GET  /api/alerts                System alerts
GET  /api/summary               Dashboard header data
GET  /api/performance           Performance scoring
GET  /api/funnel                Opportunity funnel visualization
GET  /api/heatmap               Activity by day/hour
WS   /ws/logs                   Real-time WebSocket log stream
POST /api/control/{action}      scan/learn/discover/pause/resume/emergency_stop
```

## How It Was Built (Methodology)

This is the key reusable pattern. Building RedditPilot v2 from MiloAgent was a 4-phase clone-and-adapt operation:

### Step 1: Deep Analysis
- Ran parallel subagents to read EVERY file in both codebases simultaneously
- Created a module-by-module comparison report (COMPARISON_REPORT.md)
- Classified each module: CLONE from Milo / KEEP RP / MERGE both
- Counted lines to understand scope (Milo=31K, RP=4K)

### Step 2: Phased Execution with Parallel Subagents
- 4 phases, each dispatched as 3-4 parallel delegate_task calls
- Each subagent got: (a) source file to read, (b) target file to create, (c) specific adaptation requirements, (d) which codebase patterns to use
- Key instruction pattern: "Read Milo's X, read RP's Y, create Z that keeps RP's [specific features] and adds Milo's [specific features]"

### Step 3: Architecture Decisions
- KEEP RP's package structure (relative imports), Config dataclasses, multi-client model
- REPLACE RP's `schedule` library with APScheduler
- MERGE validators by taking both pattern sets + both scoring approaches
- ADAPT Milo's single-project model to multi-client by adding client_id to every method
- REBRAND dashboard (Milo pink → blue accent, projects → clients, remove Telegram)

### Step 4: Critical Pitfalls Discovered
1. Subagents must be told to read BOTH source files, not just the one being cloned — they need to understand the target codebase's conventions
2. Specifying exact method signatures and table schemas in the subagent context prevents mismatched APIs
3. "KEEP all existing features AND ADD" is better than "rewrite" — prevents accidental feature loss
4. Dashboard frontend requires separate subagent from backend (too much code for one context window)
5. Always verify imports work after each phase before starting the next

## Anti-AI Detection

The content validator scores text on two scales:
- **AI score** (0-10, BotBuster): threshold 4.0, higher = more bot-like
- **Quality score** (0.0-1.0, Milo): threshold 0.6, lower = worse

| Signal | Score Impact |
|--------|-------------|
| Formulaic phrases ("furthermore", "delve deeper") | +1.2 each |
| Missing contractions (text >150 words) | +1.8 |
| Complex synonyms ("utilize", "leverage") | +0.8 each |
| Missing personal markers ("imo", "honestly") | +1.0 |
| Low sentence length variance | +1.5 |
| Emoji presence | -1.0 (bonus) |
| Short comments (<25 words) | -2.0 (bonus) |
| 55+ compiled bot patterns from Milo | variable deductions |
| Business fact-checking (wrong name/URL/pricing) | hard block |

## Running Instance

Dashboard currently live at `http://187.124.234.21:8420`
- Login: admin / proofpilot2026
- Venv: `/root/redditpilot/.venv/`
- Launch: `cd /root/redditpilot && source .venv/bin/activate && REDDITPILOT_WEB_USER=admin REDDITPILOT_WEB_PASS=proofpilot2026 redditpilot dashboard`
- Config: `~/.redditpilot/config.yaml`
- LLM: OpenRouter with `xiaomi/mimo-v2-flash:free` (free tier, 262K context)
- Sample client: Acme Plumbing (Phoenix, AZ plumbing)

## LLM Provider: OpenRouter

The LLM client has a generic OpenAI-compatible handler that routes `openrouter` to `https://openrouter.ai/api/v1`. Config:

```yaml
llm:
  primary_provider: "openrouter"
  primary_model: "xiaomi/mimo-v2-flash:free"
  primary_api_key: "***REDACTED***"   # or set REDDITPILOT_LLM_API_KEY env var
```

Other free OpenRouter models that work: `google/gemini-2.0-flash-exp:free`, `meta-llama/llama-3.3-70b-instruct:free`

## Setup Requirements

1. Reddit app credentials from reddit.com/prefs/apps (script type) — OR use cookie mode (no app needed)
2. At least one aged Reddit account (30+ days, 100+ karma recommended)
3. LLM API key (OpenRouter recommended — free tier models available)
4. Optional: Slack bot token for approval workflow
5. Optional: Set REDDITPILOT_WEB_USER/REDDITPILOT_WEB_PASS for dashboard auth

## Docker Deployment

```bash
# Quick start
cp .env.example .env
# Edit .env with credentials
./deploy.sh --setup    # First time
./deploy.sh --up       # Start
./deploy.sh --logs     # Watch
./deploy.sh --backup   # Backup data
```

## Pitfalls

1. Reddit requires OAuth app approval for new apps. Register early. OR use cookie mode to skip entirely.
2. March 2026: Reddit launched human verification for bot-like accounts
3. Shadowbans are SILENT — the ban_detector checks via public API (no auth risk)
4. Commercial API: $0.24/1000 calls. Free tier = 100 QPM.
5. New accounts posting immediately = instant ban. Warm accounts first.
6. The learning engine needs 3+ data points before weights are meaningful.
7. A/B experiments auto-cancel after 14 days if insufficient data.
8. Cookie-based mode (reddit_web.py) requires periodic re-login as cookies expire.
9. Dashboard password auto-generated if not set — check logs for it.
10. Schema migrations run automatically on first DB access after upgrade.
11. passlib + bcrypt version conflict: bcrypt 5.x breaks passlib. Pin `bcrypt<4.1` in requirements.
12. VPS uses externally-managed Python — must use venv: `python3 -m venv .venv && source .venv/bin/activate && pip install -e .`
13. Install dashboard deps separately: `pip install fastapi uvicorn apscheduler passlib 'bcrypt<4.1' aiohttp`
14. OpenRouter model slugs include tier suffix: `xiaomi/mimo-v2-flash:free` (not just `mimo-v2-flash`)
15. GitHub repo: `https://github.com/get-proofpilot/redditpilot` (private). Pushed via `gh auth setup-git` + PAT from session history. Account: `get-proofpilot`. Token at `~/.config/gh/hosts.yml`.
16. Dashboard process command: `cd /root/redditpilot && source .venv/bin/activate && REDDITPILOT_WEB_USER=admin REDDITPILOT_WEB_PASS=proofpilot2026 redditpilot dashboard --host 0.0.0.0 --port 8420`
17. When cloning a large open-source codebase into a new project, the winning pattern is: (a) parallel subagents to read ALL files in both codebases, (b) generate a comparison report classifying each module as CLONE/KEEP/MERGE, (c) execute in phases with 3-4 parallel subagents per phase, (d) verify imports after each phase before starting the next. Tried to do this session — 20 tasks across 4 phases, all completed via delegate_task batches.
18. `gh repo create` under an org fails if the PAT doesn't have org-level CreateRepository perms. Fallback: create under the personal account (`get-proofpilot/redditpilot`), not the org (`proofpilot/redditpilot`).
19. `gh repo create --source . --push` requires at least one commit to exist first. Always `git commit` before `--push`.
20. `git push` fails with "could not read Username" if gh credential helper isn't set. Fix: `gh auth setup-git` before pushing.
