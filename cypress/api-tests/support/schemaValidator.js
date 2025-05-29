// Utilitário para validação de esquemas JSON usando AJV
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

/**
 * Valida um objeto JSON contra um esquema
 * @param {Object} json - O objeto JSON a ser validado
 * @param {Object} schema - O esquema para validação
 * @returns {boolean} - Retorna true se o objeto for válido
 */
function validateSchema(json, schema) {
  const validate = ajv.compile(schema);
  const valid = validate(json);
  
  if (!valid) {
    console.error('Erros de validação:', validate.errors);
    throw new Error(`Falha na validação do esquema: ${JSON.stringify(validate.errors)}`);
  }
  
  return true;
}

module.exports = { validateSchema };
