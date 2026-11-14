#!/usr/bin/env bash
# deploy-preview.sh — ship a Vite demo to `demo.proofpilotapps.com/<client>/`
# as a path-based URL. The host is served by the sales app (Railway) since
# 2026-11-13, so this uploads one client folder through its API. It used to
# deploy the whole meta-dist tree to Cloudflare Pages.
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
#   3. Uploads that one client folder to the sales app, which regenerates
#      the landing index and puts the demo on the lead at
#      https://sales.getproofpilot.com/leads/ (ref-* slugs are not registered).
#
# Result URLs:
#   - https://demo.proofpilotapps.com/<slug>/              ← canonical (clean)
#   - https://demo.proofpilotapps.com/                     ← landing index
#   - https://sales.getproofpilot.com/demos/               ← team gallery
#
# Requirements: a Vite demo-dir, the proofpilot-proposals repo (tool/demos.py)
# and a sales app token at ~/.config/proofpilot-sales/<you>-claude.json.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
[[ -f "$SCRIPT_DIR/proofpilot-env.sh" ]] && . "$SCRIPT_DIR/proofpilot-env.sh"

DEMO_DIR=""
CLIENT=""
VARIANT=""
PROJECT="sales-app"
SALES_TOOL="${PROOFPILOT_SALES_TOOL:-}"
if [[ -z "$SALES_TOOL" ]]; then
  for d in "$HOME/proofpilot-proposals" "$HOME/proofpilot-sales"; do
    [[ -f "$d/tool/demos.py" ]] && { SALES_TOOL="$d/tool"; break; }
  done
fi
META_DIST="${PROOFPILOT_META_DIST:-$HOME/.proofpilot/meta-dist}"
CUSTOM_DOMAIN="demo.proofpilotapps.com"
REPLACE_MODE="warn"   # warn | error | replace

while [[ $# -gt 0 ]]; do
  case "$1" in
    --client)     CLIENT="$2"; shift 2 ;;
    --variant)    VARIANT="$2"; shift 2 ;;
    --project)    PROJECT="$2"; shift 2 ;;
    --meta)       META_DIST="$2"; shift 2 ;;
    --if-exists)  REPLACE_MODE="$2"; shift 2 ;;
    --replace)    REPLACE_MODE="replace"; shift ;;
    -h|--help)
      sed -n '2,32p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    -*) echo "unknown flag: $1" >&2; exit 2 ;;
    *)  DEMO_DIR="$1"; shift ;;
  esac
done

[[ -z "$DEMO_DIR" ]] && { echo "error: missing <demo-dir>" >&2; exit 2; }
[[ ! -d "$DEMO_DIR" ]] && { echo "error: demo dir not found: $DEMO_DIR" >&2; exit 2; }
[[ -z "$CLIENT" ]] && { echo "error: --client <slug> required" >&2; exit 2; }
[[ -f "$SALES_TOOL/demos.py" ]] || { echo "error: tool/demos.py not found. Clone proofpilot-proposals to ~/proofpilot-proposals or set PROOFPILOT_SALES_TOOL." >&2; exit 2; }

# Combine client + optional variant into final slug
if [[ -n "$VARIANT" ]]; then
  CLIENT="$CLIENT-$VARIANT"
fi

if ! [[ "$CLIENT" =~ ^[a-z0-9][a-z0-9-]*$ ]]; then
  echo "error: slug '$CLIENT' must be lowercase-with-dashes" >&2
  exit 2
fi

# Collision protection — local meta-dist AND live check
LOCAL_EXISTS=false
[[ -d "$META_DIST/$CLIENT" ]] && LOCAL_EXISTS=true
REMOTE_HTTP="$(curl -sL -o /dev/null -w "%{http_code}" --max-time 5 "https://$CUSTOM_DOMAIN/$CLIENT/" 2>/dev/null || echo "000")"
REMOTE_EXISTS=false
[[ "$REMOTE_HTTP" == "200" ]] && REMOTE_EXISTS=true

if [[ "$LOCAL_EXISTS" == "true" || "$REMOTE_EXISTS" == "true" ]]; then
  case "$REPLACE_MODE" in
    error)
      echo "error: slug '$CLIENT' already exists (local=$LOCAL_EXISTS, remote=$REMOTE_EXISTS)." >&2
      echo "       Use --variant <suffix> to add a unique variant, OR --replace to overwrite." >&2
      exit 5
      ;;
    warn)
      echo ""
      echo "⚠️  slug '$CLIENT' already exists:"
      echo "   local meta-dist: $LOCAL_EXISTS"
      echo "   live URL:        $REMOTE_EXISTS (HTTP $REMOTE_HTTP)"
      echo ""
      echo "   Proceeding will REPLACE the existing deploy. Abort with Ctrl-C in 4s or wait..."
      sleep 4
      echo ""
      ;;
    replace)
      echo "note: slug '$CLIENT' exists — overwriting (--replace)."
      ;;
  esac
fi

echo "┌─ deploy-preview"
echo "│  demo:     $DEMO_DIR"
echo "│  client:   $CLIENT"
echo "│  project:  $PROJECT"
echo "│  meta:     $META_DIST"
echo "└─"

# Step 0 — patch React Router basename if BrowserRouter is present but basename is not
# Vite handles asset paths via --base, but React Router needs basename explicitly.
if grep -rq "BrowserRouter" "$DEMO_DIR/src" 2>/dev/null; then
  if ! grep -rq "basename=" "$DEMO_DIR/src" 2>/dev/null; then
    echo "step 0: patching BrowserRouter basename..."
    for f in "$DEMO_DIR"/src/App.tsx "$DEMO_DIR"/src/App.jsx "$DEMO_DIR"/src/main.tsx; do
      [[ -f "$f" ]] || continue
      python3 - "$f" <<'PYEOF'
import sys, re
p = sys.argv[1]
with open(p) as f: src = f.read()
new = re.sub(
    r"<BrowserRouter(\s*/?>|\s*>)",
    r"<BrowserRouter basename={import.meta.env.BASE_URL}\1",
    src,
)
if new != src:
    with open(p, "w") as f: f.write(new)
    print(f"  patched {p}")
PYEOF
    done
  fi
fi

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

# Step 3 — upload this client folder to the sales app. It regenerates the
# landing index and registers the demo on the lead.
echo ""
echo "step 3: uploading to the sales app..."
UPLOAD_ARGS=(demo "$META_DIST/$CLIENT" --slug "$CLIENT" --replace)
[[ "$CLIENT" == ref-* ]] && UPLOAD_ARGS+=(--no-register)
DEPLOY_OUT="$(python3 "$SALES_TOOL/demos.py" "${UPLOAD_ARGS[@]}" 2>&1)" || { echo "$DEPLOY_OUT" >&2; echo "error: upload failed, the demo is not live" >&2; exit 4; }
echo "$DEPLOY_OUT" | tail -8

IMMUTABLE_URL=""
CLEAN_URL="https://$CUSTOM_DOMAIN/$CLIENT/"
PAGES_URL=""

CLEAN_HTTP="$(curl -sL -o /dev/null -w "%{http_code}" --max-time 8 "$CLEAN_URL" 2>/dev/null || echo "000")"

echo ""
echo "┌─ deploy-preview complete"
if [[ "$CLEAN_HTTP" == "200" ]]; then
  echo "│  ✓ Clean URL:   $CLEAN_URL"
else
  echo "│  ~ Clean URL:   $CLEAN_URL  (HTTP $CLEAN_HTTP)"
fi
echo "│    Gallery:     https://sales.getproofpilot.com/demos/"
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
