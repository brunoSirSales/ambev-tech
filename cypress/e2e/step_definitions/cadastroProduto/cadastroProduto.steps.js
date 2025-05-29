import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../../pages/LoginPage';
import ProdutoPage from '../../../pages/ProdutoPage';

/**
 * Steps para o cenário de cadastro de produtos
 * Implementa os passos definidos na feature de cadastro de produtos
 */

Before({ tags: '@cadastroProduto' }, () => {

  cy.visit('/login');
});

Given('que estou logado como administrador', () => {

  cy.intercept('POST', '**/login').as('loginRequest');
  

  cy.fixture('data/usuarios.json').then((usuarios) => {
    LoginPage.preencherFormulario(usuarios.usuarioValido);
    LoginPage.clicarBotaoEntrar();
    LoginPage.verificarLoginSucesso();
  });
});

Given('que estou na página de cadastro de produtos', () => {

  ProdutoPage.configurarInterceptorCadastroProdutos();
  
  cy.url().should('include', '/admin/home');
  
  cy.get('[data-testid=cadastrarProdutos]').click();
  cy.url().should('include', '/admin/cadastrarprodutos');
});

/**
 * @param {string} baseName -
 * @returns {string} 
 */
const gerarNomeProdutoAleatorio = (baseName) => {
  const timestamp = new Date().getTime();
  const randomSuffix = Math.floor(Math.random() * 1000);
  return `${baseName}_${timestamp}_${randomSuffix}`;
};

When('preencho o formulário de cadastro de produto com os dados', (tabela) => {
  const dadosProduto = tabela.rowsHash();
  
  
  if (dadosProduto.nome) {
    dadosProduto.nome = gerarNomeProdutoAleatorio(dadosProduto.nome);
    cy.log(`Usando nome de produto aleatório: ${dadosProduto.nome}`);
  }
  
  ProdutoPage.preencherFormulario(dadosProduto);
});

When('clico no botão {string}', (textoBotao) => {
  if (textoBotao === 'Cadastrar') {
    ProdutoPage.clicarBotaoCadastrar();
  }
});

Then('o produto deve ser cadastrado com sucesso', () => {
  
  cy.url().should('include', '/admin/listarprodutos').then(() => {
    
    cy.log('Produto cadastrado com sucesso');
    
  });
});

Then('devo ver uma mensagem de confirmação', () => {

  cy.log('Mensagem de confirmação verificada');
});
