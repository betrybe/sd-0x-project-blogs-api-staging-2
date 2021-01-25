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

router.get('/', authMiddleware, async (req, res) => { });

router.get('/search', authMiddleware, async (req, res) => {
    const query = req.query.q;
    return res.json({ data: query }).send();
});

router.get('/:id', authMiddleware, async (req, res) => { });

router.put('/:id', authMiddleware, async (req, res) => { });

router.delete('/:id', authMiddleware, async (req, res) => { });

module.exports = router;
