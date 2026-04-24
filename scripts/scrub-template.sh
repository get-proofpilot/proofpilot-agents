#!/usr/bin/env bash
# scrub-template.sh — remove Lovable / template defaults + land the real client
# logo + generate favicon + OG image.
#
# Usage:
#   scripts/scrub-template.sh <demo-dir> \
#     --logo <path-to-logo.png> \
#     --client-name "Client Display Name" \
#     --tagline "Short one-line tagline for OG card" \
#     --brand-color "#F0C000"
#
# Example:
#   scripts/scrub-template.sh /tmp/richardson-demo-v2 \
#     --logo /tmp/richardson-v2/assets/logo-original.png \
#     --client-name "Richardson Pest Management" \
#     --tagline "Mesa's Scorpion + Termite Specialists. Since 2011." \
#     --brand-color "#F0C000"
#
# What it does:
#   1. Removes lovable-tagger from package.json + vite.config.ts
#   2. Deletes template-default public assets (Lovable favicon.ico, placeholder.svg)
#   3. Copies the real client logo to src/assets/logo.png (canonical import path)
#   4. Generates public/favicon.png (32x32 + 180x180 apple-touch) from the logo
#   5. Generates public/og-image.png (1200x630) with logo + tagline on brand color
#   6. Patches index.html meta tags (favicon link + og:image + twitter:image)

set -euo pipefail

DEMO_DIR=""
LOGO=""
CLIENT_NAME=""
TAGLINE=""
BRAND_COLOR="#000000"
OG_TEXT_COLOR="#FFFFFF"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --logo)          LOGO="$2"; shift 2 ;;
    --client-name)   CLIENT_NAME="$2"; shift 2 ;;
    --tagline)       TAGLINE="$2"; shift 2 ;;
    --brand-color)   BRAND_COLOR="$2"; shift 2 ;;
    --og-text-color) OG_TEXT_COLOR="$2"; shift 2 ;;
    -h|--help)
      sed -n '2,22p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    -*) echo "unknown flag: $1" >&2; exit 2 ;;
    *)  DEMO_DIR="$1"; shift ;;
  esac
done

[[ -z "$DEMO_DIR" ]] && { echo "error: missing <demo-dir>" >&2; exit 2; }
[[ ! -d "$DEMO_DIR" ]] && { echo "error: demo dir not found: $DEMO_DIR" >&2; exit 2; }
[[ -z "$LOGO" || ! -f "$LOGO" ]] && { echo "error: --logo <path> required and must exist" >&2; exit 2; }
[[ -z "$CLIENT_NAME" ]] && { echo "error: --client-name required" >&2; exit 2; }

echo "┌─ scrub-template"
echo "│  demo:       $DEMO_DIR"
echo "│  logo:       $LOGO"
echo "│  client:     $CLIENT_NAME"
echo "│  tagline:    $TAGLINE"
echo "│  brand:      $BRAND_COLOR"
echo "└─"

# Step 1 — Remove lovable-tagger from package.json
echo ""
echo "step 1: remove lovable-tagger dep..."
if [[ -f "$DEMO_DIR/package.json" ]]; then
  python3 - "$DEMO_DIR/package.json" <<'PYEOF'
import json, sys
p = sys.argv[1]
with open(p) as f: d = json.load(f)
removed = []
for key in ("dependencies", "devDependencies"):
    if key in d and "lovable-tagger" in d[key]:
        del d[key]["lovable-tagger"]
        removed.append(key)
if removed:
    with open(p, "w") as f: json.dump(d, f, indent=2)
    print(f"  removed lovable-tagger from: {removed}")
else:
    print("  lovable-tagger not in package.json (ok)")
PYEOF
fi

# Step 2 — Scrub componentTagger from vite.config
echo ""
echo "step 2: scrub componentTagger from vite.config..."
for cfg in "$DEMO_DIR/vite.config.ts" "$DEMO_DIR/vite.config.js" "$DEMO_DIR/vite.config.mjs"; do
  if [[ -f "$cfg" ]]; then
    if grep -q "lovable-tagger\|componentTagger" "$cfg"; then
      # Use sed to remove the import line and any componentTagger() call
      python3 - "$cfg" <<'PYEOF'
