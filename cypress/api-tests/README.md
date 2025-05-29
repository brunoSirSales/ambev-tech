# Testes de API com Cypress

Este diretório contém testes automatizados para a API ServeRest (https://serverest.dev/) utilizando Cypress.

## Estrutura do Projeto

```
cypress/api-tests/
├── fixtures/           # Dados de teste
├── schemas/            # Esquemas JSON para validação de respostas
├── specs/              # Arquivos de teste
├── support/            # Comandos personalizados e configurações
└── README.md           # Este arquivo
```

## Cenários de Teste Implementados

### 1. Usuários (01-usuarios.spec.js)
- Listar todos os usuários cadastrados
- Cadastrar um novo usuário com sucesso
- Validar que não é possível cadastrar um usuário com email já existente
- Excluir um usuário com sucesso

### 2. Login e Autenticação (02-login.spec.js)
- Realizar login com sucesso usando credenciais válidas
- Validar que não é possível fazer login com email inválido
- Validar que não é possível fazer login com senha inválida
- Verificar que o token é necessário para acessar rotas protegidas

### 3. Produtos (03-produtos.spec.js)
- Listar todos os produtos cadastrados
- Cadastrar um novo produto com sucesso (requer autenticação)
- Validar que não é possível cadastrar um produto com nome já existente
- Editar um produto com sucesso
- Excluir um produto com sucesso

## Como Executar os Testes

### Pré-requisitos
- Node.js (v20.17.0 ou superior)
- NPM (v10.x ou superior)

### Executar todos os testes de API
```bash
npm run test:api
```

### Executar os testes de API no modo interativo
```bash
npm run test:api:open
```

### Gerar relatórios
```bash
npm run report:api:merge
npm run report:api:generate
```

## Observações Importantes

- Os testes de API são independentes dos testes E2E de front-end
- Os testes utilizam o AJV para validação de esquemas JSON
- Os dados criados durante os testes são limpos automaticamente após a execução
