const authJWT = require('../helpers/authJWT');

const hasToken = (req, res, next) => {
  const result = authJWT.verifyToken(req.headers.authorization);
  req.user = result;

  if (typeof result === 'string') return res.status(401).json({ message: result });

  return next();
};

module.exports = {
  hasToken,
};
