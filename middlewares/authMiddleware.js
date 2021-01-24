const { StatusCodes } = require('http-status-codes');
const { tokenIsValid } = require("../services/token")
const authMiddleware = (request, response, next) => {
  const token = request.headers.authorization;

  if (tokenIsValid(token) === true) return next();

  if (token === '') return getResponserError(response, 'Token não encontrado');

  return getResponserError(response, 'Token expirado ou inválido');
};

const getResponserError = (response, message) => response.status(StatusCodes.UNAUTHORIZED).json({ message });

module.exports = authMiddleware;
