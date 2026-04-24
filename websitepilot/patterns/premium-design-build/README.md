# premium-design-build patterns

Prop-driven, brand-agnostic versions of the signature sections from `ref-premium-design-build`. Drop into any premium design-build build ($50K+ hardscape / landscape / custom-home / boutique pool studio).

## Signature rules shared across all patterns

- Modern sans (Manrope / Inter) for display and body. One italic Fraunces accent phrase per section — never a second display face.
- 4px border-radius on buttons (restrained, not pill, not sharp).
- Black / cream / muted-gold palette. Never green, blue, or neon as the accent.
- `{{HANDLEBAR}}` placeholders where you'd inject client copy; every text string that benefits from copy-gen is a prop, not hard-coded.
- Commissioned architectural, aerial, or twilight photography only. Stock imagery breaks the preset.

## Files

| Pattern | Use |
|---|---|
| `HeroArchitecturalAerial.tsx` | Full-bleed hero with eyebrow + bullet-tri-word tagline + italic accent + dual CTA + floating studio card |
| `ProjectCaseStudyGrid.tsx` | 6-tile portfolio grid, italic-accent project names, location/year meta, overlay summaries |
| `PhilosophyStatement.tsx` | Centered long-form philosophy paragraph with a single italic pull-line |
| `TeamCraftsmanship.tsx` | 3 portrait tiles, italic role label, no icons |
| `ProcessPremium.tsx` | 5 steps on dark ink with italic-serif 01–05 numerals |
| `ContactBespoke.tsx` | "Begin the conversation" form on cream-warm (never "Get a Quote") |
| `AwardsPressRow.tsx` | Muted press / award logo row in a cream-warm band under the hero |

All take a `brand` object with `goldHex`, `inkHex`, `creamHex`, `monogramLetter` so you can skin without touching CSS.