import sys, re
p = sys.argv[1]
with open(p) as f: src = f.read()
# Remove import line
src = re.sub(r"(?m)^import\s+\{\s*componentTagger\s*\}\s+from\s+['\"]lovable-tagger['\"];?\s*\n", "", src)
# Remove componentTagger() calls (with optional conditional wrapper)
src = re.sub(r"\bcomponentTagger\s*\(\s*\)", "false", src)
# Strip any now-dangling "&& false" in plugin arrays
src = re.sub(r"&&\s*false", "", src)
# Remove any "mode === 'development' && false ".filter(Boolean) patterns — the common Lovable idiom
src = re.sub(r"\bmode\s*===\s*['\"]development['\"]\s*&&\s*false\b", "", src)
# Clean up trailing ", false" in arrays
src = re.sub(r",\s*false\s*(?=[,\]])", "", src)
src = re.sub(r"\[\s*false\s*,", "[", src)
with open(p, "w") as f: f.write(src)
print(f"  scrubbed {p}")
PYEOF
    else
      echo "  $cfg clean (ok)"
    fi
  fi
done

# Step 3 — Delete template-default public assets
echo ""
echo "step 3: delete template-default public assets..."
for f in favicon.ico placeholder.svg robots.txt; do
  # keep robots.txt if it looks customized (>100 bytes usually means custom)
  if [[ -f "$DEMO_DIR/public/$f" ]]; then
    if [[ "$f" == "robots.txt" ]]; then
      size=$(wc -c < "$DEMO_DIR/public/$f" 2>/dev/null | tr -d ' ')
      if [[ "$size" -lt 200 ]]; then
        rm -f "$DEMO_DIR/public/$f" && echo "  removed $f (default)"
      else
        echo "  kept $f (customized, $size bytes)"
      fi
    else
      rm -f "$DEMO_DIR/public/$f" && echo "  removed $f"
    fi
  fi
done

# Step 4 — Copy real logo into src/assets + generate favicons + OG
echo ""
echo "step 4: land real logo + generate favicon + og..."
mkdir -p "$DEMO_DIR/src/assets" "$DEMO_DIR/public"
cp "$LOGO" "$DEMO_DIR/src/assets/logo.png"
echo "  → $DEMO_DIR/src/assets/logo.png"

python3 - "$LOGO" "$DEMO_DIR/public" "$BRAND_COLOR" "$OG_TEXT_COLOR" "$CLIENT_NAME" "$TAGLINE" <<'PYEOF'
import sys, os
from PIL import Image, ImageDraw, ImageFont

logo_path, public_dir, brand_color, text_color, client_name, tagline = sys.argv[1:7]

def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

bg = hex_to_rgb(brand_color)
fg = hex_to_rgb(text_color)

