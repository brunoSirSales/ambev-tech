# Testes Automatizados com Cypress – ServeRest

Este repositório contém uma suíte de testes automatizados para a aplicação ServeRest, abrangendo tanto testes de API quanto testes End-to-End (E2E) de front-end. O objetivo é garantir a qualidade dos principais fluxos do sistema, desde a camada de API até a interface do usuário.

---

🚀 **Testes de API**

Os testes de API estão localizados em `cypress/e2e/api-tests` e cobrem:

* **Usuários:** Cadastro, listagem e validação de duplicidade de e-mail.

* **Login:** Autenticação com credenciais válidas e inválidas.

* **Produtos:** Cadastro, edição, deleção e validação de permissões (token JWT).

**Destaques:**

* Cada teste cria e remove seus próprios dados, garantindo isolamento.

* Utilização de schemas JSON (Ajv) para validação das respostas.

* Os testes de API não impactam os testes E2E de front-end.

---

🖥️ **Testes de Front-End (E2E)**

Os testes E2E simulam interações reais do usuário na interface web do ServeRest.

* **Localização:** `cypress/e2e/step_definitions/`

* **Exemplo de fluxo testado:** Cadastro de produto via interface, login, cadastro de usuário, navegação e validação de mensagens.

* **Boas práticas:** Uso de seletores `data-testid`, validação de URLs, uso de comandos customizados, tratamento de dados dinâmicos e limpeza de estado entre cenários.

**Ferramentas e padrões:**

* Estrutura BDD com Cucumber (caso esteja usando arquivos `.feature`).

* Hooks de preparação e limpeza (`before`, `after`, `afterEach`).

* Separação clara entre testes de API e E2E para facilitar manutenção.

---

⚙️ **Tecnologias Utilizadas**

* **Cypress** — Testes E2E e API.

* **Ajv** — Validação de schemas JSON.

* **Cucumber** (opcional) — Testes BDD.

* **Node.js** (para execução dos testes).

---

🛠️ **Como Executar os Testes**

1.  **Instale as dependências**

    ```bash
    npm install
    ```

2.  **Execute os testes de API**

    ```bash
    npx cypress run --spec "cypress/e2e/api-tests/*.cy.js"
    ```

3.  **Execute os testes de Front-End (E2E)**

    * Para rodar todos os testes (API + E2E):

        ```bash
        npx cypress run
        ```

    * Para rodar em modo interativo (útil para depuração):

        ```bash
        npx cypress open
        ```

    * Para rodar apenas um teste específico:

        ```bash
        npx cypress run --spec "cypress/e2e/step_definitions/cadastroProduto/cadastroProduto.steps.js"
        ```

---

🧩 **Comandos Customizados**

O arquivo `cypress/support/commands.js` centraliza comandos reutilizáveis, como:

* Login automatizado na interface

* Cadastro de usuários para login

* Preenchimento de formulários dinâmicos

* Espera e clique em elementos visíveis

* Validação de textos e screenshots customizados
