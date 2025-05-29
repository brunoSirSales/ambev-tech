# language: pt

Funcionalidade: Cadastro de produtos no sistema
  Como um usuário administrador autenticado
  Eu quero cadastrar um novo produto no sistema
  Para que ele fique disponível para venda

  Contexto:
    Dado que estou logado como administrador
    E que estou na página de cadastro de produtos

  @cadastroProduto
  Cenário: Cadastro de produto com dados válidos
    Quando preencho o formulário de cadastro de produto com os dados
      | nome       | cervejaambev                                      |
      | preco      | 15.99                                             |
      | descricao  | Cerveja premium da Ambev, refrescante e de alta qualidade |
      | quantidade | 10                                                |
    E clico no botão "Cadastrar"
    Então o produto deve ser cadastrado com sucesso
