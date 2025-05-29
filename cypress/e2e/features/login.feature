# language: pt

Funcionalidade: Login no sistema
  Como um usuário registrado
  Eu quero fazer login no sistema
  Para que eu possa acessar as funcionalidades exclusivas para usuários autenticados

  Contexto:
    Dado que estou na página de login

  @login
  Cenário: Login com credenciais válidas
    Quando preencho o formulário de login com as credenciais
      | email    | brunosq1@teste.com |
      | password | 123456             |
    E clico no botão de login "Entrar"
    Então devo ser autenticado com sucesso
    E devo ser redirecionado para a página inicial
