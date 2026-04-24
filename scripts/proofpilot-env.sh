#!/usr/bin/env bash
# proofpilot-env.sh — load ProofPilot env vars from ~/.config/proofpilot/env
#
# Usage:
#   source scripts/proofpilot-env.sh
#   OR in helper scripts: . "$(dirname "$0")/proofpilot-env.sh"
#
# If ~/.config/proofpilot/env exists, source it. Otherwise no-op.
# Expected keys (example):
#   GEMINI_API_KEY=AIza...
#   RECRAFT_API_KEY=...
#   DATAFORSEO_LOGIN=...
#   DATAFORSEO_PASSWORD=...
#   OPENROUTER_API_KEY=sk-or-...

ENV_FILE="${PROOFPILOT_ENV_FILE:-$HOME/.config/proofpilot/env}"

if [[ -f "$ENV_FILE" ]]; then
  # shellcheck disable=SC1090
  set -a
  source "$ENV_FILE"
  set +a
fi
