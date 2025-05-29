// Schema para validação de resposta de usuário
const usuarioSchema = {
  title: 'Esquema de validação para usuário',
  type: 'object',
  required: ['nome', 'email', 'password', 'administrador', '_id'],
  properties: {
    nome: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
    administrador: { type: 'string', enum: ['true', 'false'] },
    _id: { type: 'string' }
  }
};

// Schema para validação de lista de usuários
const listaUsuariosSchema = {
  title: 'Esquema de validação para lista de usuários',
  type: 'object',
  required: ['quantidade', 'usuarios'],
  properties: {
    quantidade: { type: 'integer' },
    usuarios: {
      type: 'array',
      items: {
        type: 'object',
        required: ['nome', 'email', 'password', 'administrador', '_id'],
        properties: {
          nome: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
          administrador: { type: 'string', enum: ['true', 'false'] },
          _id: { type: 'string' }
        }
      }
    }
  }
};

module.exports = { usuarioSchema, listaUsuariosSchema };
