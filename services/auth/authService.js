const { generateResponse } = require('../shared/serviceResponse');

const authenticateUser = (userService, jwtService) => async (email, password) => {
  const validationErros = validateLoginIputs(email, password);
  if (validationErros.length !== 0) return generateResponse(false, { message: validationErros });

  const user = await userService.userExists(email, password);
  if (user !== null) {
    return generateResponse(true, { token: jwtService.generateJwt(user.id, user.displayName) });
  }
  return generateResponse(false, { message: 'Campos inválidos' });
};

const validateLoginIputs = (email, password) => {
  const errors = [];
  // TODO: Refatorar com o Validate.JS
  if (email === undefined) errors.push('"email" is required');

  if (email === '') errors.push('"email" is not allowed to be empty');

  if (password === undefined) errors.push('"password" is required');

  if (password === '') errors.push('"password" is not allowed to be empty');

  return errors;
};

module.exports = { authenticateUser };
