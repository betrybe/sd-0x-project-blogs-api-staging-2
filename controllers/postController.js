const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const { getUserId } = require('../services/token');
const authMiddleware = require('../middlewares/authMiddleware');
const postFacotry = require('../services/post/postFacotry')

router.post('/', authMiddleware, async (req, res) => {
    const postService = postFacotry.generateInstance();
    const { title, content } = req.body;
    const userId = getUserId(req.headers.authorization);

    const createPostResponse = await postService.createPost(title, content, userId);

    if (createPostResponse.success === true)
        return res.status(StatusCodes.CREATED).json(createPostResponse.content);

    return res.status(StatusCodes.BAD_REQUEST).json({ message: createPostResponse.content })
});

router.get('/', authMiddleware, async (req, res) => {
    const postService = postFacotry.generateInstance();
    const postsResponse = await postService.getAll();

    return res.status(StatusCodes.OK).json(postsResponse.content);
});

router.get('/search', authMiddleware, async (req, res) => {
    const postService = postFacotry.generateInstance();
    const query = req.query.q;
    const searchResponse = await postService.search(query);
    return res.status(StatusCodes.OK).json(searchResponse.content);

});

router.get('/:id', authMiddleware, async (req, res) => {
    const postService = postFacotry.generateInstance();
    const postId = req.params.id;
    const postsResponse = await postService.getById(postId);
    if (postsResponse.success === true)
        return res.status(StatusCodes.OK).json(postsResponse.content);
    return res.status(StatusCodes.NOT_FOUND).json(postsResponse.content)
});

router.put('/:id', authMiddleware, async (req, res) => { });

router.delete('/:id', authMiddleware, async (req, res) => { });

module.exports = router;
