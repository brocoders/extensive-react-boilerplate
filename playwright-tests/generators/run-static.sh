#!/usr/bin/env bash
#
# Static-checks orchestrator for the generator e2e suite (Phase 1).
#
# Runs the full matrix of generator commands, then `npm run lint`,
# `npm run build`, and the file-assertion playwright spec.
# Bounded cleanup restores the source tree on exit, success or fail.
#
# Usage: bash playwright-tests/generators/run-static.sh
#
# Mirrors test/generators/run-static.sh in the sister nestjs-boilerplate.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

if ! git diff --quiet -- src || ! git diff --cached --quiet -- src; then
  echo "✗ src/ has uncommitted changes. Commit or stash them before running generator tests." >&2
  echo "  (The tests modify src/ then reset via git — uncommitted work would be lost.)" >&2
  exit 1
fi

cleanup() {
  local exit_code=$?
  echo ""
  echo "▶ Cleanup: removing generated resource files and reverting tracked src/ changes…"
  rm -rf "src/app/[language]/admin-panel/tags" 2>/dev/null || true
  rm -rf "src/app/[language]/admin-panel/blog-comments" 2>/dev/null || true
  rm -rf "src/app/[language]/admin-panel/articles" 2>/dev/null || true
  rm -f src/services/api/types/tag.ts 2>/dev/null || true
  rm -f src/services/api/types/blog-comment.ts 2>/dev/null || true
  rm -f src/services/api/types/article.ts 2>/dev/null || true
  rm -f src/services/api/services/tags.ts 2>/dev/null || true
  rm -f src/services/api/services/blog-comments.ts 2>/dev/null || true
  rm -f src/services/api/services/articles.ts 2>/dev/null || true
  rm -f src/services/i18n/locales/en/admin-panel-tags*.json 2>/dev/null || true
  rm -f src/services/i18n/locales/en/admin-panel-blog-comments*.json 2>/dev/null || true
  rm -f src/services/i18n/locales/en/admin-panel-articles*.json 2>/dev/null || true
  git checkout -- src 2>/dev/null || true
  exit "$exit_code"
}
trap cleanup EXIT

# shellcheck source=_matrix.sh
source "$(dirname "$0")/_matrix.sh"
run_matrix

npm run lint
npm run build

npx playwright test --config playwright.config.generators.ts generators-file-assertions
