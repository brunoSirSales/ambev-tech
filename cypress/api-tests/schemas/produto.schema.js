const produtoSchema = {
  title: 'Esquema de validação para produto',
  type: 'object',
  required: ['nome', 'preco', 'descricao', 'quantidade', '_id'],
  properties: {
    nome: { type: 'string' },
    preco: { type: 'integer' },
    descricao: { type: 'string' },
    quantidade: { type: 'integer' },
    _id: { type: 'string' }
  }
};

const listaProdutosSchema = {
  title: 'Esquema de validação para lista de produtos',
  type: 'object',
  required: ['quantidade', 'produtos'],
  properties: {
    quantidade: { type: 'integer' },
    produtos: {
      type: 'array',
      items: {
        type: 'object',
        required: ['nome', 'preco', 'descricao', 'quantidade', '_id'],
        properties: {
          nome: { type: 'string' },
          preco: { type: 'integer' },
          descricao: { type: 'string' },
          quantidade: { type: 'integer' },
          _id: { type: 'string' }
        }
      }
    }
  }
};

module.exports = { produtoSchema, listaProdutosSchema };
