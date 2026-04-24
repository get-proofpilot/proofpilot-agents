# Model Routing — Claude + Gemini Subagent Pattern

> How to split the three-brain pipeline between Claude (orchestrator, Brand Brain, Website Brain) and Gemini 3.1 Pro (Designer Brain).

## TL;DR

Claude drives the pipeline end-to-end **except for Stage 3 — Designer Brain**, which is dispatched to Gemini 3.1 Pro via the `scripts/gemini-dispatch.sh` helper. Gemini produces the `design-spec.md`; Claude then executes it.

**Why this split.** In head-to-head comparison on the Red Rock Family Dentistry demo (April 2026), Gemini produced cleaner, tighter, more disciplined design specs. Claude over-stuffed sections and chased Glinic patterns for their own sake. Gemini's restraint shipped a better demo. Meanwhile Claude's Playwright orchestration, pixel analysis, and multi-file React/TS editing remain stronger than Gemini's — so those stages stay with Claude.

## When to use this routing

| Condition | Routing |
|-----------|---------|
| Flagship client demo where design quality is the differentiator | **Route Designer Brain to Gemini** (this doc) |
| Fast batch / internal work where speed beats polish | Claude-only (skip Gemini) |
| Truly flagship one-off — Matthew will pick the winner | Run both in parallel, human picks |

Default for any new WebsitePilot / AutoPilot demo run is the Gemini routing unless the user opts out.

## The helper

```bash
./scripts/gemini-dispatch.sh <brief-file> \
  --cwd /tmp/<client> \
  --log /tmp/<client>/designer-brain.log
```

Requirements:
- `GEMINI_API_KEY` env var (Google AI Studio key)
- `gemini` CLI installed: `npm i -g @google/gemini-cli`
- The `<brief-file>` must be self-contained — Gemini starts with no conversation context

The helper runs `gemini --model gemini-3.1-pro-preview --yolo` with the brief piped on stdin. It logs to a timestamped file, returns Gemini's exit code, and prints the first 40 lines of `DONE.md` when Gemini produces one.

## The Designer Brain brief template

When dispatching to Gemini, the brief must include:

1. **Client facts** — ideally a path to the already-written `brand-brain.json`. Do not re-summarize; hand Gemini the file.
2. **Locked brand system** — crimson/motif/palette/typography already committed by earlier stages. Gemini does NOT re-pick these.
3. **Inspiration reference** — URL to the design target (e.g. Glinic dental theme). Gemini can navigate to it.
4. **Output contract** — exact path for `design-spec.md` and what sections it must contain (11 numbered sections per `design-strategist.md`).
5. **Hard rules** — the preserve/elevate/invent ladder, "one motif one transition," no-invented-colors rule, etc. Paste these verbatim from `design-strategist.md`.
6. **Working dir** — `/tmp/<client>/` — Gemini writes `design-spec.md` here.

See `references/design-strategist.md` for the spec template Gemini must fill.

Example brief structure:

```markdown
# Gemini Designer Brain — <Client>

## Your role
Stage 3 of AutoPilot's three-brain architecture. Read brand-brain.json, decide
preserve/elevate/invent for each brand element, produce design-spec.md.

## Inputs
- Brand Brain output: /tmp/<client>/brand-brain.json
- Strategy notes: /tmp/<client>/strategy.md
- Doctrine: ~/proofpilot-agents/autopilot/skill/references/{design-strategist,gold-standard-playbook,three-brain-architecture}.md
- Inspiration: <url-to-reference-site>

## Output
/tmp/<client>/design-spec.md following the template in design-strategist.md.

## Hard rules (do not violate)
- Don't add colors the logo doesn't have.
- Don't replace typography with brand equity unless the current type is genuinely generic.
- One motif, one section-transition signature.
- Every addition justified in one sentence.
```

## Orchestration flow (Claude side)

```
Claude: Stage 1 — Research (Playwright, WebFetch)
Claude: Stage 2 — Brand Brain (Playwright + Python Pillow)
Claude: write designer-brain-brief.md in /tmp/<client>/
Claude: dispatch — ./scripts/gemini-dispatch.sh /tmp/<client>/designer-brain-brief.md --cwd /tmp/<client>
Gemini: produces /tmp/<client>/design-spec.md + DONE.md
Claude: reads design-spec.md
Claude: Stage 4 — Website Brain (npm install, apply Implementation Order, build, serve)
Claude: Stage 5 — Images
Claude: Stage 6 — QA (Playwright screenshots, "remove the logo" test)
```

## Fallback

If Gemini times out, errors, or the API key is invalid, Claude falls back to running Designer Brain itself. Do not block the pipeline on Gemini availability — the quality routing is best-effort, not mandatory.

## Cost + latency

- Gemini 3.1 Pro Preview: ~$0.05-$0.15 per Designer Brain run (depends on brief size + tool use).
- Latency: 90-300 seconds depending on how much Gemini explores files.
- Claude subagent (fallback): comparable cost, similar latency.

## Failure modes we've seen

| Mode | Fix |
|------|-----|
| "API key expired" 400 error | Renew at https://aistudio.google.com/apikey |
| Gemini hung / timeout | Raise timeout to 600s; if still hanging, kill + fall back to Claude |
| Gemini tried to re-decide palette | Brief wasn't explicit — tighten the "locked brand system" section with the exact tokens |
| Gemini wrote design-spec.md in the wrong dir | Pass `--cwd /tmp/<client>` to the helper so its CWD is set correctly |

## Never route to Gemini

- Brand Brain — needs Playwright MCP + Python Pillow orchestration (better in Claude)
- Website Brain — large multi-file TS/TSX edits (better in Claude)
- QA — Playwright screenshot orchestration (better in Claude)
- Pilot-to-pilot choreography — Claude owns the outer loop

Gemini's single job is Designer Brain. Don't scope-creep it.
