const { StatusCodes } = require('http-status-codes');
const { tokenIsValid } = require('../services/authService');

const authMiddleware = (request, response, next) => {
  const token = request.headers.authorization;


  if (tokenIsValid(token) === true) return next();

  if (token === '')
    return getResponserError(response, "Token não encontrado");

  return getResponserError(response, "Token expirado ou inválido");
};

const getResponserError = (response, message) => {
  return response.status(StatusCodes.UNAUTHORIZED).json({ message: message });
}

module.exports = authMiddleware;
