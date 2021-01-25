const { BlogPost } = require('../../models');
const postService = require('./postService');

const generateInstance = () => {
  const postRepository = BlogPost;

  return {
    createPost: postService.createPost(postRepository),
    getAll: postService.getAll(postRepository),
    getById: postService.getById(postRepository),
    deletePost: postService.deletePost(postRepository),
  };
};

module.exports = { generateInstance };
