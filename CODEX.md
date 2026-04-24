# CODEX.md — Instructions for ChatGPT Codex

Codex: you're running inside `~/proofpilot-agents/`. This is a local skill package — no server, no runtime. The model (you) IS the runtime.

## On every task

1. **Read `AGENTS.md` first** to pick the right pilot.
2. **Read `<pilot>/skill/SKILL.md`** for the full doctrine.
3. **Read any `references/` linked from SKILL.md** before executing — especially `autopilot/skill/references/three-brain-architecture.md`.
4. **Do all client work in `/tmp/<client>-<pilot>/`** — NEVER modify files in this package.
5. **Build + verify** before declaring done. For design pilots: `npm run build` must pass, then screenshot via Playwright.

## Don't

- Don't invoke Python runtime (`engine.py`, `router.py`, `stages.py`) — they're stripped from this package and belong to the Railway backend.
- Don't pull in agent-hub imports. This package is standalone.
- Don't add colors / fonts / motifs the Brand Brain didn't find.
- Don't declare success without the "remove the logo" test or equivalent quality gate.

## Tool expectations

Most pilots need:

- **Filesystem** — read, write, edit
- **Bash** — `npm`, `git`, `rsync`, `curl`, `python3` (for Pillow pixel analysis)
- **Playwright** — for brand archaeology (site capture), QA screenshots, remote site crawls
- **Recraft** (optional) — for custom image generation when authentic assets are missing
- **Firecrawl** (optional) — for batch brand extraction

If any of these aren't available, degrade gracefully and tell the user what you skipped.

## Update policy

This package is synced from `~/ProofPilot/agent-hub/backend/agents/` via rsync. If doctrine looks stale, ask the user — don't edit it.
