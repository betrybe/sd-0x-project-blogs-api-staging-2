const express = require('express');
const { User } = require('../models');
const validationInputs = require('../middlewares/validationInputs');
const validationToken = require('../middlewares/validationToken');

const router = express.Router();

router.post('/',
  validationInputs.hasDisplayName,
  validationInputs.hasEmail,
  validationInputs.existsEmail,
  validationInputs.hasPassword,
  async (req, res) => {
    try {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      res.status(500).send({ message: `FATAL ERROR 500: ${error}` });
    }
  });

router.get('/',
  validationToken.hasToken,
  async (_req, res) => {
    try {
      const users = await User.findAll();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).send({ message: `FATAL ERROR 500: ${error}` });
    }
  });

router.get('/:id',
  validationToken.hasToken,
  async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (user) return res.status(200).json(user);

      return res.status(404).json({ message: 'Usuário não existe' });
    } catch (error) {
      res.status(500).send({ message: `FATAL ERROR 500: ${error}` });
    }
  });

router.delete('/me',
  validationToken.hasToken,
  async (req, res) => {
    try {
      const user = await User.destroy({ where: { email: req.user.email } });

      if (user) return res.status(204).json(user);

      return res.status(404).json({ message: 'Usuário não existe' });
    } catch (error) {
      res.status(500).send({ message: `FATAL ERROR 500: ${error}` });
    }
  });

module.exports = router;
