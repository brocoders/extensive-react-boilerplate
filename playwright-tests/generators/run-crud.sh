#!/usr/bin/env bash
#
# Full e2e orchestrator for the generator suite (Phase 2).
#
# 1. Generates a matching `Tag` entity on the sister nestjs-boilerplate side
#    and boots its Docker test stack with the API exposed on host:3001.
# 2. Generates `Tag` on the React side.
# 3. Runs the Playwright CRUD spec (which boots Next.js via its webServer
#    block on http://localhost:3000 and drives create/edit/delete via the
#    admin UI against the real backend).
# 4. Tears everything down on EXIT — bounded by path on both repos.
#
# Defaults: NESTJS_DIR=../nestjs-boilerplate (override via env if elsewhere).
#
# Usage: bash playwright-tests/generators/run-crud.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

NESTJS_DIR="${NESTJS_DIR:-$(cd "$REPO_ROOT/../nestjs-boilerplate" 2>/dev/null && pwd || echo "")}"
COMPOSE_FILE="docker-compose.generators-relational.test.yaml"
COMPOSE_PROJECT="tests-gen-frontend"
HOST_API_PORT="${HOST_API_PORT:-3001}"

# ── Pre-flight ───────────────────────────────────────────────────────────────

if [[ -z "$NESTJS_DIR" || ! -d "$NESTJS_DIR" ]]; then
  echo "✗ NESTJS_DIR not found. Set NESTJS_DIR=/path/to/nestjs-boilerplate or check out the sister repo at ../nestjs-boilerplate." >&2
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "✗ Docker not installed or not on PATH." >&2
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "✗ 'docker compose' (v2) is required." >&2
  exit 1
fi

if ! git diff --quiet -- src || ! git diff --cached --quiet -- src; then
  echo "✗ src/ has uncommitted changes in $(basename "$REPO_ROOT"). Commit or stash first." >&2
  exit 1
fi

if ! (cd "$NESTJS_DIR" && git diff --quiet -- src) || ! (cd "$NESTJS_DIR" && git diff --cached --quiet -- src); then
  echo "✗ src/ has uncommitted changes in $(basename "$NESTJS_DIR"). Commit or stash first." >&2
  exit 1
fi

if lsof -nP -iTCP:"$HOST_API_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "✗ Port $HOST_API_PORT is already in use. Stop the conflicting process or override HOST_API_PORT." >&2
  exit 1
fi

# ── Cleanup ──────────────────────────────────────────────────────────────────

cleanup() {
  local exit_code=$?
  echo ""
  echo "▶ Cleanup: tearing down backend stack and reverting generated source on both sides…"

  (cd "$NESTJS_DIR" && docker compose -f "$COMPOSE_FILE" -p "$COMPOSE_PROJECT" down -v) 2>/dev/null || true

  # React side
  rm -rf "$REPO_ROOT/src/app/[language]/admin-panel/tags" 2>/dev/null || true
  rm -f "$REPO_ROOT/src/services/api/types/tag.ts" 2>/dev/null || true
  rm -f "$REPO_ROOT/src/services/api/services/tags.ts" 2>/dev/null || true
  rm -f "$REPO_ROOT/src/services/i18n/locales/en/admin-panel-tags"*.json 2>/dev/null || true
  (cd "$REPO_ROOT" && git checkout -- src) 2>/dev/null || true

  # NestJS side
  rm -rf "$NESTJS_DIR/src/tags" 2>/dev/null || true
  find "$NESTJS_DIR/src/database/migrations" -name "*-GeneratorE2E.ts" -delete 2>/dev/null || true
  (cd "$NESTJS_DIR" && git checkout -- src) 2>/dev/null || true

  exit "$exit_code"
}
trap cleanup EXIT

# ── Backend: generate Tag, lint, build, boot ─────────────────────────────────

echo "▶ Generating Tag on backend ($NESTJS_DIR)…"
cd "$NESTJS_DIR"
npm run generate:resource:relational -- --name Tag
npm run add:property:to-relational -- --name Tag --property name --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run lint
npm run build

echo "▶ Booting NestJS Docker stack (host port $HOST_API_PORT → container 3000)…"
docker compose -f "$COMPOSE_FILE" --env-file env-example-relational -p "$COMPOSE_PROJECT" up -d --build

echo "▶ Waiting for backend to accept HTTP on http://127.0.0.1:$HOST_API_PORT/ …"
backend_up=0
for i in {1..120}; do
  if curl -fsS -o /dev/null "http://127.0.0.1:$HOST_API_PORT/" 2>/dev/null; then
    echo "  backend is up (took ${i}s)"
    backend_up=1
    break
  fi
  sleep 1
done
if [[ $backend_up -ne 1 ]]; then
  echo "✗ Backend did not come up within 120s. Tail of api container:" >&2
  docker compose -f "$COMPOSE_FILE" -p "$COMPOSE_PROJECT" logs --tail=80 api >&2 || true
  exit 1
fi

# ── Frontend: generate Tag, run Playwright CRUD spec ─────────────────────────

cd "$REPO_ROOT"
echo "▶ Generating Tag on frontend…"
npm run generate:resource -- --name Tag
npm run generate:field -- --name Tag --property name --kind primitive --type string --isOptional false --isShowInTable true

echo "▶ Running Playwright CRUD spec…"
npx playwright test --config playwright.config.generators-crud.ts
