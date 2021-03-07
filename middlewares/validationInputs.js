const verifyEmail = require('../helpers/verifyClient');

const responseError = (res, code, message) => res.status(code).json({ message });

const hasDisplayName = (req, res, next) => {
  if (req.body.displayName && req.body.displayName.length < 8) {
    return responseError(res, 400, '"displayName" length must be at least 8 characters long');
  }

  return next();
};

const hasEmail = (req, res, next) => {
  if (req.body.email === '') {
    return responseError(res, 400, '"email" is not allowed to be empty');
  }

  if (!req.body.email) {
    return responseError(res, 400, '"email" is required');
  }

  if (!req.body.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
    return responseError(res, 400, '"email" must be a valid email');
  }

  return next();
};

const existsEmail = async (req, res, next) => {
  if (await verifyEmail.existsEmailOnDatabase(req.body.email)) {
    return responseError(res, 409, 'Usuário já existe');
  }

  return next();
};

const hasPassword = (req, res, next) => {
  if (req.body.password === '') {
    return responseError(res, 400, '"password" is not allowed to be empty');
  }

  if (!req.body.password) {
    return responseError(res, 400, '"password" is required');
  }

  if (req.body.password.length < 6) {
    return responseError(res, 400, '"password" length must be 6 characters long');
  }

  return next();
};

const hasTitle = (req, res, next) => {
  if (!req.body.title) {
    return responseError(res, 400, '"title" is required');
  }

  return next();
};

const hasContent = (req, res, next) => {
  if (!req.body.content) {
    return responseError(res, 400, '"content" is required');
  }

  return next();
};

module.exports = {
  hasDisplayName,
  hasEmail,
  hasPassword,
  existsEmail,
  hasTitle,
  hasContent,
};
