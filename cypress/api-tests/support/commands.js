// ***********************************************
// Comandos personalizados para testes de API
// ***********************************************

const { validateSchema } = require('./schemaValidator');

// Definir comandos personalizados para os testes de API
module.exports = (on, config) => {
  // Comando para validar esquema JSON
  Cypress.Commands.add('validateJsonSchema', (json, schema) => {
    return validateSchema(json, schema);
  });

  // Comando para fazer login e obter token
  Cypress.Commands.add('loginAPI', (email, password) => {
    return cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        email: email,
        password: password
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('authorization');
      return response.body.authorization;
    });
  });

  // Comando para criar um usuário com dados aleatórios
  Cypress.Commands.add('criarUsuarioAleatorio', (admin = false) => {
    const timestamp = new Date().getTime();
    const email = `usuario.teste${timestamp}@teste.com`;
    
    const usuario = {
      nome: `Usuário Teste ${timestamp}`,
      email: email,
      password: 'teste@123',
      administrador: admin ? 'true' : 'false'
    };
    
    return cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      body: usuario
    }).then((response) => {
      expect(response.status).to.be.oneOf([201, 200]);
      return { ...usuario, _id: response.body._id };
    });
  });

  // Comando para criar um produto com dados aleatórios
  Cypress.Commands.add('criarProdutoAleatorio', (token) => {
    const timestamp = new Date().getTime();
    
    const produto = {
      nome: `Produto Teste ${timestamp}`,
      preco: 100,
      descricao: `Descrição do produto teste ${timestamp}`,
      quantidade: 10
    };
    
    return cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos',
      headers: {
        Authorization: token
      },
      body: produto
    }).then((response) => {
      expect(response.status).to.eq(201);
      return { ...produto, _id: response.body._id };
    });
  });

  // Comando para limpar um usuário pelo ID
  Cypress.Commands.add('excluirUsuario', (id) => {
    return cy.request({
      method: 'DELETE',
      url: `https://serverest.dev/usuarios/${id}`,
      failOnStatusCode: false
    });
  });

  // Comando para limpar um produto pelo ID
  Cypress.Commands.add('excluirProduto', (id, token) => {
    return cy.request({
      method: 'DELETE',
      url: `https://serverest.dev/produtos/${id}`,
      headers: {
        Authorization: token
      },
      failOnStatusCode: false
    });
  });

  return config;
};
