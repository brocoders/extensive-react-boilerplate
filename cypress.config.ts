import { defineConfig } from "cypress";
require('dotenv').config()
require('dotenv').config({ path: ".env.local"})

export default defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
    // Need for waiting api server
    defaultCommandTimeout: 60000,
    viewportWidth: 1200,
    baseUrl: "http://localhost:3000",
    watchForFileChanges: false,
  },
  env: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  }
});
