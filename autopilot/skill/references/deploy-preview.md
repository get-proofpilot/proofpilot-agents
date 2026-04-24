# Deploy Preview — demo.proofpilotapps.com/<client>/

> Every demo ends at a public preview URL. One Pages project (`proofpilot-preview`) hosts every client as a subpath under `demo.proofpilotapps.com/<client>/`. Every deploy also regenerates a landing index at the root listing all active demos.

## URL pattern

- **Canonical:** `https://demo.proofpilotapps.com/<client-slug>/`
- **Landing index:** `https://demo.proofpilotapps.com/` — auto-generated list of every deployed client
- **Pages.dev fallback:** `https://proofpilot-preview.pages.dev/<client-slug>/`

## Deploying a demo

From `~/proofpilot-agents/`:

```bash
./scripts/deploy-preview.sh /tmp/<client>-demo --client <client-slug>
```

Example (Richardson v2):
```bash
./scripts/deploy-preview.sh /tmp/richardson-demo-v2 --client richardson-pest
```

Output:
```
✓ Clean URL:   https://demo.proofpilotapps.com/richardson-pest/
  Pages.dev:   https://proofpilot-preview.pages.dev/richardson-pest/
  Immutable:   https://<hash>.proofpilot-preview.pages.dev
  Index:       https://demo.proofpilotapps.com/
```

## How it works

1. **Build with subpath base.** `npx vite build --base /<client>/` so every asset resolves correctly when served under the subpath.
2. **Merge into meta-dist.** Persistent tree at `~/.proofpilot/meta-dist/` where every client lives as a sibling subdir. Redeploy = replace just that client's folder.
3. **Regenerate landing index.** `index.html` at the root lists every client demo with titles pulled from each build's `<title>` tag.
4. **Deploy merged meta-dist to Pages main branch.** Wrangler only uploads diffs, so redeploys are fast (~1 sec for unchanged assets).

## Slug conventions

- `<client>-<variant>` when iterating: `richardson-pest-v1`, `richardson-pest-v2`, or just `richardson-pest` for the canonical ship.
- Lowercase-with-dashes. Under 30 chars. The script enforces this.

Multiple versions coexist: `demo.proofpilotapps.com/richardson-pest-v1/` and `demo.proofpilotapps.com/richardson-pest-v2/` can both be live for A/B comparison.

## Replacing a deploy

Running the helper with the same `--client` slug replaces that client's folder in the meta-dist and redeploys. No dashboard cleanup needed.

## Removing a deploy

```bash
rm -rf ~/.proofpilot/meta-dist/<slug>
# Then re-run deploy with any client to trigger the meta-dist rebuild:
./scripts/deploy-preview.sh /tmp/<any-demo> --client <any-slug>
```

## When to deploy

- **End of every WebsitePilot / AutoPilot run.** This is a ship gate — don't call a demo done without a public URL.
- **After Stage 6b QA loop passes.** Don't deploy a build that hasn't cleared design-QA.

## Failure modes

| Symptom | Cause | Fix |
|---------|-------|-----|
| `wrangler: command not found` | Not installed | `npm i -g wrangler` |
| `You are not logged in` | No auth | `wrangler login` (browser) |
| Build fails with missing asset import | Route-prune gap | See `website-brain-scaffold.md` Step 3 |
| Clean URL returns 404 | Subpath rewriting — asset paths baked with wrong base | Rebuild passing `--base /<client>/` (the helper does this automatically) |
| Clean URL returns 522 | CF cert propagating | Wait 2-5 min, retry |

## Where this fits in the SKILL

- `autopilot/skill/SKILL.md` Stage 6 ends with the deploy step.
- `websitepilot/skill/SKILL.md` Stage 6c (new) ends with the deploy step.
- The deploy URL lives in `DONE.md` for the demo.
- The receipt JSON (`<demo-dir>/deploy-receipt.json`) is machine-readable for automation (auto-email preview link, append to client tracker, etc.).

## One-time Cloudflare setup (already done)

- Pages project `proofpilot-preview` created in CF.
- Custom domain `demo.proofpilotapps.com` attached to the project's `main` branch.
- Path-based routing works out of the box — no Worker, no Functions, no Redirects needed.
