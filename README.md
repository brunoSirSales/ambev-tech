# ambev-tech
# Projeto de Automação de Testes E2E - Ambev Tech

Desafio técnico da empresa Ambev Tech: testes automatizados E2E com Cypress e JavaScript.

## Tecnologias Utilizadas

- Node.js v20.17.0
- Cypress v14.4.0
- Cucumber/Gherkin para BDD
- Page Object Model (POM)
- Mochawesome para relatórios

## Estrutura do Projeto

```
├── cypress/
│   ├── e2e/
│   │   ├── features/           # Arquivos .feature com cenários em Gherkin
│   │   ├── step_definitions/   # Implementações dos passos do Cucumber
│   │   └── *.cy.js             # Testes tradicionais do Cypress
│   ├── fixtures/
│   │   └── data/               # Dados para os testes
│   ├── pages/                  # Page Objects
│   ├── reports/                # Relatórios gerados
│   └── support/                # Arquivos de suporte
├── cypress.config.js           # Configuração do Cypress
├── cypress-cucumber-preprocessor.config.js # Configuração do Cucumber
└── package.json
```

## Padrões de Projeto Aplicados

1. **Page Object Model (POM)**: Encapsula a interação com a interface em classes específicas para cada página.
2. **BDD com Gherkin**: Cenários escritos em linguagem natural estruturada.
3. **Data-Driven Testing**: Uso de fixtures para gerenciar dados de teste.
4. **Command Pattern**: Comandos personalizados do Cypress para reutilização de código.

## Cenários de Teste Implementados

1. **Cadastro de usuário com sucesso**
2. **Tentativa de cadastro com email já existente**
3. **Tentativa de cadastro com campos obrigatórios em branco**

## Como Executar os Testes

### Pré-requisitos

- Node.js v20.17.0 ou superior
- NPM v10 ou superior

### Instalação

```bash
npm install
```

### Executar Testes em Modo Headless

```bash
npm test
```

### Executar Testes com Interface Gráfica

```bash
npm run test:open
```

### Gerar Relatórios

```bash
npm run report:merge
npm run report:generate
```

## Boas Práticas Aplicadas

1. **Código Limpo e Organizado**: Estrutura clara e comentários explicativos.
2. **Reutilização de Código**: Uso de Page Objects e comandos personalizados.
3. **Assertivas Claras**: Verificações explícitas e descritivas.
4. **Independência de Testes**: Cada teste pode ser executado isoladamente.
5. **Documentação**: README detalhado e código bem documentado.
6. **Tratamento de Exceções**: Configuração para lidar com erros inesperados.

