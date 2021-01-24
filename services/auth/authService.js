const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'VF^6e7k2^5N@';

const authenticateUser = (userService) => async (email, password) => {
  const validationErros = validateLoginIputs(email, password);
  if (validationErros.length !== 0) return generateResponse(false, { message: validationErros });

  const loginAndPasswordAreCorrect = await userService.userExists(email, password);
  if (loginAndPasswordAreCorrect) {
    return generateResponse(true, { token: generateJwt('', '') });
  }
  return generateResponse(false, { message: 'Campos inválidos' });
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

const validateLoginIputs = (email, password) => {
  const errors = [];

  if (email === undefined) errors.push('"email" is required');

  if (email === '') errors.push('"email" is not allowed to be empty');

  if (password === undefined) errors.push('"password" is required');

  if (password === '') errors.push('"pasword" is not allowed to be empty');

  return errors;
};

const generateResponse = (success, content) => ({ success, content });

module.exports = { authenticateUser, tokenIsValid };
