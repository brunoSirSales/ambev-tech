
Cypress.Commands.add('esperarEClicar', { prevSubject: 'optional' }, (subject, seletor) => {
  if (subject) {
    return cy.wrap(subject).find(seletor).should('be.visible').click();
  }
  return cy.get(seletor).should('be.visible').click();
});

Cypress.Commands.add('verificarTexto', { prevSubject: 'element' }, (subject, texto) => {
  return cy.wrap(subject).should('contain.text', texto);
});

/**
 * @param {string} prefixo 
 * @param {Object} dados 
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
 * @param {string} email 
 * @param {string} senha 
 */
Cypress.Commands.add('login', (email, senha) => {
  cy.visit('/login');
  cy.get('#email').type(email);
  cy.get('#password').type(senha);
  cy.get('button[type="submit"]').click();
});

/**
 * @param {string} nome 
 */
Cypress.Commands.add('capturaScreenshot', (nome) => {
  cy.screenshot(`${nome}-${new Date().toISOString().replace(/:/g, '-')}`);
});

/**
 * @param {Object} usuario 
 */
Cypress.Commands.add('cadastrarUsuarioParaLogin', (usuario) => {

  cy.intercept('POST', '**/usuarios').as('cadastroRequest');
  

  cy.visit('/cadastrarusuarios');
  
  cy.get('[data-testid=nome]').clear().type(`Usuário de Login ${new Date().getTime()}`);
  cy.get('[data-testid=email]').clear().type(usuario.email);
  cy.get('[data-testid=password]').clear().type(usuario.password);
  cy.get('[data-testid=checkbox]').check();
  
  cy.get('[data-testid=cadastrar]').click();
  
  cy.wait('@cadastroRequest').then(({ response }) => {

    if (response && response.statusCode === 400) {
      cy.log('Usuário já existe, prosseguindo com o teste de login');
    } else if (response && (response.statusCode === 200 || response.statusCode === 201)) {
      cy.log('Usuário cadastrado com sucesso');
    }
  });
});