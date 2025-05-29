/// <reference types="cypress" />

const { produtoSchema, listaProdutosSchema } = require('../schemas/produto.schema');

describe('API ServeRest - Testes de Produtos', () => {
  let token;
  let usuarioId;
  let produtoId;
  
  before(() => {
    cy.criarUsuarioAleatorio(true).then((usuario) => {
      usuarioId = usuario._id;
      
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        body: {
          email: usuario.email,
          password: usuario.password
        }
      }).then((response) => {
        token = response.body.authorization;
      });
    });
  });
  
  afterEach(() => {
    if (produtoId) {
      cy.excluirProduto(produtoId, token);
      produtoId = null;
    }
  });
  
  after(() => {
    if (usuarioId) {
      cy.excluirUsuario(usuarioId);
    }
  });
  
  it('Deve listar todos os produtos cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/produtos'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('quantidade');
      expect(response.body).to.have.property('produtos');
      expect(response.body.produtos).to.be.an('array');
      
      cy.validateJsonSchema(response.body, listaProdutosSchema);
    });
  });
  
  it('Deve cadastrar um novo produto com sucesso', () => {
    const timestamp = new Date().getTime();
    
    const produto = {
      nome: `Produto Teste ${timestamp}`,
      preco: 100,
      descricao: `Descrição do produto teste ${timestamp}`,
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
        
        cy.validateJsonSchema(getResponse.body, produtoSchema);
      });
    });
  });
  
  it('Não deve cadastrar um produto com nome já existente', () => {

    cy.criarProdutoAleatorio(token).then((produtoCriado) => {
      produtoId = produtoCriado._id;
      
      const produtoDuplicado = {
        nome: produtoCriado.nome,
        preco: 200,
        descricao: 'Outro produto com mesmo nome',
        quantidade: 5
      };
      
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        headers: {
          Authorization: token
        },
        body: produtoDuplicado,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message').and.to.eq('Já existe produto com esse nome');
      });
    });
  });
  
  it('Deve editar um produto com sucesso', () => {

    cy.criarProdutoAleatorio(token).then((produtoCriado) => {
      produtoId = produtoCriado._id;
      
      const produtoAtualizado = {
        nome: `${produtoCriado.nome} (Atualizado)`,
        preco: produtoCriado.preco + 50,
        descricao: `${produtoCriado.descricao} (Atualizada)`,
        quantidade: produtoCriado.quantidade + 5
      };
      
      cy.request({
        method: 'PUT',
        url: `https://serverest.dev/produtos/${produtoId}`,
        headers: {
          Authorization: token
        },
        body: produtoAtualizado
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message').and.to.eq('Registro alterado com sucesso');
        
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
  
  it('Deve excluir um produto com sucesso', () => {

    cy.criarProdutoAleatorio(token).then((produtoCriado) => {
      const idParaExcluir = produtoCriado._id;
      
      cy.request({
        method: 'DELETE',
        url: `https://serverest.dev/produtos/${idParaExcluir}`,
        headers: {
          Authorization: token
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message').and.to.eq('Registro excluído com sucesso');
        
        cy.request({
          method: 'GET',
          url: `https://serverest.dev/produtos/${idParaExcluir}`,
          failOnStatusCode: false
        }).then((getResponse) => {
          expect(getResponse.status).to.eq(400);
          expect(getResponse.body).to.have.property('message').and.to.eq('Produto não encontrado');
        });
      });
    });
  });
});
