#!/usr/bin/env bash
# pick-preset.sh — automated preset picker. Takes brand-brain.json, calls
# Gemini Flash to classify the client against the 7 presets + 4 parent families,
# writes template-pick.md, and emits the init-from-clone.sh command.
#
# Usage:
#   scripts/pick-preset.sh <brand-brain.json> [--output <template-pick.md>]
#
# Example:
#   scripts/pick-preset.sh /tmp/richardson/brand-brain.json
#   → writes /tmp/richardson/template-pick.md
#   → prints recommended `./scripts/init-from-clone.sh ...` command
#
# Requires:
#   - env GEMINI_API_KEY (or ~/.config/proofpilot/env)
#   - python3 + curl

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
[[ -f "$SCRIPT_DIR/proofpilot-env.sh" ]] && . "$SCRIPT_DIR/proofpilot-env.sh"

BRAND_JSON=""
OUTPUT=""
MODEL="gemini-2.5-flash"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --output)  OUTPUT="$2"; shift 2 ;;
    --model)   MODEL="$2"; shift 2 ;;
    -h|--help)
      sed -n '2,18p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    -*) echo "unknown flag: $1" >&2; exit 2 ;;
    *)  BRAND_JSON="$1"; shift ;;
  esac
done

[[ -z "$BRAND_JSON" || ! -f "$BRAND_JSON" ]] && { echo "error: <brand-brain.json> required + must exist" >&2; exit 2; }
[[ -z "${GEMINI_API_KEY:-}" ]] && { echo "error: GEMINI_API_KEY not set" >&2; exit 2; }

CLIENT_DIR="$(dirname "$BRAND_JSON")"
[[ -z "$OUTPUT" ]] && OUTPUT="$CLIENT_DIR/template-pick.md"

echo "┌─ pick-preset"
echo "│  brand:   $BRAND_JSON"
echo "│  output:  $OUTPUT"
echo "│  model:   $MODEL"
echo "└─"

# Build the classification prompt — Gemini Flash with structured output requested
BRAND_CONTENT="$(cat "$BRAND_JSON")"

REQ_PAYLOAD="$(mktemp)"
python3 - "$BRAND_JSON" > "$REQ_PAYLOAD" <<'PYEOF'
import sys, json
with open(sys.argv[1]) as f: brand = json.load(f)

