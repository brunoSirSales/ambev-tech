/**
 * Page Object para a página de login
 * Encapsula todos os elementos e ações relacionadas à página de login
 */
class LoginPage {

  elements = {
    emailInput: () => cy.get('[data-testid=email]'),
    passwordInput: () => cy.get('[data-testid=senha]'),
    entrarButton: () => cy.get('[data-testid=entrar]'),
    successMessage: () => cy.get('[data-testid=mensagem-sucesso]'),
    errorMessage: () => cy.get('[data-testid=mensagem-erro]'),
    userArea: () => cy.get('[data-testid=usuario-logado]'),
    homeLink: () => cy.get('[data-testid=home]')
  };

 
  acessarPaginaLogin() {
    cy.intercept('POST', '**/login').as('loginRequest');
    cy.visit('/login');
    cy.url().should('include', '/login');
    cy.title().should('include', 'Front - ServeRest');
    return this;
  }

  /**
   * Preenche o formulário de login com as credenciais fornecidas
   * @param {Object} credenciais - Objeto contendo email e password
   */
  preencherFormulario(credenciais) {
    if (credenciais.email) {
      this.elements.emailInput().clear().type(credenciais.email);
    }
    
    if (credenciais.password) {
      this.elements.passwordInput().clear().type(credenciais.password);
    }
    
    return this;
  }

 
  clicarBotaoEntrar() {
    this.elements.entrarButton().click();
    
    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 201]);
    return this;
  }


  verificarLoginSucesso() {

    cy.get('body').then(($body) => {
      
      if ($body.find('[data-testid=usuario-logado]').length > 0) {
        this.elements.userArea().should('be.visible');
      } else {

        cy.contains(/Bem.vindo|Olá|Logado com sucesso/i, { timeout: 10000 }).should('exist');
      }
    });
    return this;
  }

  verificarRedirecionamentoParaHome() {

    cy.url().should('match', /(admin|home|dashboard)/);
    
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid=home]').length > 0) {
        this.elements.homeLink().should('be.visible');
      }
    });
    return this;
  }
}

export default new LoginPage();
