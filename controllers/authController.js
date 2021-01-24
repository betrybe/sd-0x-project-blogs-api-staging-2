const express = require('express');

const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const authService = require('../services/authService');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const authResponse = authService.authenticateUser(email, password);

  if (authResponse.sucess === true) return res.status(StatusCodes.OK).json(authResponse.content);

  return res.status(StatusCodes.BAD_REQUEST).json(authResponse.content);
});

module.exports = router;
