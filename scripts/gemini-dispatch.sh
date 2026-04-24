#!/usr/bin/env bash
# gemini-dispatch.sh — dispatch a prompt to Gemini CLI as a subagent.
#
# Usage:
#   scripts/gemini-dispatch.sh <brief-file> [--model <model>] [--cwd <dir>] [--log <path>]
#
# Example:
#   scripts/gemini-dispatch.sh /tmp/redrock/designer-brain-brief.md \
#     --cwd /tmp/redrock \
#     --log /tmp/redrock/designer-brain.log
#
# Requirements:
#   - env GEMINI_API_KEY (valid Google AI Studio key)
#   - gemini CLI installed (npm i -g @google/gemini-cli)
#
# Design notes:
#   - Always YOLO (auto-approve all tools) — non-interactive by design.
#   - Default model: gemini-3.1-pro-preview. Override with --model.
#   - stdout/stderr streamed to the log file; final summary printed.
#   - Exit code == Gemini CLI's exit code.

set -euo pipefail

MODEL="gemini-3.1-pro-preview"
CWD="$(pwd)"
LOG=""
BRIEF=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --model) MODEL="$2"; shift 2 ;;
    --cwd)   CWD="$2"; shift 2 ;;
    --log)   LOG="$2"; shift 2 ;;
    -h|--help)
      grep -E "^#( |$)" "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    -*) echo "unknown flag: $1" >&2; exit 2 ;;
    *)  BRIEF="$1"; shift ;;
  esac
done

if [[ -z "$BRIEF" ]]; then
  echo "error: missing <brief-file>" >&2
  echo "see: $0 --help" >&2
  exit 2
fi
if [[ ! -f "$BRIEF" ]]; then
  echo "error: brief file not found: $BRIEF" >&2
  exit 2
fi
if [[ -z "${GEMINI_API_KEY:-}" ]]; then
  echo "error: GEMINI_API_KEY not set. Get one at https://aistudio.google.com/apikey" >&2
  exit 2
fi
if ! command -v gemini >/dev/null 2>&1; then
  echo "error: gemini CLI not found. install: npm i -g @google/gemini-cli" >&2
  exit 2
fi

if [[ -z "$LOG" ]]; then
  LOG="/tmp/gemini-dispatch-$(date +%Y%m%d-%H%M%S)-$$.log"
fi

mkdir -p "$CWD"
cd "$CWD"

echo "┌─ gemini-dispatch"
echo "│  model: $MODEL"
echo "│  cwd:   $CWD"
echo "│  brief: $BRIEF"
echo "│  log:   $LOG"
echo "└─ running..."

# Pipe brief on stdin so Gemini has the full context, give a short driver prompt.
# --yolo auto-approves all tools so this runs non-interactively.
set +e
cat "$BRIEF" | gemini \
  --model "$MODEL" \
  --yolo \
  -p "Read the full brief on stdin and execute it end-to-end. Work in cwd $CWD. When done, save a DONE.md summarizing what you built. Do not ask for clarification; use your judgment and document assumptions in DONE.md." \
  > "$LOG" 2>&1
EXIT=$?
set -e

echo ""
echo "┌─ gemini-dispatch complete (exit $EXIT)"
if [[ -f "$CWD/DONE.md" ]]; then
  echo "│  DONE.md:"
  sed -n '1,40p' "$CWD/DONE.md" | sed 's/^/│    /'
fi
echo "│  full log: $LOG"
echo "└─"

exit $EXIT
