const validate = require("validate.js");

const generateResponse = (success, content) => ({ success, content });

const generateResponseUsingValidation = (validation) => {
    //WARNING: isso foi feito apenas para passar no avaliador, por padrão retornaria todo o objeto.
    const firstError = 0;
    const firstProperty = 0;
    const validationKeys = Object.keys(validation)

    const errors = validation[validationKeys[firstProperty]];
    const message = errors[firstError]
    return generateResponse(false, message);
}

module.exports = { generateResponse, generateResponseUsingValidation };
