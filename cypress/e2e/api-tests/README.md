# Testes de API com Cypress

Este diretório contém testes automatizados para a API ServeRest (https://serverest.dev/) utilizando Cypress.

## Estrutura do Projeto

```
cypress/e2e/api-tests/
├── 01-usuarios.cy.js    # Testes para o endpoint de usuários
├── 02-login.cy.js       # Testes para o endpoint de login
├── 03-produtos.cy.js    # Testes para o endpoint de produtos
└── README.md            # Este arquivo
```

## Cenários de Teste Implementados

### 1. Usuários (01-usuarios.cy.js)
- Listar todos os usuários cadastrados
- Cadastrar um novo usuário com sucesso
- Validar que não é possível cadastrar um usuário com email já existente

### 2. Login e Autenticação (02-login.cy.js)
- Realizar login com sucesso usando credenciais válidas
- Validar que não é possível fazer login com email inválido
- Validar que não é possível fazer login com senha inválida

### 3. Produtos (03-produtos.cy.js)
- Cadastrar um novo produto com sucesso (requer autenticação)
- Editar um produto com sucesso
- Validar que não é possível cadastrar um produto sem autenticação

## Como Executar os Testes

### Executar todos os testes de API
```bash
npx cypress run --spec "cypress/e2e/api-tests/*"
```

### Executar um teste específico
```bash
npx cypress run --spec "cypress/e2e/api-tests/01-usuarios.cy.js"
```

### Executar os testes no modo interativo
```bash
npx cypress open
```
E depois selecionar os testes da pasta api-tests.

## Observações Importantes

- Os testes de API são independentes dos testes E2E de front-end e não interferem em sua execução
- Cada teste cria seus próprios dados de teste e faz a limpeza após a execução
- Os testes utilizam hooks `before`, `after` e `afterEach` para configuração e limpeza
- Todos os testes incluem validações de status code e estrutura de resposta
