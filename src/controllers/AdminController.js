const { Router } = require('express');

const generateToken = require('../services/generateToken');
const Admin = require('../config/data.json');

const router = Router();

router.post('/login', async (req, res) => {
  const { id, senha } = req.body;

  if(!(id === Admin.id && senha === Admin.senha))
    return res.status(400).send({ error: 'Usuario nao existe ou Dados incorretos' });

  res.send({
    token: generateToken({}, 'admin'),
  });
});

module.exports = router;
