module.exports = {
  nonGlobalStepDefinitions: true,
  stepDefinitions: [
    "cypress/e2e/step_definitions/**/*.js",
    "cypress/support/step_definitions/**/*.js"
  ],
  cucumberJson: {
    generate: true,
    outputFolder: "cypress/reports",
    filePrefix: "",
    fileSuffix: ".cucumber"
  }
};
