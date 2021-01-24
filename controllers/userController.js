const express = require('express');
const router = express.Router();
const { StatusCodes } = require("http-status-codes")
const authMiddleware = require("../middlewares/authMiddleware")

router.post("/", authMiddleware, (request, response) => {

    response.status(StatusCodes.OK).send();
})

module.exports = router;
