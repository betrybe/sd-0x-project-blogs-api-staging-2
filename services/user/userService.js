const { Op } = require('sequelize');

const userExists = (userRepository) => async (email, password) => {
  const user = await userRepository.findOne({
    where: {
      [Op.and]: [
        { email: email.toLowerCase() },
        { password: password.toLowerCase() },
      ],
    },
  });

  return user !== null;
};

module.exports = { userExists };
