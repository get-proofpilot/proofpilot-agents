#!/usr/bin/env bash
# init-from-clone.sh — bootstrap a new client demo from a preset-matched reference clone.
#
# Usage:
#   scripts/init-from-clone.sh \
#     --client <slug> \
#     --preset <preset> \
#     --logo <path-to-logo.png> \
#     --client-name "Client Display Name" \
#     --tagline "One-line tagline for OG card" \
#     --brand-color "#hex"
#
# Example:
#   scripts/init-from-clone.sh \
#     --client bears-plumbing-demo \
#     --preset contractor-heritage \
#     --logo /tmp/bears/assets/logo-original.png \
#     --client-name "Bears Plumbing" \
#     --tagline "Dallas area plumbing. Real people. Real trucks." \
#     --brand-color "#EF3E33"
#
# Valid presets:
#   archetype-mascot      → ref-archetype-mascot  (voltvikings.com DNA)
#   contractor-heritage   → ref-contractor-heritage (bearsplumbing.net DNA)
#   dfw-luxe-aerial       → ref-dfw-luxe-aerial   (anomalypoolservices.io DNA)
#   rugged-industrial     → ref-rugged-industrial (taggconcretecoatings.com DNA)
#   playful-chunky-consumer → ref-playful-chunky-consumer (gosantabanana.com DNA)
#   editorial-serif       → ref-editorial-serif   (kingswood landscape DNA)
#   premium-design-build  → ref-premium-design-build (cincomosqueteros.co DNA)
#
# What it does:
#   1. Clones the matching ref-<preset>/ template to /tmp/<client>-demo/
#   2. Runs scrub-template.sh (strips Lovable, lands real logo, generates favicon+OG)
#   3. Runs npm install
#   4. Reports ready for Website Brain's Stage 4 brand-swap pass
#
# Website Brain then just has to:
#   - Replace hero copy + section copy with brand-brain-derived content
#   - Swap placeholder photos for authentic client photography
#   - Adjust palette tokens if the brand demands variation within the preset
#   - Compose additional patterns from patterns/<preset>/* or patterns/vertical/*
#   - Deploy via deploy-preview.sh

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
[[ -f "$SCRIPT_DIR/proofpilot-env.sh" ]] && . "$SCRIPT_DIR/proofpilot-env.sh"

CLIENT=""
PRESET=""
BUNDLE=""
LOGO=""
CLIENT_NAME=""
TAGLINE=""
BRAND_COLOR="#000000"
OG_TEXT_COLOR="#FFFFFF"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --client)        CLIENT="$2"; shift 2 ;;
    --preset)        PRESET="$2"; shift 2 ;;
    --bundle)        BUNDLE="$2"; shift 2 ;;
    --logo)          LOGO="$2"; shift 2 ;;
    --client-name)   CLIENT_NAME="$2"; shift 2 ;;
    --tagline)       TAGLINE="$2"; shift 2 ;;
    --brand-color)   BRAND_COLOR="$2"; shift 2 ;;
    --og-text-color) OG_TEXT_COLOR="$2"; shift 2 ;;
    -h|--help)
      sed -n '2,42p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    -*) echo "unknown flag: $1" >&2; exit 2 ;;
    *)  echo "unexpected positional: $1" >&2; exit 2 ;;
  esac
done

[[ -z "$CLIENT" ]] && { echo "error: --client required" >&2; exit 2; }
[[ -z "$LOGO" || ! -f "$LOGO" ]] && { echo "error: --logo <path> required and must exist" >&2; exit 2; }
[[ -z "$CLIENT_NAME" ]] && { echo "error: --client-name required" >&2; exit 2; }

# --bundle takes precedence over --preset when both provided
if [[ -n "$BUNDLE" ]]; then
  REF_SOURCE="$REPO_ROOT/websitepilot/templates/sources/ref-$BUNDLE"
  SOURCE_LABEL="$BUNDLE (vertical bundle)"
elif [[ -n "$PRESET" ]]; then
  REF_SOURCE="$REPO_ROOT/websitepilot/templates/sources/ref-$PRESET"
  SOURCE_LABEL="$PRESET (preset)"
else
  echo "error: --preset <name> or --bundle <name> required" >&2
  echo "" >&2
  echo "valid presets + bundles:" >&2
  ls "$REPO_ROOT/websitepilot/templates/sources/" | grep '^ref-' | sed 's/^ref-/  - /' >&2
  exit 2
fi

if ! [[ "$CLIENT" =~ ^[a-z0-9][a-z0-9-]*$ ]]; then
  echo "error: --client slug must be lowercase-with-dashes" >&2
  exit 2
fi

if [[ ! -d "$REF_SOURCE" ]]; then
  echo "error: source '$SOURCE_LABEL' has no ref-* template at $REF_SOURCE" >&2
  echo "" >&2
  echo "valid presets + bundles (as of this repo):" >&2
  ls "$REPO_ROOT/websitepilot/templates/sources/" | grep '^ref-' | sed 's/^ref-/  - /' >&2
  exit 3
fi

DEMO_DIR="/tmp/$CLIENT-demo"

echo "┌─ init-from-clone"
echo "│  client:   $CLIENT"
echo "│  using:    $SOURCE_LABEL"
echo "│  source:   $REF_SOURCE"
echo "│  dest:     $DEMO_DIR"
echo "│  logo:     $LOGO"
echo "└─"

# Step 1 — clone the reference template to a fresh demo dir
echo ""
echo "step 1: clone ref-$PRESET → $DEMO_DIR"
if [[ -d "$DEMO_DIR" ]]; then
  echo "  note: $DEMO_DIR exists — replacing"
  rm -rf "$DEMO_DIR"
fi
cp -R "$REF_SOURCE" "$DEMO_DIR"
# Remove any inherited deploy-receipt from the ref template
rm -f "$DEMO_DIR/deploy-receipt.json"
# Remove node_modules + dist if copied (they shouldn't be in the tree, but just in case)
rm -rf "$DEMO_DIR/node_modules" "$DEMO_DIR/dist"

# Step 2 — scrub-template.sh: strip Lovable, land real logo, favicon + OG
echo ""
echo "step 2: scrub-template (strip Lovable + land real logo + favicon + OG)"
"$SCRIPT_DIR/scrub-template.sh" "$DEMO_DIR" \
  --logo "$LOGO" \
  --client-name "$CLIENT_NAME" \
  --tagline "${TAGLINE:-$CLIENT_NAME}" \
  --brand-color "$BRAND_COLOR" \
  --og-text-color "$OG_TEXT_COLOR" 2>&1 | sed 's/^/  /' | tail -15

# Step 3 — npm install
echo ""
echo "step 3: npm install"
(cd "$DEMO_DIR" && npm install --silent 2>&1 | tail -3)

# Step 4 — smoke build
echo ""
echo "step 4: smoke build"
(cd "$DEMO_DIR" && npm run build 2>&1 | tail -3)

echo ""
echo "┌─ init-from-clone complete"
echo "│  demo ready at: $DEMO_DIR"
echo "│  preset:        $PRESET"
echo "│  next stages:"
echo "│    → Website Brain: brand-swap pass (replace hero/section copy + photos,"
echo "│      adjust palette tokens, compose patterns/$PRESET/* + patterns/vertical/*)"
echo "│    → Stage 6b QA:   ./scripts/gemini-design-qa.sh $DEMO_DIR ..."
echo "│    → Deploy:        ./scripts/deploy-preview.sh $DEMO_DIR --client $CLIENT [--variant vN]"
echo "└─"
