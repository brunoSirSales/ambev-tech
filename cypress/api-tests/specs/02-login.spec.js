/// <reference types="cypress" />

describe('API ServeRest - Testes de Login e Autenticação', () => {
  let usuarioId;
  let usuarioEmail;
  let usuarioSenha;

  before(() => {
    cy.criarUsuarioAleatorio(true).then((usuario) => {
      usuarioId = usuario._id;
      usuarioEmail = usuario.email;
      usuarioSenha = usuario.password;
    });
  });
  
  after(() => {
    if (usuarioId) {
      cy.excluirUsuario(usuarioId);
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
  
  it('Deve verificar que o token é necessário para acessar rotas protegidas', () => {
    
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos',
      body: {
        nome: 'Produto Teste',
        preco: 100,
        descricao: 'Descrição do produto teste',
        quantidade: 10
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message').and.to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
    });
  });
});
