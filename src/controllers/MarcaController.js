const { Router } = require('express');

const Marca = require('../models/Marca');
const authAdmin = require('../middlewares/authAdmin');

const router = Router();

router.post('/create', authAdmin, async (req, res) => {
  const { nome } = req.body;

  try {
    if(await Marca.findOne({ nome })){
      return res.status(400).send({ error: 'Marca já existe'});
    }

    const MarcaCriada = await Marca.create(req.body);

    return res.send(MarcaCriada);
  } catch (error) {
    return res.status(400).send({ error: 'Falha no Registro' });
  }
});

router.get('/show', async (req, res) => {
  try {
    const marcas = await Marca.find();

    return res.json(marcas);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao retornar Marcas' });
  }
});

router.get('/index/:IDMarca', async (req, res) => {
  try {
    const marca = await Marca.findById(req.params.IDMarca);

    return res.json(marca);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao retornar Marca' });
  }
});

router.put('/update/:IDMarca', authAdmin, async (req, res) => {
  const { nome } = req.body;

  try {
    const novaMarca = await Marca.findByIdAndUpdate(req.params.IDMarca, {
      nome,
      updated: Date.now()
    }, { new: true });

    return res.send(novaMarca);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao atualizar Marca' });
  }
});

module.exports = router;
