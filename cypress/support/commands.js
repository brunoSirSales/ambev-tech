// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Comando personalizado para esperar que um elemento esteja visível e então clicar nele
 * Útil para elementos que podem demorar para aparecer na tela
 */
Cypress.Commands.add('esperarEClicar', { prevSubject: 'optional' }, (subject, seletor) => {
  if (subject) {
    return cy.wrap(subject).find(seletor).should('be.visible').click();
  }
  return cy.get(seletor).should('be.visible').click();
});

/**
 * Comando personalizado para verificar se um elemento contém um texto específico
 */
Cypress.Commands.add('verificarTexto', { prevSubject: 'element' }, (subject, texto) => {
  return cy.wrap(subject).should('contain.text', texto);
});

/**
 * Comando personalizado para preencher um formulário com dados de um objeto
 * @param {string} prefixo - Prefixo dos seletores de elementos (opcional)
 * @param {Object} dados - Objeto com os dados a serem preenchidos
 */
Cypress.Commands.add('preencherFormulario', (prefixo, dados) => {
  Object.entries(dados).forEach(([campo, valor]) => {
    const seletor = prefixo ? `${prefixo}-${campo}` : `#${campo}`;
    
    if (typeof valor === 'boolean') {
      if (valor) {
        cy.get(seletor).check();
      } else {
        cy.get(seletor).uncheck();
      }
    } else if (valor) {
      cy.get(seletor).clear().type(valor);
    }
  });
});

/**
 * Comando personalizado para fazer login no sistema
 * @param {string} email - Email do usuário
 * @param {string} senha - Senha do usuário
 */
Cypress.Commands.add('login', (email, senha) => {
  cy.visit('/login');
  cy.get('#email').type(email);
  cy.get('#password').type(senha);
  cy.get('button[type="submit"]').click();
});

/**
 * Comando personalizado para capturar screenshots com nome personalizado
 * @param {string} nome - Nome do screenshot
 */
Cypress.Commands.add('capturaScreenshot', (nome) => {
  cy.screenshot(`${nome}-${new Date().toISOString().replace(/:/g, '-')}`);
});

/**
 * Comando personalizado para cadastrar um usuário específico para testes
 * Útil para garantir que o usuário de teste exista antes de executar o login
 * @param {Object} usuario - Objeto com os dados do usuário a ser cadastrado
 */
Cypress.Commands.add('cadastrarUsuarioParaLogin', (usuario) => {
  // Intercepta a requisição de cadastro para verificar o resultado
  cy.intercept('POST', '**/usuarios').as('cadastroRequest');
  
  // Navega para a página de cadastro
  cy.visit('/cadastrarusuarios');
  
  // Preenche o formulário com os dados do usuário
  cy.get('[data-testid=nome]').clear().type(`Usuário de Login ${new Date().getTime()}`);
  cy.get('[data-testid=email]').clear().type(usuario.email);
  cy.get('[data-testid=password]').clear().type(usuario.password);
  cy.get('[data-testid=checkbox]').check(); // Define como admin para ter acesso completo
  
  // Clica no botão de cadastrar
  cy.get('[data-testid=cadastrar]').click();
  
  // Verifica o resultado da requisição
  cy.wait('@cadastroRequest').then(({ response }) => {
    // Se o usuário já existe (código 400), não há problema, podemos prosseguir
    if (response && response.statusCode === 400) {
      cy.log('Usuário já existe, prosseguindo com o teste de login');
    } else if (response && (response.statusCode === 200 || response.statusCode === 201)) {
      cy.log('Usuário cadastrado com sucesso');
    }
  });
});