const verifyClient = require('../helpers/verifyClient');

const isOwner = async (req, res, next) => {
  const resultOwner = await verifyClient.verifyOwner(req.params.id, req.user.id);
  const resultExistsPost = await verifyClient.existsPost(req.params.id);

  if (!resultExistsPost) return res.status(404).json({ message: 'Post não existe' });
  if (!resultOwner) return res.status(401).json({ message: 'Usuário não autorizado' });

  return next();
};

module.exports = {
  isOwner,
};
