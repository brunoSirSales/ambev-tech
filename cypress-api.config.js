const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/api-tests/support/e2e.js')(on, config);
    },
    baseUrl: 'https://serverest.dev',
    specPattern: 'cypress/api-tests/specs/**/*.spec.js',
    supportFile: 'cypress/api-tests/support/e2e.js',
    fixturesFolder: 'cypress/api-tests/fixtures',
    videosFolder: 'cypress/videos/api-tests',
    screenshotsFolder: 'cypress/screenshots/api-tests',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/api-tests',
      overwrite: false,
      html: true,
      json: true
    },
  
    experimentalSkipTypeValidation: true
  },
});
