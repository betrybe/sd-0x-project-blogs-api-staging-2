const express = require('express');
const { User, Post } = require('../models');
const validationInputs = require('../middlewares/validationInputs');
const validationToken = require('../middlewares/validationToken');
const validationOwner = require('../middlewares/validationOwner');

const router = express.Router();

router.post('/',
  validationToken.hasToken,
  validationInputs.hasTitle,
  validationInputs.hasContent,
  async (req, res) => {
    try {
      const objFormated = { ...req.body, userId: req.user.id };
      const blog = await Post.create(objFormated);
      return res.status(201).json(blog);
    } catch (error) {
      res.status(500).send({ message: `FATAL ERROR 500: ${error}` });
    }
  });

router.get('/',
  validationToken.hasToken,
  async (req, res) => {
    try {
      const posts = await Post.findAll({
        where: { userId: req.user.id },
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
      });

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).send({ message: `FATAL ERROR 500: ${error}` });
    }
  });

router.get('/:id',
  validationToken.hasToken,
  async (req, res) => {
    try {
      const post = await Post.findOne({
        where: { userId: req.params.id },
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
      });

      if (post) return res.status(200).json(post);

      return res.status(404).json({ message: 'Post não existe' });
    } catch (error) {
      res.status(500).send({ message: `FATAL ERROR 500: ${error}` });
    }
  });

router.put('/:id',
  validationToken.hasToken,
  validationOwner.isOwner,
  validationInputs.hasTitle,
  validationInputs.hasContent,
  async (req, res) => {
    try {
      await Post.update(req.body, { where: { id: req.params.id } });

      return res.status(200).json({ ...req.body, userId: req.user.id });
    } catch (error) {
      res.status(500).send({ message: `FATAL ERROR 500: ${error}` });
    }
  });

router.delete('/:id',
  validationToken.hasToken,
  validationOwner.isOwner,
  async (req, res) => {
    try {
      await Post.destroy({ where: { id: req.params.id } });

      return res.status(204).json();
    } catch (error) {
      res.status(500).send({ message: `FATAL ERROR 500: ${error}` });
    }
  });

module.exports = router;
