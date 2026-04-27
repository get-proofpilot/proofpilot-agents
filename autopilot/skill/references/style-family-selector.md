# Style-Family Selector

> The decision layer between Brand Brain and Designer Brain. This is where
> AutoPilot stops thinking in repo names and starts thinking like a design
> system.

## Why this exists

Previous runs jumped straight from brand extraction to template scoring.
That caused a recurring failure mode:

- the scaffold won for structural reasons
- the design spec fought the scaffold's natural visual behavior
- the result looked half-custom, half-template

This stage fixes that by making two distinct choices:

1. **Choose the visual family**
2. **Choose the scaffold template inside that family**

Family first. Scaffold second.

## Inputs

Read these before deciding anything:

1. `/tmp/<client>/brand-brain.json`
2. `/tmp/<client>/strategy.md`
3. `/tmp/<client>/demo-brief.md` when available
4. `~/proofpilot-agents/websitepilot/style-families/manifest.json`
5. `~/proofpilot-agents/websitepilot/style-families/<family>/FAMILY.md`
6. `~/proofpilot-agents/autopilot/skill/references/style-presets.md` — 7 fine-grained aesthetic presets that sit inside the 4 families. After picking the family, narrow to a specific preset here.
7. `~/proofpilot-agents/autopilot/skill/references/inspiration/180sites-portfolio-dna.md` — real reference builds for `heroic-branded-conversion`
8. `~/proofpilot-agents/autopilot/skill/references/inspiration/hookagency-portfolio-dna.md` — real reference builds for `operator-proof-longform`
9. `~/proofpilot-agents/autopilot/skill/references/inspiration/betheanomaly-portfolio-dna.md` — real reference builds for `premium-outdoor-editorial`
10. `~/proofpilot-agents/websitepilot/templates/library.py`

## The 4 canonical families

### 1. `heroic-branded-conversion`
Use for owner-led, emblematic, mascot-able, attitude-forward local brands.
Examples: pest, electrical, garage door, junk, pressure washing.

### 2. `operator-proof-longform`
Use for disciplined trust-builders that win with proof, clarity, FAQs, process, and repeated conversion opportunities.
Examples: roofing, restoration, inspection-led services, authority-first home services.

### 3. `premium-outdoor-editorial`
Use for design-build, high-ticket outdoor, landscaping, pool-build, and photography-led showcase brands.
Examples: landscaping, outdoor living, luxury hardscape, project-led remodel.

### 4. `clean-recurring-service`
Use for recurring maintenance, plan-led services, friendly operator brands, and reliability-first residential service.
Examples: pool cleaning, lawn care, recurring pest plans, cleaning, membership-like offers.

## Decision axes

Classify the client on these axes using only defensible evidence from the site and strategy:

1. **Brand maturity**
   - `preserve+elevate`
   - `partial-anchor`
   - `invent`

2. **Service model**
   - `urgent one-off`
   - `authority-first lead gen`
   - `inspection-led`
   - `quote-led`
   - `recurring plan`
   - `design-build project`
   - `gallery-led lead gen`
   - `friendly operator`

3. **Proof density**
   - `sparse`
   - `moderate`
   - `rich`

4. **Price point**
   - `mid`
   - `upper-mid`
   - `premium`

5. **Visual temperament**
   - freeform descriptors grounded in the site and category:
     `bold`, `character-led`, `conversion-first`, `clear`, `trust-heavy`,
     `editorial`, `restrained`, `architectural`, `clean`, `bright`, etc.

## How to decide

### Step 1. Read the brand, not the category stereotype

If the logo, voice, founder story, and imagery already lean one way, follow that.
Do not force a plumber into `heroic-branded-conversion` just because it is a trade.

### Step 2. Pick the family that matches the service model

This is the most important classifier after brand truth.

- Urgent / high-conviction / personality-led = `heroic-branded-conversion`
- Quote / inspection / FAQ / authority = `operator-proof-longform`
- Project gallery / high-ticket / taste-led = `premium-outdoor-editorial`
- Recurring plan / friendly trust / maintenance = `clean-recurring-service`

### Step 3. Sanity-check with proof density

- Sparse proof usually weakens `premium-outdoor-editorial`
- Rich authentic project photography strengthens it
- Moderate proof is enough for `heroic-branded-conversion` and `clean-recurring-service`
- `operator-proof-longform` can tolerate sparse proof if process and clarity are strong

### Step 4. Only then pick the scaffold

Use `websitepilot/templates/library.py::recommend_design_system(...)` or the lower-level calls:

```python
from websitepilot.templates.library import (
    derive_brand_customization,
    infer_style_families,
    select_templates,
)
```

Pass Brand Brain notes into `brand_cues` so the selector can return `brand_customization_context`. Use cues from the logo description, wordmark, typography, favicon, current site treatment, and salvageable-equity verdict.

Pick:
- **winner** = top family + top scaffold
- **runner-up** = second family or second scaffold if the first family is clearly right

## Output

Write `/tmp/<client>/template-pick.md` with this exact structure:

```markdown
# Design System Pick

## Selected style family
- Family: `heroic-branded-conversion`
- Why: 2-4 bullets
- Brand maturity: `partial-anchor`
- Service model: `urgent one-off`
- Proof density: `moderate`
- Price point: `upper-mid`
- Visual temperament: `bold`, `character-led`, `conversion-first`

## Selected scaffold template
- Winner: `rockin-family-home-service`
- Why: 2-4 bullets
- Runner-up: `rockin-rugged-industrial`

## Brand Customization Matrix
Paste the selector's `brand_customization_context` here.

Required decisions:
- Typography strategy and font pairing
- Body copy legibility rule
- Corner treatment
- Button treatment
- Card treatment
- Section-transition signature
- Motif intensity
- Anti-sameness checks

## Starter files to read
- `~/proofpilot-agents/websitepilot/style-families/heroic-branded-conversion/FAMILY.md`
- `~/proofpilot-agents/websitepilot/style-families/heroic-branded-conversion/starter/index.css`
- `~/proofpilot-agents/websitepilot/style-families/heroic-branded-conversion/starter/sections.tsx`

## Scaffold files to read
- `~/proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/src/index.css`
- `~/proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/src/pages/Index.tsx`

## Design warning
- 1 paragraph on what would make this drift into template-energy
```

## Hard rules

- Do not choose a family just because you like the inspiration reference.
- Do not choose a scaffold just because it is the newest or easiest.
- If the chosen family has no native scaffold, use the best bridge scaffold and lean harder on the family starter code.
- The family sets the visual doctrine. The scaffold only sets the execution starting point.
