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
  reporter: "list",
  timeout: 2 * 60 * 1000,
  expect: { timeout: 20 * 1000 },
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    // Match the project's existing local-dev Playwright wiring (next dev with turbopack).
    // `next build` via `build:e2e` is avoided because the script's BSD `cp -n` exits 1
    // on macOS when `.env.local` already exists, breaking the && chain.
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 5 * 60 * 1000,
  },
});
