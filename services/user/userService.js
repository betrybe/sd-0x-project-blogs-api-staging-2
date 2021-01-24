const validate = require('validate.js');
const { Op } = require('sequelize');
const { generateResponse, generateResponseUsingValidation } = require('../shared/serviceResponse');
const { generateJwt } = require("../token")

const createUser = (userRepository, jwtService) => async (displayName, email, password, image) => {
  const userData = { displayName, email: email?.toLowerCase() ?? undefined, password, image };
  const validationResult = validate(userData, userValidations)

  if (validationResult !== undefined)
    return generateResponseUsingValidation(validationResult);

  try {
    const user = await userRepository.create(userData);
    return generateResponse(true, generateJwt(user.id, user.displayName));
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError')
      return generateResponse(false, 'Usuário já existe');
    throw error;
  }
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
    length: { minimum: 8, message: '"displayName" length must be at least 8 characters long' },
  },
  email: { presence: { message: '"email" is required' }, email: { message: '"email" must be a valid email' } },
  password: {
    presence: { message: '"password" is required' },
    length: { minimum: 6, message: '"password" length must be 6 characters long' },
  },
};

module.exports = { userExists, createUser };
