const validate = require('validate.js');
const { Op } = require('sequelize')
const { generateResponse, generateResponseUsingValidation } = require('../shared/serviceResponse');
const { User } = require('../../models')

const createPost = (postRepository) => async (title, content, userId) => {
    const post = {
        content,
        title,
        userId,
        published: Date.now(),
        updated: Date.now(),
    }

    const validationResult = validate(post, postValidations);

    if (validationResult !== undefined) return generateResponseUsingValidation(validationResult);
    const createdPost = await postRepository.create(post)


    return generateResponse(true, post);
};

const getAll = (postRepository, User) => async () => {
    const posts = await postRepository.findAll({
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
    });

    return generateResponse(true, posts);
};

const getById = (postRepository, User) => async (postId) => {

    if (isNaN(postId))
        return generateResponse(false, { message: "Post não existe" });

    const post = await postRepository.findByPk(postId, {
        include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
    });

    if (post === null)
        return generateResponse(false, { message: "Post não existe" });

    return generateResponse(true, post);
};

const search = (postRepository) => async (text) => {
    console.log(postRepository);
    const posts = await postRepository.findAll({
        where: {
            [Op.or]: [
                { title: text },
                { content: text }
            ]
        },
        include: { model: User, as: 'user', attributes: { exclude: ['password'] } }
    });
    console.log(posts)

    return generateResponse(true, posts);
}

const deletePost = (postRepository) => async (postId) => { };


const postValidations = {
    title: { presence: { message: '"title" is required' } },
    content: { presence: { message: '"content" is required' } },
};

module.exports = { createPost, getAll, getById, deletePost, search };
