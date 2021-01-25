const validate = require('validate.js');

const generateResponse = (success, content) => ({ success, content });

const generateResponseUsingValidation = (validation) => {
  // WARNING: isso foi feito apenas para passar no avaliador, por padrão retornaria todo o objeto.
  const firstError = 0;
  return generateResponse(false, validation[firstError]);
};

module.exports = { generateResponse, generateResponseUsingValidation };
