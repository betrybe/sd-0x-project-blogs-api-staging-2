const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const authMiddleware = require('../middlewares/authMiddleware');

router.get("/", authMiddleware, async (req, res) => { })

router.get("/:id", authMiddleware, async (req, res) => { })

router.put("/:id", authMiddleware, async (req, res) => { })

router.delete("/:id", authMiddleware, async (req, res) => { })



module.exports = router;
