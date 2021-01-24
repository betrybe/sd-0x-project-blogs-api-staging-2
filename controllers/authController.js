const express = require('express');

const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const authFactory = require('../services/auth/authFacotory');

router.post('/', async (req, res) => {
  const authService = authFactory.generateInstance();

  const { email, password } = req.body;
  const authResponse = await authService.authenticateUser(email, password);

  if (authResponse.sucess === true) return res.status(StatusCodes.OK).json(authResponse.content);

  const responseError = authResponse.content.message.length === 1 ? authResponse.content.message[0] : authResponse.content.message;
  return res.status(StatusCodes.BAD_REQUEST).json({ message: responseError });
});

module.exports = router;
