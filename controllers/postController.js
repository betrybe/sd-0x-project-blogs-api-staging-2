const express = require('express');

const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, async (req, res) => { });

router.get('/', authMiddleware, async (req, res) => { });

router.get('/search', authMiddleware, async (req, res) => {
  const query = req.query.q;
  return res.json({ data: query }).send();
});

router.get('/:id', authMiddleware, async (req, res) => { });

router.put('/:id', authMiddleware, async (req, res) => { });

router.delete('/:id', authMiddleware, async (req, res) => { });

module.exports = router;
