const userService = require('./userService');
const { User } = require('../../models');

const generateInstance = () => {
  const userRepository = User;
  return {
    userExists: userService.userExists(userRepository),
    createUser: userService.createUser(userRepository, )
  };
};

module.exports = { generateInstance };
