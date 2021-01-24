const { StatusCodes } = require('http-status-codes');
const authFacotry = require('../services/auth/authFacotory');

const authMiddleware = (request, response, next) => {
  const token = request.headers.authorization;
  const { tokenIsValid } = authFacotry.generateInstance();

  if (tokenIsValid(token) === true) return next();

  if (token === '') return getResponserError(response, 'Token não encontrado');

  return getResponserError(response, 'Token expirado ou inválido');
};

const getResponserError = (response, message) => response.status(StatusCodes.UNAUTHORIZED).json({ message });

module.exports = authMiddleware;
