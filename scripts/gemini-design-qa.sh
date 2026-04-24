#!/usr/bin/env bash
# gemini-design-qa.sh — post-build design QA critique via Gemini Flash with vision.
#
# Usage:
#   scripts/gemini-design-qa.sh <client-demo-dir> \
#     --spec /tmp/<client>/design-spec.md \
#     --brand /tmp/<client>/brand-brain.json \
#     [--port 5178] [--model gemini-2.5-flash] \
#     [--out /tmp/<client>/qa-feedback.md] \
#     [--round 1]
#
# Behavior:
#   1. Ensures dev server is running on --port (starts one if not).
#   2. Captures hero + full-page screenshots via a headless puppeteer-like script
#      OR via the globally installed `playwright` CLI. Falls back to curl+screenshot if
#      neither is available (in which case QA is a text-only critique).
#   3. Sends design-spec + brand-brain + screenshots to gemini-2.5-flash.
#   4. Writes structured qa-feedback.md that Claude parses.
#
# Requires:
#   - env GEMINI_API_KEY
#   - gemini CLI installed
#   - optional: npx playwright for headless screenshots. If missing, the helper
#     prints a hint and runs the critique against the spec only.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
[[ -f "$SCRIPT_DIR/proofpilot-env.sh" ]] && . "$SCRIPT_DIR/proofpilot-env.sh"

DEMO_DIR=""
SPEC=""
BRAND=""
MODEL="gemini-2.5-flash"
PORT="5178"
OUT=""
ROUND="1"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --spec)  SPEC="$2"; shift 2 ;;
    --brand) BRAND="$2"; shift 2 ;;
    --model) MODEL="$2"; shift 2 ;;
    --port)  PORT="$2"; shift 2 ;;
    --out)   OUT="$2"; shift 2 ;;
    --round) ROUND="$2"; shift 2 ;;
    -h|--help)
      sed -n '2,30p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    -*) echo "unknown flag: $1" >&2; exit 2 ;;
    *)  DEMO_DIR="$1"; shift ;;
  esac
done

[[ -z "$DEMO_DIR" ]] && { echo "error: missing <client-demo-dir>" >&2; exit 2; }
[[ ! -d "$DEMO_DIR" ]] && { echo "error: demo dir not found: $DEMO_DIR" >&2; exit 2; }
[[ -z "$SPEC" || ! -f "$SPEC" ]] && { echo "error: --spec must point to a real design-spec.md" >&2; exit 2; }
[[ -z "$BRAND" || ! -f "$BRAND" ]] && { echo "error: --brand must point to a real brand-brain.json" >&2; exit 2; }
[[ -z "${GEMINI_API_KEY:-}" ]] && { echo "error: GEMINI_API_KEY not set (put it in ~/.config/proofpilot/env)" >&2; exit 2; }
command -v gemini >/dev/null 2>&1 || { echo "error: gemini CLI not found" >&2; exit 2; }

CLIENT_DIR="$(dirname "$SPEC")"
[[ -z "$OUT" ]] && OUT="$CLIENT_DIR/qa-feedback.md"
SHOTS_DIR="$CLIENT_DIR/qa-screenshots"
mkdir -p "$SHOTS_DIR"
URL="http://localhost:$PORT/"

echo "┌─ gemini-design-qa"
echo "│  demo:  $DEMO_DIR"
echo "│  spec:  $SPEC"
echo "│  brand: $BRAND"
echo "│  url:   $URL"
echo "│  model: $MODEL (vision)"
echo "│  round: $ROUND"
echo "│  out:   $OUT"
echo "└─ running..."

# 1. Verify the server is up. If not, tell caller to start it (we don't kidnap lifecycle).
if ! curl -sSf -o /dev/null -w "" "$URL"; then
  echo "error: dev server not reachable at $URL — start it first (npm run dev -- --port $PORT)" >&2
  exit 3
fi

# 2. Capture screenshots via headless Chromium if available.
#    Preferred: npx playwright (works in CI too).
HERO_PNG="$SHOTS_DIR/hero-round$ROUND.png"
FULL_PNG="$SHOTS_DIR/fullpage-round$ROUND.png"

