const userService = require('./userService');
const { User } = require('../../models');

const generateInstance = () => {
  const userRepository = User;
  return {
    userExists: userService.userExists(userRepository),
  };
};

module.exports = generateInstance;
