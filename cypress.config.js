const { defineConfig } = require("cypress");
const { allureCypress } = require ("allure-cypress/reporter");


module.exports = defineConfig({
  e2e: {
    baseUrl:'https://www.google.com',
    setupNodeEvents(on, config) {
      allureCypress(on, config);
      return config;
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
  },
  env: {
    allureResultsPath: 'allure-results',  // Path for Allure results
  },
});
