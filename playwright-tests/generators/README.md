# Generator e2e tests

End-to-end tests for the hygen-based code generators (`npm run generate:resource`, `npm run generate:field`). Mirrors the equivalent suite in the sister [nestjs-boilerplate](../../../nestjs-boilerplate/test/generators/) repo.

## What's covered (Phase 1: static)

- Every property `--kind` (`primitive`, `reference`, `denormalized`).
- Every primitive `--type` (`string`, `number`, `boolean`, `Date`).
- Both reference `--referenceType` values (`toOne`, `toMany`).
- `--isOptional true | false` and `--isShowInTable true | false` permutations.

Per entity the suite verifies:

- Every generated file exists at the expected path.
- Each property is declared on the entity `type` alias with the correct `?:` marker.
- Each property has a label key in the create and edit i18n JSON `inputs` sections.
- Properties with `isShowInTable: true` render a `TableCell` in the list page-content.
- Properties with `isShowInTable: false` do **not** render a `TableCell`.
- `app-bar.tsx` gets a nav link to `/admin-panel/{plural}` for every entity.
- All three i18n JSON files (`admin-panel-{plural}{,-create,-edit}.json`) parse.
- `npm run lint` and `npm run build` succeed against the generated source tree.

## Running

```bash
npm run test:generators:static
```

**Precondition:** a clean working tree. The dirty-tree guard checks `git diff` (tracked changes only); brand-new untracked files outside the cleanup paths are fine.

## Cleanup model

The orchestrator installs an `EXIT` trap that:

- `rm -rf src/app/[language]/admin-panel/{tags,blog-comments,articles}` — removes generated route trees.
- `rm -f` the generated type, service, and i18n JSON files (enumerated, not globbed).
- `git checkout -- src` — reverts every tracked change inside `src/`, including the auto-patched `app-bar.tsx`, `common.json`, and any lint-fix incidentals.

Cleanup is **bounded by path** — it never touches the repo root, `node_modules`, or `playwright-tests/`. New untracked files in `playwright-tests/` survive the run.

## Layout

```
playwright-tests/generators/
  fixtures/
    matrix.ts                            # canonical entities + properties + entityPaths()
  helpers/
    exec.ts                              # child_process wrapper (unused in Phase 1; retained for Phase 2)
  _matrix.sh                             # generator command list (sourced by orchestrators)
  run-static.sh                          # Phase 1 orchestrator
  generators-file-assertions.spec.ts     # Phase 1 spec
  README.md
```

The separate `playwright.config.generators.ts` at the repo root picks up only `playwright-tests/generators/**/*.spec.ts`. The base `playwright.config.ts` ignores `**/generators/**` so the existing browser e2e suite is unaffected.

## Phase 2: Playwright CRUD against a real backend

Drives the generated admin pages through real create/read/edit/delete against the sister [nestjs-boilerplate](../../../nestjs-boilerplate) API booted in Docker.

### What's covered

MVP: the simplest entity (`Tag` with a single `name` string field), exercising the full admin flow — admin login → list page loads → create form → edit form → delete confirmation. This proves the end-to-end pipeline (generator → API service → list/edit/create UI → backend HTTP → DB roundtrip). Richer entities (BlogComment, Article with refs/files/denormalized) can layer on top once this MVP is stable.

### Running

```bash
npm run test:e2e:generators:crud
```

### Preconditions

- Docker Compose v2 (`docker compose`) available on `PATH`.
- Sister repo checked out at `../nestjs-boilerplate` (or set `NESTJS_DIR=/abs/path/to/nestjs-boilerplate`).
- Host port `3001` free (override via `HOST_API_PORT`).
- Both repos have a clean `src/`.
- Default admin credentials (`admin@example.com` / `secret`) — override with `GENERATOR_E2E_ADMIN_EMAIL` / `GENERATOR_E2E_ADMIN_PASSWORD`.

### How it works

1. **Backend boot** (`run-crud.sh`): generates a matching `Tag` entity on the NestJS side, lints + builds, then `docker compose up -d --build` against `docker-compose.generators-relational.test.yaml` which now maps host:3001 → container:3001.
2. **Frontend generate**: runs `generate:resource` + `generate:field` for `Tag` in this repo.
3. **Playwright** (`playwright.config.generators-crud.ts`): boots Next.js via its `webServer` block at `http://localhost:3000`, then drives `generators-crud.spec.ts` (admin login + Tag CRUD).
4. **Cleanup**: `docker compose down -v`, `git checkout -- src` + targeted `rm`s in both repos, generated TypeORM migration files removed.

### Phase 2 layout

```
playwright-tests/generators/
  generators-crud.spec.ts              # Phase 2 spec: Tag CRUD
  helpers/admin-login.ts               # Playwright admin login helper
  run-crud.sh                          # Phase 2 orchestrator
playwright.config.generators-crud.ts   # Phase 2 runner config (chromium + webServer)
```

### Limitations

Phase 2 is more brittle than Phase 1 by design (real Docker, real browser, real backend). If it fails, run `npm run test:generators:static` first to confirm the generators themselves are intact, then look at the orchestrator logs and Docker container logs (`docker compose -p tests-gen-frontend logs api`).
