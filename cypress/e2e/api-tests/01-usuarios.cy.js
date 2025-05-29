/// <reference types="cypress" />

/**
 * Testes de API para o endpoint de usuários do ServeRest
 * https://serverest.dev/
 */

describe('API ServeRest - Testes de Usuários', () => {
  let usuarioId;
  
  afterEach(() => {
    if (usuarioId) {
      cy.request({
        method: 'DELETE',
        url: `https://serverest.dev/usuarios/${usuarioId}`,
        failOnStatusCode: false
      });
      usuarioId = null;
    }
  });
  
  it('Deve listar todos os usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/usuarios'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('quantidade');
      expect(response.body).to.have.property('usuarios');
      expect(response.body.usuarios).to.be.an('array');
      
      if (response.body.usuarios.length > 0) {
        const primeiroUsuario = response.body.usuarios[0];
        expect(primeiroUsuario).to.have.property('nome');
        expect(primeiroUsuario).to.have.property('email');
        expect(primeiroUsuario).to.have.property('password');
        expect(primeiroUsuario).to.have.property('administrador');
        expect(primeiroUsuario).to.have.property('_id');
      }
    });
  });
  
  it('Deve cadastrar um novo usuário com sucesso', () => {
    const timestamp = new Date().getTime();
    const email = `usuario.teste${timestamp}@teste.com`;
    
    const usuario = {
      nome: `Usuário Teste ${timestamp}`,
      email: email,
      password: 'teste@123',
      administrador: 'true'
    };
    
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      body: usuario
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('message').and.to.eq('Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id');
      
      usuarioId = response.body._id;
      
      cy.request({
        method: 'GET',
        url: `https://serverest.dev/usuarios/${usuarioId}`
      }).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body).to.include(usuario);
        expect(getResponse.body._id).to.eq(usuarioId);
      });
    });
  });
  
  it('Não deve cadastrar um usuário com email já existente', () => {

    const timestamp = new Date().getTime();
    const email = `usuario.duplicado${timestamp}@teste.com`;
    
    const usuario = {
      nome: `Usuário Teste ${timestamp}`,
      email: email,
      password: 'teste@123',
      administrador: 'false'
    };
    
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      body: usuario
    }).then((response) => {
      expect(response.status).to.eq(201);
      usuarioId = response.body._id;
      
      const usuarioDuplicado = {
        nome: 'Outro usuário',
        email: email,
        password: 'senha123',
        administrador: 'false'
      };
      
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body: usuarioDuplicado,
        failOnStatusCode: false
      }).then((duplicateResponse) => {
        expect(duplicateResponse.status).to.eq(400);
        expect(duplicateResponse.body).to.have.property('message').and.to.eq('Este email já está sendo usado');
      });
    });
  });
});
