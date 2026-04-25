#!/usr/bin/env bash
# generate-image.sh — generate brand-tuned imagery via Nano Banana Pro (the
# newest Google image model). Use for hero photos, section backgrounds,
# custom icons, OG cards when authentic client photography isn't available.
#
# Usage:
#   scripts/generate-image.sh \
#     --prompt "Photorealistic Tucson backyard with a desert scorpion under blacklight, dusk, professional pest tech with backpack sprayer in foreground, warm amber light, deep shadows, 4k editorial style" \
#     --out /tmp/<client>-demo/src/assets/hero-bg.jpg \
#     [--model nano-banana-pro-preview] \
#     [--aspect 16:9 | 1:1 | 4:3 | 9:16] \
#     [--negative "no logos, no text, no watermarks, no children, no comic style"]
#
# Available models (the newest first):
#   - nano-banana-pro-preview         (default — Google's flagship, "Nano Banana Pro")
#   - gemini-3.1-flash-image-preview  (faster, cheaper, slightly lower fidelity)
#   - gemini-2.5-flash-image          (legacy, stable)
#
# Requires:
#   - env GEMINI_API_KEY (or ~/.config/proofpilot/env)
#   - python3 + curl

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
[[ -f "$SCRIPT_DIR/proofpilot-env.sh" ]] && . "$SCRIPT_DIR/proofpilot-env.sh"

PROMPT=""
OUT=""
INPUT=""
MODEL="nano-banana-pro-preview"
ASPECT="16:9"
NEGATIVE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --prompt)    PROMPT="$2"; shift 2 ;;
    --out)       OUT="$2"; shift 2 ;;
    --input)     INPUT="$2"; shift 2 ;;
    --model)     MODEL="$2"; shift 2 ;;
    --aspect)    ASPECT="$2"; shift 2 ;;
    --negative)  NEGATIVE="$2"; shift 2 ;;
    -h|--help)
      sed -n '2,20p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    -*) echo "unknown flag: $1" >&2; exit 2 ;;
    *)  echo "unexpected positional: $1" >&2; exit 2 ;;
  esac
done

[[ -z "$PROMPT" ]] && { echo "error: --prompt required" >&2; exit 2; }
[[ -z "$OUT" ]] && { echo "error: --out <path> required" >&2; exit 2; }
[[ -z "${GEMINI_API_KEY:-}" ]] && { echo "error: GEMINI_API_KEY not set (put in ~/.config/proofpilot/env)" >&2; exit 2; }
[[ -n "$INPUT" && ! -f "$INPUT" ]] && { echo "error: --input file not found: $INPUT" >&2; exit 2; }

# Build the user instruction with aspect and negative hints baked in
FULL_PROMPT="$PROMPT"
[[ -n "$NEGATIVE" ]] && FULL_PROMPT="$FULL_PROMPT (Avoid: $NEGATIVE)"
FULL_PROMPT="$FULL_PROMPT (Aspect ratio: $ASPECT.)"

mkdir -p "$(dirname "$OUT")"

echo "┌─ generate-image"
echo "│  model:    $MODEL"
echo "│  aspect:   $ASPECT"
echo "│  out:      $OUT"
echo "│  prompt:   $(echo "$PROMPT" | head -c 90)..."
echo "└─"

REQ="$(mktemp)"
if [[ -n "$INPUT" ]]; then
  # Image-to-image — input image + prompt = transformed/upscaled output
  python3 - "$FULL_PROMPT" "$INPUT" > "$REQ" <<'PYEOF'
import sys, json, base64, mimetypes
prompt, input_path = sys.argv[1:3]
with open(input_path, "rb") as f: data = base64.b64encode(f.read()).decode()
mime = mimetypes.guess_type(input_path)[0] or "image/jpeg"
payload = {
    "contents": [{
        "role": "user",
        "parts": [
            {"inline_data": {"mime_type": mime, "data": data}},
            {"text": prompt}
        ]
    }],
    "generationConfig": {"responseModalities": ["IMAGE"], "temperature": 0.5}
}
print(json.dumps(payload))
PYEOF
else
  python3 - "$FULL_PROMPT" > "$REQ" <<'PYEOF'
import sys, json
prompt = sys.argv[1]
payload = {
    "contents": [{
        "role": "user",
        "parts": [{"text": prompt}]
    }],
    "generationConfig": {
        "responseModalities": ["IMAGE"],
        "temperature": 0.7
    }
}
print(json.dumps(payload))
PYEOF
fi

RESP="$(mktemp)"
HTTP_CODE="$(curl -sS -o "$RESP" -w "%{http_code}" \
  -H "Content-Type: application/json" \
  -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/$MODEL:generateContent?key=$GEMINI_API_KEY" \
  --data-binary "@$REQ")"

if [[ "$HTTP_CODE" != "200" ]]; then
  echo "error: image API returned $HTTP_CODE" >&2
  cat "$RESP" | head -50 >&2
  rm -f "$REQ" "$RESP"
  exit 3
fi

# Extract base64 image data + write to disk
python3 - "$RESP" "$OUT" <<'PYEOF'
import sys, json, base64, os
resp_path, out_path = sys.argv[1:3]
with open(resp_path) as f: d = json.load(f)
try:
    parts = d["candidates"][0]["content"]["parts"]
    for p in parts:
        inline = p.get("inlineData") or p.get("inline_data")
        if inline and "data" in inline:
            mime = inline.get("mimeType") or inline.get("mime_type", "image/png")
            ext = ".png"
            if "jpeg" in mime or "jpg" in mime: ext = ".jpg"
            elif "webp" in mime: ext = ".webp"
            # Replace requested out extension with detected mime if mismatched
            base, _ = os.path.splitext(out_path)
            final_path = out_path if out_path.lower().endswith(ext) else (base + ext)
            with open(final_path, "wb") as fh:
                fh.write(base64.b64decode(inline["data"]))
            print(f"wrote {final_path} ({os.path.getsize(final_path)} bytes, {mime})")
            break
    else:
        print("warn: no image returned. Raw response:")
        print(json.dumps(d, indent=2)[:1500])
        sys.exit(4)
except Exception as e:
    print(f"error parsing response: {e}")
    print(json.dumps(d, indent=2)[:1500])
    sys.exit(4)
PYEOF

rm -f "$REQ" "$RESP"
