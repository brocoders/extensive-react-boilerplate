import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

/**
 * Phase 2 config for the generator e2e suite: drives the admin panel through
 * real CRUD against the sister nestjs-boilerplate API.
 *
 * The orchestrator (run-crud.sh) is responsible for booting the NestJS Docker
 * stack on host:3001 BEFORE running this config. Playwright's `webServer` here
 * only manages the Next.js process.
 */
export default defineConfig({
  testDir: "./playwright-tests/generators",
  testMatch: /generators-crud\.spec\.ts$/,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  // "list" alone produces no report and no traces, so a CI failure here leaves
  // nothing to diagnose from — keep the console output and add both.
  reporter: [["list"], ["html", { open: "never" }]],
  timeout: 2 * 60 * 1000,
  expect: { timeout: 20 * 1000 },
  use: {
    baseURL: "http://localhost:3000",
    // retries are 0 here, so "on-first-retry" never captures anything.
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    // CI builds for production, as playwright.config.ts does: `next dev` compiles
    // each route on first visit, which pushes page loads past the 20s expect
    // timeout on a cold CI runner. (`build:e2e` used to be unusable here because
    // its BSD `cp -n` exited 1 when `.env.local` existed; that is fixed.)
    command: process.env.CI
      ? "npm run build:e2e && npm run start"
      : "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 5 * 60 * 1000,
  },
});