# Build the classification prompt
prompt = """You are the ProofPilot Style Family Selector. Given the Brand Brain output below,
classify the client into ONE of 7 design presets + 1 of 4 parent families, pick the
matching ref-* clone template, and explain why. Output as structured markdown.

The 7 presets + their ref-clone templates:

1. `rugged-industrial` (family: heroic-branded-conversion)
   - Clone: ref-rugged-industrial (DNA from taggconcretecoatings.com)
   - For: pest, demolition, hauling, concrete, industrial. Plainspoken-trade voice.
   - Typography: Montserrat 900 UPPERCASE + Roboto body
   - Palette: ink + concrete-blue + ONE accent

2. `archetype-mascot` (family: heroic-branded-conversion)
   - Clone: ref-archetype-mascot (DNA from voltvikings.com)
   - For: brandable archetype names (Vikings, Patriots, Professors). Mascot world required.
   - Typography: Saira 300-900 extreme weight range
   - Palette: brand-narrative keyed to archetype

3. `playful-chunky-consumer` (family: heroic-branded-conversion)
   - Clone: ref-playful-chunky-consumer (DNA from gosantabanana.com)
   - For: consumer-playful (pets, kids, holiday, Christmas lighting)
   - Typography: Fira Sans 500-900 UPPERCASE + Open Sans
   - Palette: candy — navy + yellow + red

4. `contractor-heritage` (family: operator-proof-longform)
   - Clone: ref-contractor-heritage (DNA from bearsplumbing.net)
   - For: roofing, plumbing, HVAC, GCs with heritage logo + SEO-first funnel
   - Typography: Roboto Condensed 400-800 UPPERCASE
   - Palette: red + ink + pink

5. `dfw-luxe-aerial` (family: premium-outdoor-editorial)
   - Clone: ref-dfw-luxe-aerial (DNA from anomalypoolservices.io)
   - For: pool, outdoor living, concrete-luxe, landscape. Requires real drone-aerial photography.
   - Typography: Bebas Neue 400 title-case + Work Sans body
   - Palette: pool-blue + navy + mist

6. `editorial-serif` (family: premium-outdoor-editorial)
   - Clone: ref-editorial-serif (DNA from Kingswood Landscape)
   - For: dental, medical, legal, luxury, heritage family practices (SPARINGLY — NEVER on trades)
   - Typography: Fraunces italic H1 + roman eyebrow
   - Palette: cream + ink + green

7. `premium-design-build` (family: premium-outdoor-editorial)
   - Clone: ref-premium-design-build (DNA from cincomosqueteros.co)
   - For: $50K+ design-build firms, luxury remodels, commissioned photography
   - Typography: Manrope + Fraunces italic accent
   - Palette: black + cream + muted gold

Decision rules:
- Default for home-service trades is rugged-industrial UNLESS:
  - heritage logo preserved → contractor-heritage
  - brandable archetype name → archetype-mascot
  - pool/outdoor-living with aerial photography → dfw-luxe-aerial
  - consumer-playful (pets, kids) → playful-chunky-consumer
  - $50K+ design-build with commissioned photography → premium-design-build
  - dental/medical/legal/family-practice → editorial-serif
- NEVER default to editorial-serif for trades. It was wrong on Richardson Pest v1.

VERTICAL BUNDLE OVERRIDE — when a pre-composed bundle matches the client's vertical,
prefer it over the raw preset because it ships with vertical-specific sections
already composed (saves the Website Brain 30-60% of composition work):

| Bundle slug | Base preset | Matches when client vertical is |
|-------------|-------------|---------------------------------|
| `contractor-heritage-roofing` | contractor-heritage | Roofing / roof-repair / roofing contractor |
| `contractor-heritage-hvac` | contractor-heritage | HVAC / heating / cooling / water-heater |
| `rugged-industrial-pest` | rugged-industrial | Pest control / extermination / scorpion / termite |
| `dfw-luxe-aerial-landscape` | dfw-luxe-aerial | Landscape / hardscape / outdoor living |
| `playful-chunky-consumer-junk` | playful-chunky-consumer | Junk removal / hauling / dumpster rental |
| `premium-design-build-kitchen-bath` | premium-design-build | Kitchen remodel / bath remodel / interior design-build |

If you recommend a bundle, the output MUST include BOTH a preset pick AND a bundle
recommendation, and the init command MUST use `--bundle <slug>` (not `--preset <slug>`).

OUTPUT FORMAT — write exactly this markdown structure:

```
# <Client Name> — Style Family + Preset Pick

## Stage 2.5 — Style Family
**Family:** `<family-name>`
Why:
- <bullet 1 citing brand-brain evidence>
- <bullet 2>
- <bullet 3>

Rejected families (1 line each):
- <family>: <why not>
- <family>: <why not>
- <family>: <why not>

## Stage 2.6 — Preset
**Preset:** `<preset-name>`
Why:
- <bullet 1 citing brand-brain evidence>
- <bullet 2>

Rejected presets within family (1 line each):
- <preset>: <why not>

## Stage 2.7 — Clone Template OR Bundle
**Clone:** `ref-<preset>` OR bundle `ref-<preset>-<vertical>`
**Use bundle:** <yes|no — only yes if the client's vertical matches one of the 6 bundles>
**Reason:** <1-line rationale for preset-only vs bundle>

## Init command

If using a vertical bundle:
\`\`\`bash
./scripts/init-from-clone.sh \\
  --client <slug> \\
  --bundle <preset>-<vertical> \\
  --logo <path-to-logo.png> \\
  --client-name "<Display Name>" \\
  --tagline "<one-line tagline>" \\
  --brand-color "<#hex primary logo color>"
\`\`\`

Otherwise (preset-only):
\`\`\`bash
./scripts/init-from-clone.sh \\
  --client <slug> \\
  --preset <preset-name> \\
  --logo <path-to-logo.png> \\
  --client-name "<Display Name>" \\
  --tagline "<one-line tagline>" \\
  --brand-color "<#hex primary logo color>"
\`\`\`

OMIT the init command variant you're not recommending.

## Design warning
<1 paragraph on what would make this drift into template-energy OR wrong-preset-energy>
```

BRAND BRAIN JSON:
"""

payload = {
    "contents": [{
        "role": "user",
        "parts": [
            {"text": prompt},
            {"text": json.dumps(brand, indent=2)}
        ]
    }],
    "generationConfig": {"temperature": 0.2, "maxOutputTokens": 4096}
}
print(json.dumps(payload))
PYEOF

RESP="$(mktemp)"
HTTP_CODE="$(curl -sS -o "$RESP" -w "%{http_code}" \
  -H "Content-Type: application/json" \
  -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/$MODEL:generateContent?key=$GEMINI_API_KEY" \
  --data-binary "@$REQ_PAYLOAD")"

if [[ "$HTTP_CODE" != "200" ]]; then
  echo "error: Gemini API returned $HTTP_CODE" >&2
  cat "$RESP" >&2
  rm -f "$REQ_PAYLOAD" "$RESP"
  exit 3
fi

# Extract text
python3 - "$RESP" > "$OUTPUT" <<'PYEOF'
import sys, json
with open(sys.argv[1]) as f: d = json.load(f)
try:
    parts = d["candidates"][0]["content"]["parts"]
    text = "".join(p.get("text","") for p in parts)
    # Strip markdown fence if the whole response is wrapped in ```markdown ... ```
    lines = text.splitlines()
    if lines and lines[0].startswith("```"):
        lines = lines[1:]
    if lines and lines[-1].startswith("```"):
        lines = lines[:-1]
    print("\n".join(lines))
except (KeyError, IndexError):
    print("# Pick failed — malformed response")
    print("```json")
    print(json.dumps(d, indent=2)[:2000])
    print("```")
PYEOF

rm -f "$REQ_PAYLOAD" "$RESP"

echo ""
echo "┌─ pick-preset complete"
echo "│  $OUTPUT"
echo "│"
echo "│  First 40 lines:"
head -40 "$OUTPUT" | sed 's/^/│  /'
echo "└─"
