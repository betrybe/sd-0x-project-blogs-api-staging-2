const express = require('express');
const { User } = require('../models');
const validationInputs = require('../middlewares/validationInputs');
const authJWT = require('../helpers/authJWT');

const router = express.Router();

router.post('/',
  validationInputs.hasEmail,
  validationInputs.hasPassword,
  async (req, res) => {
    try {
      const user = await User.findOne({ where: req.body });

      if (user) {
        const token = authJWT.createToken(req.body);
        return res.status(200).json({ token });
      }

      return res.status(400).json({ message: 'Campos inválidos' });
    } catch (error) {
      res.status(500).send({ message: `FATAL ERROR 500: ${error}` });
    }
  });

module.exports = router;
