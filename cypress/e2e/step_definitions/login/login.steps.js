import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../../pages/LoginPage';

/**
 * Steps para o cenário de login
 * Implementa os passos definidos na feature de login
 */

Given('que estou na página de login', () => {
  LoginPage.acessarPaginaLogin();
});

When('preencho o formulário de login com as credenciais', (tabela) => {
  const credenciais = tabela.rowsHash();
  LoginPage.preencherFormulario(credenciais);
});

When('clico no botão de login {string}', (textoBotao) => {
  if (textoBotao === 'Entrar') {
    LoginPage.clicarBotaoEntrar();
  }
});

Then('devo ser autenticado com sucesso', () => {
  LoginPage.verificarLoginSucesso();
});

Then('devo ser redirecionado para a página inicial', () => {
  LoginPage.verificarRedirecionamentoParaHome();
});
