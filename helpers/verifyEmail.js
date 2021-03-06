const { User } = require('../models');

const existsEmailOnDatabase = (email) => User.findOne({ where: { email } });

module.exports = { existsEmailOnDatabase };
