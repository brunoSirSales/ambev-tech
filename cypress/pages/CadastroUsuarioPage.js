/**
 * Page Object para a página de cadastro de usuários
 * Encapsula todos os elementos e ações relacionadas à página de cadastro
 */
class CadastroUsuarioPage {
  
  elements = {
    nomeInput: () => cy.get('[data-testid=nome]'),
    emailInput: () => cy.get('[data-testid=email]'),
    passwordInput: () => cy.get('[data-testid=password]'),
    adminCheckbox: () => cy.get('[data-testid=checkbox]'),
    cadastrarButton: () => cy.get('[data-testid=cadastrar]'),
    successMessage: () => cy.get('[data-testid=mensagem-sucesso]'),
    errorMessage: () => cy.get('[data-testid=mensagem-erro]')
  };


  acessarPaginaCadastro() {
    cy.visit('/cadastrarusuarios');
    cy.url().should('include', '/cadastrarusuarios');
    cy.title().should('include', 'Front - ServeRest');
    return this;
  }

  /**
   * Preenche o formulário de cadastro com os dados fornecidos
   * @param {Object} usuario - Objeto contendo os dados do usuário
   */
  preencherFormulario(usuario) {
    if (usuario.nome) {
      this.elements.nomeInput().clear().type(usuario.nome);
    }
    
    if (usuario.email) {
      this.elements.emailInput().clear().type(usuario.email);
    }
    
    if (usuario.password) {
      this.elements.passwordInput().clear().type(usuario.password);
    }
    
    if (usuario.admin === true) {
      this.elements.adminCheckbox().check();
    } else if (usuario.admin === false) {
      this.elements.adminCheckbox().uncheck();
    }
    
    return this;
  }


  clicarBotaoCadastrar() {
    this.elements.cadastrarButton().click();
    return this;
  }

  /**
   * Verifica se a mensagem de sucesso contém o texto esperado
   @param {string} mensagem - Texto esperado na mensagem de sucesso
   */
  verificarMensagemSucesso(mensagem) {
    
    cy.contains(mensagem, { timeout: 10000 }).should('be.visible');
    return this;
  }

  verificarRedirecionamentoParaListagem() {
    
    cy.url().should('match', /(admin|home|listarusuarios)/);
    return this;
  }
}

export default new CadastroUsuarioPage();
