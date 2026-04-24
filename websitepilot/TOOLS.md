# TOOLS — WebsitePilot

## Model providers

| Provider  | Model                    | Stage              | Env var              |
|-----------|--------------------------|--------------------|----------------------|
| Anthropic | claude-sonnet-4-20250514 | Demo brief         | `ANTHROPIC_API_KEY`  |
| Anthropic | claude-opus-4-20250514   | Close pitch (adaptive thinking) | `ANTHROPIC_API_KEY` |
| Anthropic | claude-haiku-4-5-20251001 | Visual QA comparison | `ANTHROPIC_API_KEY` |

Stages 2/3 (AuditPilot, StrategyPilot) choose their own models. The
WebsitePilot engine does not override them.

## Data / scraping

| Service      | Used by                          | Purpose                         |
|--------------|----------------------------------|---------------------------------|
| Firecrawl    | AuditPilot (via delegation)      | Site crawl for audit evidence   |
| DataForSEO   | AuditPilot, StrategyPilot        | Rankings, SERP, keyword volumes |
| Playwright   | `visual_qa.py`                   | Local + live screenshot capture |

## Shared internal modules

| Module                                       | Why                                      |
|----------------------------------------------|------------------------------------------|
| `backend/utils/docx_generator.py`            | Branded `.docx` rendering for the bundle |
| `backend/utils/db.py`                        | Job persistence                          |
| `agents.auditpilot.engine.run_audit`         | Stage 2                                  |
| `agents.strategypilot.engine.run_strategy`   | Stage 3                                  |
| `agents.autopilot.sprint_runner.run_sprint`  | Stage 5 (demo handoff)                   |
| `agents._shared.load_shared_skill`           | Brand / doc-delivery doctrine            |

All cross-agent imports are **lazy** (inside the stage function) so
WebsitePilot imports cleanly even when a sibling is unavailable.

## Agent-specific storage

| Path                                                  | Contents                   | Lifetime       |
|-------------------------------------------------------|----------------------------|----------------|
| `websitepilot/templates/sources/`                     | 6 source archetype mirrors | Committed; refresh external mirrors via `sync.py` |
| `websitepilot/style-families/`                        | Family doctrine + starter code | Committed |
| `$VISUAL_QA_SCREENSHOT_DIR` (default `/tmp/autopilot_visual_qa`) | Comparison screenshots | Ephemeral |

## Config / feature flags

- `generate_demo=False` → skip AutoPilot handoff, still ship
  audit+strategy+brief+close.
- `style_family` → explicit family override before scaffold selection.
- `tier` override → force `light` / `standard` / `full` instead of
  auto-inferring from `lead_value`.
- `design_template` → comma-separated template ids (first wins) to
  override the auto-selector.

## External deployment notes

- Railway runs Python 3.11 — PEP 604 unions work there. We use
  `typing.Optional` locally for Python 3.9 parity.
- Playwright browsers must be installed on the deploy target for
  `visual_qa.py` to work (`playwright install chromium`).
