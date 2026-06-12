import { defineConfig } from "@playwright/test";

/**
 * Separate Playwright config for the generator e2e suite.
 *
 * Phase 1 specs (generators-file-assertions.spec.ts) are pure fs/regex
 * assertions and never open a browser, so no projects/devices/webServer
 * are configured. Phase 2 (generators-crud.spec.ts, future) will extend
 * this config to add a chromium project and webServer wiring.
 *
 * The base playwright.config.ts excludes generators/** so `npx playwright
 * test` (no args) keeps running the existing e2e suite unchanged.
 */
export default defineConfig({
  testDir: "./playwright-tests/generators",
  testMatch: /.*\.spec\.ts$/,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: "list",
  timeout: 60 * 1000,
});
