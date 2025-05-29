# language: pt

Funcionalidade: Cadastro de usuários no sistema
  Como um novo usuário
  Eu quero me cadastrar no sistema
  Para que eu possa acessar as funcionalidades exclusivas para usuários registrados

  Contexto:
    Dado que estou na página de cadastro de usuários

  Cenário: Cadastro de usuário com sucesso
    Quando preencho o formulário com dados válidos
      | nome     | Bruno Teste                |
      | email    | bruno.teste@exemplo.com    |
      | password | senha@123                  |
      | admin    | true                       |
    E clico no botão "Cadastrar"
    Então devo visualizar a mensagem de sucesso "Cadastro realizado com sucesso"
    E devo ser redirecionado para a página de listagem de usuários
