const { Router } = require('express');

const generateToken = require('../services/generateToken');
const Usuario = require('../models/Usuario');

const router = Router();

router.post('/create',async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    if(await Usuario.findOne({ email })){
      return res.status(400).send({ error: 'Email já cadastrado'});
    }

    const usuarioCriado = await Usuario.create({
      nome,
      email,
      senha,
    });

    return res.send(usuarioCriado);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao criar Usuario'});
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  const user = await Usuario.findOne({ email, senha });

  if (!user)
    return res.status(400).send({ error: 'Usuario nao existe ou Dados incorretos' });

  user.senha = undefined;

  res.send({
    user,
    token: generateToken({ id: user._id }),
  });
});

module.exports = router;
