import { defineConfig } from "cypress";

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
    env: {
      apiUrl: 'https://nestjs-boilerplate-test.herokuapp.com/api/v1'
    },
  },
});
