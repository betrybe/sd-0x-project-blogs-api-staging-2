const validate = require('validate.js');
const { Op } = require('sequelize');
const { generateResponse, generateResponseUsingValidation } = require('../shared/serviceResponse');

const createUser = (userRepository, jwtService) => async (displayName, email, password, image) => {
  const userData = { displayName, email: email?.toLowerCase() ?? undefined, password, image };
  const validationResult = validate(userData, userValidations)

  if (validationResult !== undefined)
    return generateResponseUsingValidation(validationResult);

  const user = await userRepository.create(userData);
  user.password = '';
  return generateResponse(true, user);
};

const userExists = (userRepository) => async (email, password) => {
  const user = await userRepository.findOne({
    where: {
      [Op.and]: [
        { email: email.toLowerCase() },
        { password },
      ],
    },
  });

  return user !== null;
};

const userValidations = {
  displayName: {
    presence: { message: '"displayName" is required' },
    length: { minimum: 8, message: '"displayName" length must be at least 8 characteres long' },
  },
  email: { presence: { message: '"email" is required' }, email: { message: '"email" must be a valid email' } },
  password: {
    presence: { message: '"password" is required' },
    length: { minimum: 6, message: '"password" length must be at least 6 characteres long' },
  },
};

module.exports = { userExists, createUser };