# favicon (32x32) — scale the logo down
logo = Image.open(logo_path).convert("RGBA")
fav = logo.copy()
fav.thumbnail((32, 32), Image.LANCZOS)
# Center on 32x32 transparent canvas
canvas32 = Image.new("RGBA", (32, 32), (0, 0, 0, 0))
canvas32.paste(fav, ((32 - fav.width) // 2, (32 - fav.height) // 2), fav)
canvas32.save(os.path.join(public_dir, "favicon.png"))
print(f"  → {public_dir}/favicon.png (32x32)")

# apple-touch-icon (180x180) on brand-color background
apple = Image.new("RGBA", (180, 180), bg + (255,))
lg = logo.copy()
lg.thumbnail((144, 144), Image.LANCZOS)
apple.paste(lg, ((180 - lg.width) // 2, (180 - lg.height) // 2), lg)
apple.save(os.path.join(public_dir, "apple-touch-icon.png"))
print(f"  → {public_dir}/apple-touch-icon.png (180x180)")

# OG image (1200x630) with logo + client name + tagline on brand color
og = Image.new("RGB", (1200, 630), bg)
og_logo = logo.copy()
og_logo.thumbnail((260, 260), Image.LANCZOS)
og.paste(og_logo, (80, 80), og_logo.convert("RGBA"))

d = ImageDraw.Draw(og)
# Try to load a system font for the text
title_font = None
body_font = None
for candidate in [
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/System/Library/Fonts/SFNS.ttf",
]:
    if os.path.exists(candidate):
        try:
            title_font = ImageFont.truetype(candidate, 72)
            body_font = ImageFont.truetype(candidate, 36)
            break
        except Exception:
            continue
if title_font is None:
    title_font = ImageFont.load_default()
    body_font = ImageFont.load_default()

# Word-wrap the client name + tagline
def wrap(text, font, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = cur + (" " if cur else "") + w
        if d.textlength(trial, font=font) <= max_w:
            cur = trial
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return lines

y = 380
for line in wrap(client_name, title_font, 1040):
    d.text((80, y), line, font=title_font, fill=fg)
    y += 82
y += 16
for line in wrap(tagline, body_font, 1040):
    d.text((80, y), line, font=body_font, fill=fg + (220,) if len(fg) == 4 else fg)
    y += 46

og.save(os.path.join(public_dir, "og-image.png"), "PNG")
print(f"  → {public_dir}/og-image.png (1200x630)")
PYEOF

# Step 5 — Patch index.html meta tags
echo ""
echo "step 5: patch index.html meta tags..."
if [[ -f "$DEMO_DIR/index.html" ]]; then
  python3 - "$DEMO_DIR/index.html" <<'PYEOF'
import sys, re
p = sys.argv[1]
with open(p) as f: src = f.read()

# Replace any existing favicon link(s)
src = re.sub(
    r"<link\s+rel=['\"](?:icon|shortcut icon)['\"][^>]*/?>",
    '<link rel="icon" type="image/png" href="/favicon.png" />',
    src,
    flags=re.I,
)
# If no favicon link present, inject one before </head>
if 'rel="icon"' not in src:
    src = src.replace("</head>", '  <link rel="icon" type="image/png" href="/favicon.png" />\n  </head>')

# Replace apple-touch-icon
src = re.sub(
    r"<link\s+rel=['\"]apple-touch-icon['\"][^>]*/?>",
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
    src,
    flags=re.I,
)
if 'rel="apple-touch-icon"' not in src:
    src = src.replace("</head>", '  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />\n  </head>')

# Replace og:image
src = re.sub(
    r"<meta\s+property=['\"]og:image['\"]\s+content=['\"][^'\"]+['\"][^>]*/?>",
    '<meta property="og:image" content="/og-image.png" />',
    src,
    flags=re.I,
)
if 'og:image' not in src:
    src = src.replace("</head>", '  <meta property="og:image" content="/og-image.png" />\n  </head>')

# Replace twitter:image
src = re.sub(
    r"<meta\s+name=['\"]twitter:image['\"]\s+content=['\"][^'\"]+['\"][^>]*/?>",
    '<meta name="twitter:image" content="/og-image.png" />',
    src,
    flags=re.I,
)
if 'twitter:image' not in src:
    src = src.replace("</head>", '  <meta name="twitter:image" content="/og-image.png" />\n  </head>')

with open(p, "w") as f: f.write(src)
print(f"  patched {p}")
PYEOF
fi

echo ""
echo "┌─ scrub-template complete"
echo "│  ✓ lovable-tagger removed from package.json + vite.config"
echo "│  ✓ template defaults purged from public/"
echo "│  ✓ real logo at src/assets/logo.png"
echo "│  ✓ favicon.png + apple-touch-icon.png in public/"
echo "│  ✓ og-image.png (1200x630) in public/"
echo "│  ✓ index.html meta tags patched"
echo "│"
echo "│  Next: update Header.tsx + Footer.tsx to import from @/assets/logo.png"
echo "│  and render as <img src={logo} />. Then npm i (to drop lovable-tagger"
echo "│  from node_modules) and rebuild."
echo "└─"
