# QA Report

## Demo

- Path: `/Users/matthewanderson/proofpilot-agents/websitepilot/workspaces/codex/richardson-pest/demo`
- Local URL: `http://127.0.0.1:5187/`
- Preferred branded demo URL: `https://demo.proofpilotapps.com/richardson-pest/`
- Cloudflare Pages fallback URL: `https://proofpilot-preview.pages.dev/`
- Cloudflare Pages deployment URL: `https://cddc2397.proofpilot-preview.pages.dev/`
- Style family: `heroic-branded-conversion`
- Scaffold origin: `rockin-family-home-service`, rebuilt as a Richardson-specific implementation

## Verification

- `npm install`: passed with 80 audited packages.
- `npm run build`: passed after route normalization to `/richardson-pest/`.
- `npm audit --audit-level=moderate`: passed, found 0 vulnerabilities.
- Playwright desktop screenshot: passed.
- Playwright mobile screenshot: passed.
- Broken image check: passed, 0 broken images.
- Phone CTA count: passed, 5 `tel:6023808869` links found.
- Mobile sticky CTA: passed, visible.
- Browser console: passed, 0 desktop errors/warnings and 0 mobile errors/warnings.
- Typography pass: hero H1 and global H2/H3 scale reduced for cohesion across desktop and mobile.
- Cloudflare deploy: passed, uploaded to the existing `proofpilot-preview` Pages project.
- Cloudflare live check: passed for `https://demo.proofpilotapps.com/richardson-pest/` with correct title, rendered H1, 5 phone CTAs, and 0 public references to Codex, Claude, or Gemini.
- Redirect check: `https://demo.proofpilotapps.com/richardson-pest-management` and `/richardson-pest-management/` both return `301` to `/richardson-pest/`.

## Screenshots

- Desktop: `websitepilot/workspaces/codex/richardson-pest/qa-screenshots/desktop.png`
- Mobile: `websitepilot/workspaces/codex/richardson-pest/qa-screenshots/mobile.png`
- Cloudflare deployment desktop: `websitepilot/workspaces/codex/richardson-pest/qa-screenshots/cloudflare-preview-desktop.png`
- Cloudflare production desktop: `websitepilot/workspaces/codex/richardson-pest/qa-screenshots/cloudflare-main-desktop.png`
- Branded demo domain desktop: `websitepilot/workspaces/codex/richardson-pest/qa-screenshots/cloudflare-demo-domain-desktop.png`

## Cleanup Completed

- Removed unused scaffold components, routes, assets, Lovable metadata, Tailwind config, PostCSS config, and unrelated media.
- Reduced package dependencies to the small React/Vite set required by this demo.
- Switched from `@vitejs/plugin-react-swc` to `@vitejs/plugin-react` to remove the Vite 8 recommendation warning.
- Rebuilt after cleanup and regenerated QA screenshots.
- Tuned the type scale after browser review: desktop H1 now resolves to about 124px instead of the previous oversized maximum, while the 399px mobile viewport resolves the H1 to about 55px and standard H2s to about 38px.

## Design Gate

The remove-the-logo test passes: without the logo, the page still reads as Richardson Pest Management through its black-and-amber scorpion palette, same-day East Valley pest control positioning, family-safety origin story, scorpion/termite specialization, wall-void treatment process, and repeated 602-380-8869 CTA.
