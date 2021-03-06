const jwt = require('jsonwebtoken');

const secretPassword = 'vinicius-vasconcelos';

const createToken = (payload) => {
  const headers = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  return jwt.sign(payload, secretPassword, headers);
};

const verifyToken = (token) => {
  try {
    if (!token) return 'Token não encontrado';

    return jwt.verify(token, secretPassword);
  } catch (error) {
    return 'Token expirado ou inválido';
  }
};

module.exports = {
  createToken,
  verifyToken,
};
