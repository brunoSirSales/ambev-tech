import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CadastroUsuarioPage from '../../../pages/CadastroUsuarioPage';

/**
 * Steps para o cenário de cadastro de usuários
 * Implementa os passos definidos na feature de cadastro
 */

Given('que estou na página de cadastro de usuários', () => {
  CadastroUsuarioPage.acessarPaginaCadastro();
});

const gerarEmailAleatorio = (baseEmail) => {
  const partes = baseEmail.split('@');
  const caractereAleatorio = Math.random().toString(36).substring(2, 5); 
  return `${partes[0]}_${caractereAleatorio}@${partes[1]}`;
};

When('preencho o formulário com dados válidos', (tabela) => {
  const dadosUsuario = tabela.rowsHash();
  
  if (dadosUsuario.admin === 'true') {
    dadosUsuario.admin = true;
  } else if (dadosUsuario.admin === 'false') {
    dadosUsuario.admin = false;
  }
  
  if (dadosUsuario.email) {
    dadosUsuario.email = gerarEmailAleatorio(dadosUsuario.email);
    
    cy.log(`Usando e-mail aleatório: ${dadosUsuario.email}`);
  }
  
  CadastroUsuarioPage.preencherFormulario(dadosUsuario);
});

When('clico no botão de cadastro {string}', (textoBotao) => {
  if (textoBotao === 'Cadastrar') {
    CadastroUsuarioPage.clicarBotaoCadastrar();
  }
});

Then('devo visualizar a mensagem de sucesso {string}', (mensagem) => {
  CadastroUsuarioPage.verificarMensagemSucesso(mensagem);
});

Then('devo ser redirecionado para a página de listagem de usuários', () => {
  CadastroUsuarioPage.verificarRedirecionamentoParaListagem();
});
