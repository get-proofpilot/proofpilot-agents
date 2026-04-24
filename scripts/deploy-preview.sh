#!/usr/bin/env bash
# deploy-preview.sh — ship a Vite demo to Cloudflare Pages at
# `demo.proofpilotapps.com/<client>/` as a path-based URL.
#
# Usage:
#   scripts/deploy-preview.sh <demo-dir> --client <slug>
#
# Example:
#   scripts/deploy-preview.sh /tmp/richardson-demo-v2 --client richardson-pest-v2
#
# How it works:
#   1. Rebuilds the demo with Vite `base=/<slug>/` so all asset paths work
#      under the subpath.
#   2. Merges the built dist into a persistent meta-dist tree
#      (~/.proofpilot/meta-dist/ by default) where every client is a
#      sibling subdir.
#   3. Regenerates the landing index.html that lists every client demo.
#   4. Deploys the merged meta-dist to Pages main branch — the path-based
#      URL works statically with no router required.
#
# Result URLs:
#   - https://demo.proofpilotapps.com/<slug>/              ← canonical (clean)
#   - https://proofpilot-preview.pages.dev/<slug>/         ← pages.dev fallback
#   - https://demo.proofpilotapps.com/                     ← landing index
#
# Requirements: wrangler authenticated (`wrangler whoami`), Vite demo-dir.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
[[ -f "$SCRIPT_DIR/proofpilot-env.sh" ]] && . "$SCRIPT_DIR/proofpilot-env.sh"

DEMO_DIR=""
CLIENT=""
PROJECT="proofpilot-preview"
META_DIST="${PROOFPILOT_META_DIST:-$HOME/.proofpilot/meta-dist}"
CUSTOM_DOMAIN="demo.proofpilotapps.com"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --client)   CLIENT="$2"; shift 2 ;;
    --project)  PROJECT="$2"; shift 2 ;;
    --meta)     META_DIST="$2"; shift 2 ;;
    -h|--help)
      sed -n '2,30p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    -*) echo "unknown flag: $1" >&2; exit 2 ;;
    *)  DEMO_DIR="$1"; shift ;;
  esac
done

[[ -z "$DEMO_DIR" ]] && { echo "error: missing <demo-dir>" >&2; exit 2; }
[[ ! -d "$DEMO_DIR" ]] && { echo "error: demo dir not found: $DEMO_DIR" >&2; exit 2; }
[[ -z "$CLIENT" ]] && { echo "error: --client <slug> required" >&2; exit 2; }
command -v wrangler >/dev/null 2>&1 || { echo "error: wrangler not installed. npm i -g wrangler" >&2; exit 2; }

if ! [[ "$CLIENT" =~ ^[a-z0-9][a-z0-9-]*$ ]]; then
  echo "error: --client slug must be lowercase-with-dashes (got: $CLIENT)" >&2
  exit 2
fi

echo "┌─ deploy-preview"
echo "│  demo:     $DEMO_DIR"
echo "│  client:   $CLIENT"
echo "│  project:  $PROJECT"
echo "│  meta:     $META_DIST"
echo "└─"

# Step 1 — build with subpath base
echo ""
echo "step 1: building with base=/$CLIENT/ ..."
(cd "$DEMO_DIR" && npx vite build --base "/$CLIENT/" 2>&1 | tail -5)
[[ ! -d "$DEMO_DIR/dist" ]] && { echo "error: build did not produce $DEMO_DIR/dist" >&2; exit 3; }

# Step 2 — merge into meta-dist
echo ""
echo "step 2: merging into meta-dist..."
mkdir -p "$META_DIST"
rm -rf "$META_DIST/$CLIENT"
cp -R "$DEMO_DIR/dist" "$META_DIST/$CLIENT"
echo "  → $META_DIST/$CLIENT/ ($(du -sh "$META_DIST/$CLIENT" | awk '{print $1}'))"

