const { defineConfig } = require("cypress");

module.exports = defineConfig({
  experimentalMemoryManagement: true,
  e2e: {
    viewportWidth: 1280,
    viewportHeight: 800,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    numTestsKeptInMemory: 10,
    pageLoadTimeout: 120000
  },
  experimentalInteractiveRunEvents: true,
});
