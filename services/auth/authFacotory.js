const authService = require('./authService');
const userFactory = require('../user/userFactory');

const generateInstance = () => {
  const userService = userFactory.generateInstance();
  return {
    authenticateUser: authService.authenticateUser(userService),
    tokenIsValid: authService.tokenIsValid(userService),
  };
};

module.exports = { generateInstance };
