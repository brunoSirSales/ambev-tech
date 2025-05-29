import './commands';

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true,
});

Cypress.on('uncaught:exception', (err, runnable) => {

  console.error('Erro não tratado:', err.message);
  return false;
});

Cypress.config('defaultCommandTimeout', 10000);