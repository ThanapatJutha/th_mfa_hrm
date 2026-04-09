#!/usr/bin/env bash
# ============================================================
# copy-design-assets.sh
#
# Copies design assets from the th_mfa_dl project:
#   1. figma/components/   → figma/components/
#   2. figma/tokens/tokens.json → figma/tokens/tokens.json
#   3. src/fonts/           → src/fonts/
#
# Usage:
#   ./scripts/copy-design-assets.sh [path-to-th_mfa_dl]
#
# If no path is provided, defaults to ../th_mfa_dl relative
# to this project's root.
# ============================================================

set -euo pipefail

# Resolve this script's directory → project root
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Source path: argument or default sibling directory
if [[ -n "${1:-}" ]]; then
  DL_ROOT="$(cd "$1" 2>/dev/null && pwd)" || {
    echo "❌ Path does not exist: $1"
    exit 1
  }
else
  DL_ROOT="$(cd "$PROJECT_ROOT/../th_mfa_dl" 2>/dev/null && pwd)" || {
    echo "❌ Default path not found: $PROJECT_ROOT/../th_mfa_dl"
    echo "   Pass the path explicitly: ./scripts/copy-design-assets.sh /path/to/th_mfa_dl"
    exit 1
  }
fi

echo "📦 Source: $DL_ROOT"
echo "📁 Target: $PROJECT_ROOT"
echo ""

# ── 1. Figma components ──────────────────────────────────────
SRC_COMPONENTS="$DL_ROOT/figma/components"
if [[ -d "$SRC_COMPONENTS" ]]; then
  echo "1/3  Copying figma/components/ ..."
  mkdir -p "$PROJECT_ROOT/figma/components"
  rsync -av --delete \
    --exclude='.gitkeep' \
    "$SRC_COMPONENTS/" "$PROJECT_ROOT/figma/components/"
  echo "     ✅ figma/components/"
else
  echo "1/3  ⚠️  Skipped — $SRC_COMPONENTS not found"
fi

echo ""

# ── 2. tokens.json ───────────────────────────────────────────
SRC_TOKENS="$DL_ROOT/figma/tokens/tokens.json"
if [[ -f "$SRC_TOKENS" ]]; then
  echo "2/3  Copying figma/tokens/tokens.json ..."
  mkdir -p "$PROJECT_ROOT/figma/tokens"
  cp "$SRC_TOKENS" "$PROJECT_ROOT/figma/tokens/tokens.json"
  echo "     ✅ figma/tokens/tokens.json"
else
  echo "2/3  ⚠️  Skipped — $SRC_TOKENS not found"
fi

echo ""

# ── 3. Font folder ───────────────────────────────────────────
SRC_FONTS="$DL_ROOT/src/fonts"
if [[ -d "$SRC_FONTS" ]]; then
  echo "3/3  Copying src/fonts/ ..."
  mkdir -p "$PROJECT_ROOT/src/fonts"
  rsync -av --delete "$SRC_FONTS/" "$PROJECT_ROOT/src/fonts/"
  echo "     ✅ src/fonts/"
else
  echo "3/3  ⚠️  Skipped — $SRC_FONTS not found"
fi

echo ""
echo "🎉 Done! Design assets copied to $PROJECT_ROOT"
