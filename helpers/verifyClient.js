const { User, Post } = require('../models');

const existsEmailOnDatabase = (email) => User.findOne({ where: { email } });
const verifyOwner = (postId, userId) => Post.findOne({ where: { id: postId, userId } });
const existsPost = (id) => Post.findOne({ where: { id } });

module.exports = {
  existsEmailOnDatabase,
  verifyOwner,
  existsPost,
};
