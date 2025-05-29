/// <reference types="cypress" />

const { usuarioSchema, listaUsuariosSchema } = require('../schemas/usuario.schema');

describe('API ServeRest - Testes de Usuários', () => {
  let usuarioId;
  
  afterEach(() => {
    if (usuarioId) {
      cy.excluirUsuario(usuarioId);
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
      
      cy.validateJsonSchema(response.body, listaUsuariosSchema);
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
        
        cy.validateJsonSchema(getResponse.body, usuarioSchema);
      });
    });
  });
  
  it('Não deve cadastrar um usuário com email já existente', () => {

    cy.criarUsuarioAleatorio().then((usuarioCriado) => {
      usuarioId = usuarioCriado._id;
      
      const usuarioDuplicado = {
        nome: 'Outro usuário',
        email: usuarioCriado.email, 
        password: 'senha123',
        administrador: 'false'
      };
      
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body: usuarioDuplicado,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message').and.to.eq('Este email já está sendo usado');
      });
    });
  });
  
  it('Deve excluir um usuário com sucesso', () => {
    
    cy.criarUsuarioAleatorio().then((usuarioCriado) => {
      
      cy.request({
        method: 'DELETE',
        url: `https://serverest.dev/usuarios/${usuarioCriado._id}`
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message').and.to.eq('Registro excluído com sucesso');
        
        cy.request({
          method: 'GET',
          url: `https://serverest.dev/usuarios/${usuarioCriado._id}`,
          failOnStatusCode: false
        }).then((getResponse) => {
          expect(getResponse.status).to.eq(400);
          expect(getResponse.body).to.have.property('message').and.to.eq('Usuário não encontrado');
        });
      });
    });
  });
});
