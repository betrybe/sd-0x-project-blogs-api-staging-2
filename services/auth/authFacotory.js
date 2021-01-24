const authService = require('./authService');
const userFactory = require('../user/userFactory');
const jwtService = require("../token");

const generateInstance = () => {
  const userService = userFactory.generateInstance();
  return {
    authenticateUser: authService.authenticateUser(userService,jwtService)
  };
};

module.exports = { generateInstance };
