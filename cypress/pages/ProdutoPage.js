/**
 * Page Object para a página de cadastro de produtos
 * Encapsula todos os elementos e ações relacionadas à página de cadastro de produtos
 */
class ProdutoPage {

  elements = {
    nomeInput: () => cy.get('[data-testid=nome]'),
    precoInput: () => cy.get('[data-testid=preco]'),
    descricaoInput: () => cy.get('[data-testid=descricao]'),
    quantidadeInput: () => cy.get('[data-testid=quantity]'),
    cadastrarButton: () => cy.get('[data-testid=cadastarProdutos]'),
    successMessage: () => cy.get('[data-testid=mensagem-sucesso]'),
    errorMessage: () => cy.get('[data-testid=mensagem-erro]')
  };

  /**
   * Configura o interceptor para a requisição de cadastro de produtos
   * Não navega diretamente para a página, pois isso será feito pelo elemento de navegação
   */
  configurarInterceptorCadastroProdutos() {
    cy.intercept('POST', '**/produtos').as('cadastroProdutoRequest');
    return this;
  }

  /**
   * Preenche o formulário de cadastro de produto com os dados fornecidos
   * @param {Object} dadosProduto - Objeto contendo nome, preco, descricao e quantidade
   */
  preencherFormulario(dadosProduto) {
    if (dadosProduto.nome) {
      this.elements.nomeInput().clear().type(dadosProduto.nome);
    }
    
    if (dadosProduto.preco) {
      // Converter para inteiro para garantir que seja um valor numérico válido
      const precoInteiro = parseInt(dadosProduto.preco, 10);
      this.elements.precoInput().clear().type(precoInteiro);
    }
    
    if (dadosProduto.descricao) {
      this.elements.descricaoInput().clear().type(dadosProduto.descricao);
    }
    
    if (dadosProduto.quantidade) {
      // Converter para inteiro para garantir que seja um valor numérico válido
      const quantidadeInteiro = parseInt(dadosProduto.quantidade, 10);
      this.elements.quantidadeInput().clear().type(quantidadeInteiro);
    }
    
    return this;
  }

  /**
   * Clica no botão de cadastrar produto
   */
  clicarBotaoCadastrar() {
    this.elements.cadastrarButton().click();
    cy.wait('@cadastroProdutoRequest').its('response.statusCode').should('be.oneOf', [200, 201]);
    return this;
  }

  /**
   * Verifica se o cadastro do produto foi realizado com sucesso
   */
  verificarCadastroSucesso() {
    // Verifica se a mensagem de sucesso está visível e contém o texto esperado
    this.elements.successMessage().should('be.visible');
    this.elements.successMessage().should('contain', 'Cadastro realizado com sucesso');
    
    // Verifica se o produto aparece na lista de produtos (opcional)
    cy.contains('cervejaambev').should('exist');
    
    return this;
  }
}

export default new ProdutoPage();
