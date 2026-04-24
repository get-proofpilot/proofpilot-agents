# Design Template Library

This library turns finished ProofPilot website builds into reusable starter systems for AutoPilot and WebsitePilot.

Goals:
- give the design agent a growing set of strong structural starting points
- classify the brand into the right visual family before a scaffold gets picked
- preserve the best layout/component patterns from proven builds
- separate reusable design DNA from client-specific branding
- let AutoPilot pick a template automatically or accept a manual override

## Structure

- `registry.json` — the template profile catalog
- `library.py` — family-first selector + prompt-context builder
- `../style-families/` — reusable visual doctrine and starter code per design family
- `sources/` — curated mirrors of source repos used as template DNA
- `scripts/sync_design_template_sources.py` — refreshes the mirrored source pack from local clones

## Family-first selection

WebsitePilot should not jump straight to `state48` or `rockin`.
It should first choose the design lane:

1. `heroic-branded-conversion`
2. `operator-proof-longform`
3. `premium-outdoor-editorial`
4. `clean-recurring-service`

Then it should choose the best scaffold template inside that lane.

That gives the system two layers of usable context:
- **Style-family doctrine** — visual behavior, section habits, starter CSS, starter section components
- **Scaffold template DNA** — route structure, component order, proven module shells, existing build stack

## Current source repos

- state48glass
- keystonerestoration
- austinrockinshauling
- Proactive-pool-solutions
- doggy-detail
- premium-outdoor-editorial

## Current template profiles

There are 14 starter profiles in the registry. Multiple profiles can point at the same source repo while emphasizing different strengths.
Each profile now carries a `style_family` and may optionally expose `secondary_style_families` when it works as a bridge scaffold for another family.

## How AutoPilot uses this

The design stage can:
1. accept `style_family` and `design_template` as explicit overrides
2. infer the best-fit style families from service, keyword, page type, notes, and brand-fit signals
3. auto-select the best scaffold templates inside that family
4. inject two compact prompt blocks:
   - **style-family context**
     - selected family name
     - why it was selected
     - family doctrine excerpt
     - starter CSS + starter section code excerpts
   - **template context**
     - selected template name
     - why it was selected
     - section order and design traits
     - curated scaffold-code excerpts from the mirrored repo

## Important rule

These templates are for structure and design rhythm, not literal copying.
The design agent should reuse patterns, not brand names, copy, or client-specific details.
