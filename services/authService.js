const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'VF^6e7k2^5N@';

const authenticateUser = (login, password) => {
  if (login === 'abc' && password === '123') {
    return { token: generateJwt('', '') };
  }
  return new AuthResponse(false, 'Login ou senha inválidos');
};

const generateJwt = (userId, name) => jwt.sign({ userId, name }, TOKEN_SECRET, { expiresIn: '1800s' });

const tokenIsValid = (token) => {
  try {
    jwt.verify(token, TOKEN_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { authenticateUser, tokenIsValid };
