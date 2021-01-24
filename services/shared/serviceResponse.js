const generateResponse = (success, content) => ({ success, content });

const generateResponseUsingValidation = (validation) => ({ message: "Vai ter algo aqui" });

module.exports = { generateResponse, generateResponseUsingValidation };