# Ensure playwright is resolvable from the demo dir (installs locally if missing).
if ! (cd "$DEMO_DIR" && node -e "require.resolve('playwright')" 2>/dev/null); then
  echo "│  installing playwright in $DEMO_DIR (first-run only)..."
  (cd "$DEMO_DIR" && npm i -D playwright --silent >/dev/null 2>&1) || true
  (cd "$DEMO_DIR" && npx playwright install chromium >/dev/null 2>&1) || true
fi

if (cd "$DEMO_DIR" && node -e "require.resolve('playwright')" 2>/dev/null); then
  (cd "$DEMO_DIR" && node -e "
    const { chromium } = require('playwright');
    (async () => {
      const b = await chromium.launch();
      const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await page.goto('$URL', { waitUntil: 'networkidle', timeout: 30000 });
      await page.screenshot({ path: '$HERO_PNG' });
      await page.evaluate(() => {
        document.querySelectorAll('.reveal').forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      });
      await page.screenshot({ path: '$FULL_PNG', fullPage: true });
      await b.close();
    })().catch(e => { console.error(e.message); process.exit(1); });
  " 2>&1 | tail -3) || echo "│  screenshot capture failed — falling back to text-only QA"
fi

if [[ ! -f "$HERO_PNG" ]]; then
  echo "warn: playwright not available — QA will run text-only (no vision screenshots)." >&2
  HERO_PNG=""
  FULL_PNG=""
fi

# 3. Build the critique brief (piped to Gemini stdin).
CRITIQUE_BRIEF="$(mktemp)"
{
  cat <<'HEADER'
You are a senior web designer performing a design QA pass on a live demo.
Compare the rendered screenshots to the design-spec below. Flag misalignments,
spacing issues, typographic drift, visual hierarchy breakdowns, and sections
that don't earn their place.

BE SPECIFIC. Bad: "improve the hero." Good: "Hero H1 (Hero.tsx:~line 40) is
text-left but the paragraph below is centered — center the H1 for consistency,
OR left-align the paragraph to match."

Consider these common failure modes:
1. Heading alignment doesn't match content below (centered grid with left-aligned H2, etc).
2. Eyebrow alignment doesn't match its H2.
3. Hero headline feels template-default (size / weight / line-height not distinctive).
4. Stat row is generic grid instead of distinctive numeral treatment per spec.
5. Section whitespace rhythm inconsistent (padding varies without reason).
6. Committed motif is either missing from spec'd placements or overused.
7. Section transition signature applied inconsistently.
8. Primary/secondary/tertiary button style drift.
9. Photography treatment (grayscale/duotone/tint) missing from spec'd sections.
10. Default template colors (Bootstrap blue, shadcn defaults) slipped through.

ANTI-FALSE-POSITIVE RULES (critical — apply BEFORE flagging Must-fix):

A. "Placeholder vs real content" — Only flag content as placeholder if it matches
   ONE of these specific patterns:
   - Literal "Lorem ipsum" / "TODO" / "{{variable}}" / "TBD" in visible copy
   - Obvious image placeholder (gray box with text like "IMAGE HERE")
   - Stock-template strings ("Change this to your own copy...")
   Do NOT flag real client copy as placeholder just because it sounds generic
   or template-like. If the copy references specific client facts (city, phone,
   founder name, plan tier, vertical term), it is REAL content.

B. "Alignment inconsistency" — Centered H2 over a grid of cards is a CORRECT
   pattern, not an inconsistency. Cards internally-left-aligned while section
   heading is centered is standard web design. Only flag TRUE misalignment:
   H2 centered + single block below left-aligned with no grid/card context.

C. "Same issue repeats on round 2" — if a Must-fix item from round 1 is flagged
   again in round 2 AND the implementer disputes it in the interim, treat as a
   Flash false-positive and don't block ship. Move the item to "Won't fix" with
   reason "Flash false-positive, verified by implementer."

D. DOM-verify before flagging motif / watermark absence — elements at < 10%
   opacity are often rendered but hard for vision to detect. If the spec calls
   for a watermark at 5% opacity, don't flag it as missing unless you can also
   verify via DOM inspection it truly isn't there.

OUTPUT CONTRACT — write EXACTLY this markdown structure:

# Design QA — <client> — Round <N>
Date: <iso-8601>
Reviewer: <model name>
Overall score: X/10

## Must-fix (block ship)
- [ ] <specific fix with file/line hint where possible>
- [ ] ...

## Should-fix (polish)
- [ ] ...

## Won't fix (intentional OR out of scope)
- ...

## Overall impression
<1-2 sentence summary>

HEADER

  echo ""
  echo "## Design spec (source of truth)"
  echo ""
  cat "$SPEC"
  echo ""
  echo "## Brand brain summary (context)"
  echo ""
  head -80 "$BRAND"
  echo ""
  echo "## Round: $ROUND"
  echo "Date: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  echo ""
} > "$CRITIQUE_BRIEF"

# 4. Dispatch to Gemini with vision.
#    gemini CLI supports --file for attaching images? Check the CLI docs.
#    Fallback: encode images as file paths inline and let Gemini CLI read them if it supports file params.
#
# For robust vision: use the direct REST API via curl with base64-encoded images — this is the
# most compatible path across gemini CLI versions.

if [[ -n "$HERO_PNG" && -n "$FULL_PNG" ]]; then
  # Base64-encode the images for inline submission
  HERO_B64="$(base64 < "$HERO_PNG" | tr -d '\n')"
  FULL_B64="$(base64 < "$FULL_PNG" | tr -d '\n')"

  # Build REST payload — use the generativelanguage.googleapis.com endpoint directly
  REQ_PAYLOAD="$(mktemp)"
  python3 - "$CRITIQUE_BRIEF" "$HERO_PNG" "$FULL_PNG" > "$REQ_PAYLOAD" <<'PYEOF'
import sys, json, base64
brief_path, hero_path, full_path = sys.argv[1:4]
with open(brief_path) as f: brief = f.read()
def b64(p):
    with open(p, "rb") as fh: return base64.b64encode(fh.read()).decode()
payload = {
  "contents": [{
    "role": "user",
    "parts": [
      {"text": brief},
      {"text": "\n\n[HERO VIEWPORT SCREENSHOT — 1440x900]\n"},
      {"inline_data": {"mime_type": "image/png", "data": b64(hero_path)}},
      {"text": "\n\n[FULL PAGE SCREENSHOT — reveal elements forced visible]\n"},
      {"inline_data": {"mime_type": "image/png", "data": b64(full_path)}},
    ]
  }],
  "generationConfig": {"temperature": 0.3, "maxOutputTokens": 16384}
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
    rm -f "$REQ_PAYLOAD" "$RESP" "$CRITIQUE_BRIEF"
    exit 4
  fi

  # Extract the text response
  python3 - "$RESP" > "$OUT" <<'PYEOF'
import sys, json
with open(sys.argv[1]) as f: d = json.load(f)
try:
    parts = d["candidates"][0]["content"]["parts"]
    print("".join(p.get("text","") for p in parts))
except (KeyError, IndexError):
    print("# QA failed — malformed response")
    print("```json")
    print(json.dumps(d, indent=2)[:2000])
    print("```")
PYEOF

  rm -f "$REQ_PAYLOAD" "$RESP"
else
  # Text-only fallback (no screenshots available)
  cat "$CRITIQUE_BRIEF" | gemini --model "$MODEL" --yolo -p \
    "Read the brief on stdin. Screenshots unavailable, so critique the spec itself for clarity + rigor per the output contract." > "$OUT" 2>&1 || true
fi

rm -f "$CRITIQUE_BRIEF"

echo ""
echo "┌─ gemini-design-qa complete"
echo "│  feedback: $OUT"
echo "│  screenshots: $SHOTS_DIR/"
echo "│  first 40 lines:"
head -40 "$OUT" | sed 's/^/│    /'
echo "└─"
