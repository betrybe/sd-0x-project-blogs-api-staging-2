const userService = require('./userService');
const jwtService = require('../token');
const { Post } = require('../../models');
const postService = require('./postService');

const generateInstance = () => {
  const postRepository = Post;

  return {
    createPost: postService.createPost(postRepository),
    getAll: postService.getAll(postRepository),
    getById: postService.getById(postRepository),
    deletePost: postService.deletePost(postRepository),
  };
};

module.exports = { generateInstance };
