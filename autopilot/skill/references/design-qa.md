# Design QA — Cheap-Gemini Vision Critique Loop

> After Website Brain builds the demo, run this QA loop before declaring done. A cheaper Gemini model (2.5-flash, vision-enabled) critiques the live render against the design-spec. Claude applies the concrete fix list. Up to 2 iterations.

---

## Why this exists

Gemini 3.1 Pro writes great design specs, but **spec ≠ render**. Two kinds of issues slip through:

1. **Spec-level gaps.** The spec didn't mention heading alignment per section. Gemini assumed left-aligned. The render needed center-aligned on the stats band + CTA. Claude executed faithfully but the result felt off.
2. **Implementation drift.** Claude interpreted a vague "stat band" spec into an inline row instead of a prominent band. Both are defensible reads of the spec.

A vision model looking at the rendered result + the spec can catch both. And at Flash prices (~$0.01/call with vision) it's ~10× cheaper than asking Gemini 3.1 Pro to review.

## The helper

`scripts/gemini-design-qa.sh`

```bash
./scripts/gemini-design-qa.sh <client-demo-dir> \
  --spec /tmp/<client>/design-spec.md \
  --brand /tmp/<client>/brand-brain.json \
  [--model gemini-2.5-flash] \
  [--port 5178] \
  [--out /tmp/<client>/qa-feedback.md]
```

What it does:
1. Starts (or reuses) the dev server on the given port.
2. Captures hero viewport screenshot via Playwright.
3. Captures full-page screenshot via Playwright.
4. Sends both images + `design-spec.md` excerpt + brand-brain summary to gemini-2.5-flash with vision.
5. Prompts: *"You are a senior web designer reviewing a demo built against this spec. Compare the rendered screenshots to the spec. Flag misalignments, spacing issues, typographic drift, visual hierarchy breakdowns, and any section that doesn't earn its place. Output a specific fix checklist — don't say 'make it better,' say 'the H2 on line X is left-aligned but content below is centered; change text-align to center.'"*
6. Writes `/tmp/<client>/qa-feedback.md`.

Claude reads the feedback file, applies fixes, loops.

## The QA feedback contract

Gemini 2.5 Flash writes this exact structure to `qa-feedback.md`:

```markdown
# Design QA — <client> — Round <N>
Date: 2026-04-24T...
Reviewer: gemini-2.5-flash (vision)
Overall score: X/10

## Must-fix (block ship)
- [ ] <specific, actionable fix with file + line hint when possible>
- [ ] ...

## Should-fix (polish)
- [ ] ...

## Won't fix (intentional OR out of scope)
- ...

## Overall impression (1-2 sentences)
<summary>
```

If **Must-fix is empty** and **score ≥ 8**, the demo ships. Otherwise Claude applies fixes and re-runs QA.

## Loop control

- Max 2 QA iterations. After round 2, ship whatever state you're in and note remaining issues in `DONE.md`.
- If Must-fix is empty on round 1 → ship.
- If Must-fix is stuck (same issue repeats on round 2) → likely a design-spec gap; surface to Matthew for a judgment call rather than looping forever.

## What to critique (the prompt sent to Flash)

The prompt gives Flash a checklist of common failures to look for:

1. **Heading alignment mismatch** — centered content with left-aligned heading (or vice versa)
2. **Eyebrow alignment doesn't match its H2**
3. **Hero headline weight / size / line-height** feels template-default, not spec-authored
4. **Stat row treatment** — generic grid vs. the spec's numeral style
5. **Section whitespace rhythm** — inconsistent vertical padding
6. **Motif usage** — motif present or invisible? Overused or absent from spec'd placements?
7. **Section transitions** — does the signature move apply consistently?
8. **Button discipline** — are primary/secondary/tertiary styles consistent?
9. **Authentic photo treatment** — spec said grayscale unified; is it applied?
10. **Color purity** — any Bootstrap blue / template-default colors slipped through?

## Model choice

- **Default:** `gemini-2.5-flash` (vision, cheap, fast)
- Cost: ~$0.01 per QA call at two screenshots + ~2KB text context. Two iterations = $0.02.
- Use `gemini-3.1-pro-preview` for QA only if Flash keeps missing obvious issues (rare; if this keeps happening, the spec is the problem, not the reviewer).

## Fallback

If Gemini Flash is unreachable or GEMINI_API_KEY is invalid, skip the QA loop and ship the build. Log the skip in `DONE.md`. The loop is quality-improvement, not a blocker.

## Where this plugs into the pipeline

```
Stage 1 — Research (Claude)
Stage 2 — Brand Brain (Claude)
Stage 3 — Designer Brain (Gemini 3.1 Pro via gemini-dispatch.sh)
Stage 4 — Website Brain (Claude)
Stage 5 — Images (Claude)
Stage 6 — QA PLAYWRIGHT PASS (Claude — screenshots + functional verification)
Stage 6b — DESIGN QA LOOP (Gemini 2.5 Flash via gemini-design-qa.sh)  ← new
Stage 7 — Ship or escalate
```

## Example QA output (from the first Richardson Pest run)

```markdown
## Must-fix (block ship)
- [ ] Services section (src/components/rpm/Services.tsx:38) — H2 "Three services. One family doing them right." is text-left but the 3-card grid below is visually centered with equal-width cards. Change H2 + eyebrow to text-center for rhythm match.
- [ ] Stats row in Hero (src/components/rpm/Hero.tsx:92) — "14+ $85 Sat 11" renders as small inline text. Spec §9 mandated stat-counter treatment with Fraunces 900 144px numerals. Extract into a dedicated trust-bar section OR bump to prominent visual weight.

## Should-fix (polish)
- [ ] CTA band heading "Same-day service. Saturday hours. One call." is left-aligned but the button below is also left-aligned with all content pushed to start. Spec §5 described CTA band as "full-width dramatic moment" — center-align for declarative feel.
- [ ] Termite band — body list items have inconsistent bullet treatment (some have amber scorpion icons, some don't).
```

Claude applies → re-screenshots → Flash re-reviews → passes. Ship.
