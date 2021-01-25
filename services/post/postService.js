const validate = require('validate.js');
const { generateResponse, generateResponseUsingValidation } = require('../shared/serviceResponse');

const createPost = (postRepository) => async (title, content, userId) => {
    const post = {
        content,
        title,
        user_id: userId,
        published: Date.now(),
        updated: Date.now(),
    }

    const validationResult = validate(post, postValidations);

    if (validationResult !== undefined) return generateResponseUsingValidation(validationResult);

    console.log("--------------------------------")
    console.log(validationResult)
    console.log("--------------------------------")
    const createdPost = await postRepository.create(post)

    return generateResponse(true, createPost);
};

const getAll = (postRepository) => async () => {

};

const getById = (postRepository) => async (postId) => {
};

const deletePost = (postRepository) => async (postId) => { };


const postValidations = {
    title: { presence: { message: '"title" is required' } },
    content: { presence: { message: '"content" is required' } },
};

module.exports = { createPost, getAll, getById, deletePost };
