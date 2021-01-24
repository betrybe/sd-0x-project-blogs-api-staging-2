const { Op } = require('sequelize');
const generateResponse = require('../shared/serviceResponse');

const createUser = (userRepository, jwtService) => async (displayName, email, password, image) => {

  const user = await userRepository.create({ displayName, email: email.toLowerCase(), password, image });
  user.password = '';
  return generateResponse(true, user);
};

const userExists = (userRepository) => async (email, password) => {
  const user = await userRepository.findOne({
    where: {
      [Op.and]: [
        { email: email.toLowerCase() },
        { password: password },
      ],
    },
  });

  return user !== null;
};

module.exports = { userExists };