# Step 3 — regenerate landing index.html
echo ""
echo "step 3: regenerating landing index..."
{
  cat <<'HEADER'
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ProofPilot — Demo Index</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif; background: #0a0a0a; color: #f0f0f0; max-width: 720px; margin: 60px auto; padding: 32px; line-height: 1.5; }
    h1 { font-weight: 900; letter-spacing: -0.02em; font-size: 48px; margin: 0 0 8px 0; }
    p { color: #a0a0a0; margin: 0 0 32px 0; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { margin: 0 0 12px 0; }
    a { color: #f0c000; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 16px; padding: 16px 20px; border: 1px solid #222; border-radius: 4px; transition: background 0.15s, border-color 0.15s; }
    a:hover { background: #111; border-color: #f0c000; }
    a .slug { color: #f0f0f0; font-size: 18px; min-width: 240px; }
    a .tag { color: #a0a0a0; font-size: 13px; font-weight: 400; }
    .foot { margin-top: 48px; color: #555; font-size: 13px; }
  </style>
</head>
<body>
  <h1>ProofPilot Demos</h1>
  <p>Live client previews. Each link below is a standalone build.</p>
  <ul>
HEADER

  for dir in "$META_DIST"/*/; do
    slug="$(basename "$dir")"
    [[ "$slug" == "." || "$slug" == ".." ]] && continue
    title=""
    if [[ -f "$dir/index.html" ]]; then
      title="$(grep -oE '<title>[^<]+</title>' "$dir/index.html" | head -1 | sed 's/<title>//;s|</title>||' | head -c 100)"
    fi
    [[ -z "$title" ]] && title="$slug"
    echo "    <li><a href=\"/$slug/\"><span class=\"slug\">/$slug</span><span class=\"tag\">$title</span></a></li>"
  done

  cat <<FOOTER
  </ul>
  <p class="foot">Deployed via scripts/deploy-preview.sh · Last updated $(date -u +"%Y-%m-%d %H:%M UTC")</p>
</body>
</html>
FOOTER
} > "$META_DIST/index.html"
echo "  → $META_DIST/index.html ($(ls "$META_DIST" | grep -v '^index.html$' | wc -l | tr -d ' ') clients)"

# Step 4 — deploy merged meta-dist to main branch
echo ""
echo "step 4: deploying merged meta-dist..."
DEPLOY_OUT="$(wrangler pages deploy "$META_DIST" \
  --project-name "$PROJECT" \
  --branch main \
  --commit-dirty=true 2>&1)"
echo "$DEPLOY_OUT" | tail -8

IMMUTABLE_URL="$(echo "$DEPLOY_OUT" | grep -oE "https://[a-f0-9]+\.$PROJECT\.pages\.dev" | head -1)"
CLEAN_URL="https://$CUSTOM_DOMAIN/$CLIENT/"
PAGES_URL="https://$PROJECT.pages.dev/$CLIENT/"

sleep 4
CLEAN_HTTP="$(curl -sL -o /dev/null -w "%{http_code}" --max-time 8 "$CLEAN_URL" 2>/dev/null || echo "000")"

echo ""
echo "┌─ deploy-preview complete"
if [[ "$CLEAN_HTTP" == "200" ]]; then
  echo "│  ✓ Clean URL:   $CLEAN_URL"
else
  echo "│  ~ Clean URL:   $CLEAN_URL  (HTTP $CLEAN_HTTP — may be propagating)"
fi
echo "│    Pages.dev:   $PAGES_URL"
[[ -n "$IMMUTABLE_URL" ]] && echo "│    Immutable:   $IMMUTABLE_URL"
echo "│    Index:       https://$CUSTOM_DOMAIN/"
echo "└─"

cat > "$DEMO_DIR/deploy-receipt.json" <<EOF
{
  "client": "$CLIENT",
  "project": "$PROJECT",
  "clean_url": "$CLEAN_URL",
  "pages_url": "$PAGES_URL",
  "immutable": "$IMMUTABLE_URL",
  "index_url": "https://$CUSTOM_DOMAIN/",
  "clean_url_http": "$CLEAN_HTTP",
  "deployed_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF
echo "receipt: $DEMO_DIR/deploy-receipt.json"
