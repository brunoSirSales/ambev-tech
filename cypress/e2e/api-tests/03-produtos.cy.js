/// <reference types="cypress" />

/**
 * Testes de API para o endpoint de produtos do ServeRest
 * https://serverest.dev/
 */

describe('API ServeRest - Testes de Produtos', () => {
  let token;
  let usuarioId;
  let produtoId;
  
  before(() => {
    const timestamp = new Date().getTime();
    const email = `admin.produtos${timestamp}@teste.com`;
    const senha = 'teste@123';
    
    const usuario = {
      nome: `Admin Produtos ${timestamp}`,
      email: email,
      password: senha,
      administrador: 'true'
    };
    
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      body: usuario
    }).then((response) => {
      expect(response.status).to.eq(201);
      usuarioId = response.body._id;
      
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        body: {
          email: email,
          password: senha
        }
      }).then((loginResponse) => {
        expect(loginResponse.status).to.eq(200);
        token = loginResponse.body.authorization;
      });
    });
  });
  
  afterEach(() => {
    if (produtoId) {
      cy.request({
        method: 'DELETE',
        url: `https://serverest.dev/produtos/${produtoId}`,
        headers: {
          Authorization: token
        },
        failOnStatusCode: false
      });
      produtoId = null;
    }
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
  
  it('Deve cadastrar um novo produto com sucesso', () => {
    const timestamp = new Date().getTime();
    
    const produto = {
      nome: `Cerveja Ambev Premium ${timestamp}`,
      preco: 1599,
      descricao: `Cerveja premium da Ambev, refrescante e de alta qualidade ${timestamp}`,
      quantidade: 10
    };
    
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos',
      headers: {
        Authorization: token
      },
      body: produto
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('message').and.to.eq('Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id');
      
      produtoId = response.body._id;
      
      cy.request({
        method: 'GET',
        url: `https://serverest.dev/produtos/${produtoId}`
      }).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body.nome).to.eq(produto.nome);
        expect(getResponse.body.preco).to.eq(produto.preco);
        expect(getResponse.body.descricao).to.eq(produto.descricao);
        expect(getResponse.body.quantidade).to.eq(produto.quantidade);
        expect(getResponse.body._id).to.eq(produtoId);
      });
    });
  });
  
  it('Deve editar um produto com sucesso', () => {

    const timestamp = new Date().getTime();
    
    const produto = {
      nome: `Cerveja Ambev Edição Especial ${timestamp}`,
      preco: 1899,
      descricao: `Cerveja edição especial da Ambev ${timestamp}`,
      quantidade: 5
    };
    
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos',
      headers: {
        Authorization: token
      },
      body: produto
    }).then((response) => {
      expect(response.status).to.eq(201);
      produtoId = response.body._id;
      
      const produtoAtualizado = {
        nome: `${produto.nome} (Atualizado)`,
        preco: produto.preco + 100,
        descricao: `${produto.descricao} (Atualizada)`,
        quantidade: produto.quantidade + 5
      };
      
      cy.request({
        method: 'PUT',
        url: `https://serverest.dev/produtos/${produtoId}`,
        headers: {
          Authorization: token
        },
        body: produtoAtualizado
      }).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);
        expect(updateResponse.body).to.have.property('message').and.to.eq('Registro alterado com sucesso');
        
        cy.request({
          method: 'GET',
          url: `https://serverest.dev/produtos/${produtoId}`
        }).then((getResponse) => {
          expect(getResponse.status).to.eq(200);
          expect(getResponse.body.nome).to.eq(produtoAtualizado.nome);
          expect(getResponse.body.preco).to.eq(produtoAtualizado.preco);
          expect(getResponse.body.descricao).to.eq(produtoAtualizado.descricao);
          expect(getResponse.body.quantidade).to.eq(produtoAtualizado.quantidade);
        });
      });
    });
  });
  
  it('Não deve cadastrar produto sem autenticação', () => {
    const timestamp = new Date().getTime();
    
    const produto = {
      nome: `Produto Sem Auth ${timestamp}`,
      preco: 1000,
      descricao: `Descrição do produto ${timestamp}`,
      quantidade: 10
    };
    
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos',
      body: produto,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message').and.to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
    });
  });
});
