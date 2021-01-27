const validate = require('validate.js');
const { Op } = require('sequelize');
const { generateResponse, generateResponseUsingValidation } = require('../shared/serviceResponse');
const { User } = require('../../models');

const createPost = (Post) => async (title, content, userId) => {
  const post = {
    content,
    title,
    userId,
    published: Date.now(),
    updated: Date.now(),
  };

  const validationResult = validate(post, postValidations);

  if (validationResult !== undefined) return generateResponseUsingValidation(validationResult);
  await Post.create(post);

  return generateResponse(true, post);
};

const getAll = (postRepository, User) => async () => {
  const posts = await postRepository.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });

  return generateResponse(true, posts);
};

const getById = (postRepository, User) => async (postId) => {
  if (isNaN(postId)) return generateResponse(false, { message: 'Post não existe' });

  const post = await postRepository.findByPk(postId, {
    include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
  });

  if (post === null) return generateResponse(false, { message: 'Post não existe' });

  return generateResponse(true, post);
};

const search = (postRepository, User) => async (text) => {
  const filter = { include: { model: User, as: 'user', attributes: { exclude: ['password'] } } };

  if (text !== '') {
    filter.where = {
      [Op.or]: [
        { title: text },
        { content: text },
      ],
    };
  }

  const posts = await postRepository.findAll(filter);
  return generateResponse(true, posts);
};

const deletePost = (postRepository) => async (postId, userId) => {
  const creatorId = await getCreatorId(postRepository, postId);

  if (creatorId === null) return generateResponse(false, {});

  if (isNaN(userId) || creatorId !== Number(userId)) return generateResponse(false, 'unauthorized');

  await postRepository.destroy({ where: { id: postId } });
  return generateResponse(true, {});
};

const edit = (postRepository) => async (postId, content, title, userId) => {
  const newProjectData = { postId, content, title, userId };
  const validationResult = validate(newProjectData, postValidations);
  if (validationResult !== undefined) return generateResponseUsingValidation(validationResult);

  const post = await postRepository.findOne({ where: { id: postId } });
  if (post.UserId !== Number(userId)) return generateResponse(false, 'unauthorized');

  if (post === null) return generateResponse(false, 'notfound');

  await post.update({
    content,
    title,
  });
  console.log('--', post);
  return generateResponse(true, post.dataValues);
};

const getCreatorId = async (postRepository, postId) => {
  const post = await postRepository.findByPk(postId, { attributes: ['UserId'] });

  return post !== null ? post.dataValues.UserId : null;
};

const postValidations = {
  title: { presence: { message: '"title" is required' } },
  content: { presence: { message: '"content" is required' } },
};

module.exports = { createPost, getAll, getById, deletePost, search, edit };
