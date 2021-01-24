const express = require('express');

const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const userFactory = require('../services/user/userFactory');
const logger = require('../server/logger');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', async (req, res) => {
  try {
    const userService = userFactory.generateInstance();
    const { displayName, email, password, image } = req.body;

    const response = await userService.createUser(displayName, email, password, image);

    if (response.success === true) return res.status(StatusCodes.CREATED).json(response.content);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: response.content });
  } catch (error) {
    logger.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Ocorreu um erro não esperado' });
  }
});

module.exports = router;
