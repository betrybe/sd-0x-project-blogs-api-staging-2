const userService = require('./userService');
const jwtService = require('../token');
const { User } = require('../../models');

const generateInstance = () => {
  const userRepository = User;
  return {
    userExists: userService.userExists(userRepository),
    createUser: userService.createUser(userRepository, jwtService),
    getUserbyId: userService.getUserbyId(userRepository)
  };
};

module.exports = { generateInstance };
