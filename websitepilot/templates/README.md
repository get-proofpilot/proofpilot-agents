# Design Template Library

This library turns finished ProofPilot website builds into reusable starter systems for AutoPilot.

Goals:
- give the design agent 10-12 strong structural starting points
- preserve the best layout/component patterns from proven builds
- separate reusable design DNA from client-specific branding
- let AutoPilot pick a template automatically or accept a manual override

## Structure

- `registry.json` — the template profile catalog
- `sources/` — curated mirrors of source repos used as template DNA
- `scripts/sync_design_template_sources.py` — refreshes the mirrored source pack from local clones

## Current source repos

- state48glass
- keystonerestoration
- austinrockinshauling
- Proactive-pool-solutions
- doggy-detail

## Current template profiles

There are 12 starter profiles in the registry. Multiple profiles can point at the same source repo while emphasizing different strengths.

## How AutoPilot uses this

The design stage can:
1. accept `design_template` as an explicit override
2. auto-select the best-fit templates based on service, keyword, page type, and notes
3. inject a compact prompt block containing:
   - the selected template name
   - why it was selected
   - its section order and design traits
   - curated source-code excerpts from the mirrored repo

## Important rule

These templates are for structure and design rhythm, not literal copying.
The design agent should reuse patterns, not brand names, copy, or client-specific details.
