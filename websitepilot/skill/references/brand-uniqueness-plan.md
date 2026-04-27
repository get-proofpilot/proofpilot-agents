# WebsitePilot Brand Uniqueness Plan

## Goal

Keep the strong WebsitePilot demo workflow, but add an explicit brand-uniqueness layer so repeated demos do not collapse into the same font pairings, rounded cards, button treatments, and section rhythms.

## What changes

1. Add a Brand Customization Matrix after Brand Brain and before Designer Brain.
2. Feed that matrix into the existing style-family and template recommendation output.
3. Preserve the family-first selector. The new layer does not replace style families or template scoring.
4. Require Designer Brain to lock typography, corner radius, button shape, card treatment, motif intensity, and section-transition signature from the real logo and brand cues.
5. Add tests so bold, mascot-like brands do not receive the same treatment as quiet, minimal, service brands.

## Decision axes

- Logo temperament: bold, quiet, premium, playful, technical, rugged, editorial.
- Logo form: wordmark, iconmark, combo, badge, mascot, geometric, script, serif.
- Existing typography equity: preserve if the current site already uses a usable type system. Elevate weights and hierarchy before replacing fonts.
- Legibility guard: never select decorative serif/body-heavy serif systems for general home-service copy. Serif is allowed as a restrained display accent only when the family and cues support it.
- Treatment intensity: square/hard, soft/moderate, pill/friendly, editorial/minimal.

## Execution design

- `recommend_design_system(...)` gets an optional `brand_cues` field.
- The selector returns a new `brand_customization` object plus a prompt-ready `brand_customization_context` block.
- CLI gets `--brand-cues` so real briefs can pass logo and brand notes without changing existing args.
- Template/family scoring remains backward compatible.

## QA rule

Every demo must pass a new anti-sameness check:

- Does the typography choice follow this brand's logo temperament, not the last demo's typography?
- Do radius, buttons, cards, and section transitions match the mark's energy?
- Did the Designer Brain justify any serif or decorative face with brand evidence?
- If the logo is removed, does the page still feel like a brand-specific system rather than a template skin?
