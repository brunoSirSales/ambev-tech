// Import commands.js using ES2015 syntax:
import './commands';

// Configurações globais para os testes E2E

// Desativar falhas em screenshots para testes que falham
Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true,
});

// Configurar o comportamento para falhas não esperadas
Cypress.on('uncaught:exception', (err, runnable) => {
  // retornando false impede que o Cypress falhe o teste
  console.error('Erro não tratado:', err.message);
  return false;
});

// Configurar timeout global para os comandos
Cypress.config('defaultCommandTimeout', 10000);