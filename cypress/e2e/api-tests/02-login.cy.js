/// <reference types="cypress" />

/**
 * Testes de API para o endpoint de login do ServeRest
 * https://serverest.dev/
 */

describe('API ServeRest - Testes de Login e Autenticação', () => {
  let usuarioId;
  let usuarioEmail;
  let usuarioSenha;
  
  before(() => {
    const timestamp = new Date().getTime();
    usuarioEmail = `usuario.login${timestamp}@teste.com`;
    usuarioSenha = 'teste@123';
    
    const usuario = {
      nome: `Usuário Teste ${timestamp}`,
      email: usuarioEmail,
      password: usuarioSenha,
      administrador: 'true'
    };
    
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      body: usuario
    }).then((response) => {
      expect(response.status).to.eq(201);
      usuarioId = response.body._id;
    });
  });
  
  after(() => {
    if (usuarioId) {
      cy.request({
        method: 'DELETE',
        url: `https://serverest.dev/usuarios/${usuarioId}`,
        failOnStatusCode: false
      });
    }
  });
  
  it('Deve realizar login com sucesso usando credenciais válidas', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        email: usuarioEmail,
        password: usuarioSenha
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message').and.to.eq('Login realizado com sucesso');
      expect(response.body).to.have.property('authorization');
      
      expect(response.body.authorization).to.be.a('string').and.not.to.be.empty;
    });
  });
  
  it('Não deve realizar login com email inválido', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        email: 'email.inexistente@teste.com',
        password: usuarioSenha
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message').and.to.eq('Email e/ou senha inválidos');
      expect(response.body).not.to.have.property('authorization');
    });
  });
  
  it('Não deve realizar login com senha inválida', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        email: usuarioEmail,
        password: 'senha_incorreta'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message').and.to.eq('Email e/ou senha inválidos');
      expect(response.body).not.to.have.property('authorization');
    });
  });
});
