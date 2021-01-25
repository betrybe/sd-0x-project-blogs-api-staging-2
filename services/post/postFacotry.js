const { Post, User } = require('../../models');
const postService = require('./postService');

const generateInstance = () => {
  const postRepository = Post;

  return {
    createPost: postService.createPost(postRepository),
    getAll: postService.getAll(postRepository, User),
    getById: postService.getById(postRepository, User),
    deletePost: postService.deletePost(postRepository),
  };
};

module.exports = { generateInstance };
