const { Router } = require('express');

const Categoria = require('../models/Categoria');
const authAdmin = require('../middlewares/authAdmin');

const router = Router();

router.post('/create', authAdmin, async (req, res) => {
  const { nome } = req.body;

  try {
    if(await Categoria.findOne({ nome })){
      return res.status(400).send({ error: 'Categoria já existe'});
    }

    const CategoriaCriada = await Categoria.create(req.body);

    return res.send(CategoriaCriada);
  } catch (error) {
    return res.status(400).send({ error: 'Falha no Registro' });
  }
});

router.get('/show', async (req, res) => {
  try {
    const categorias = await Categoria.find();

    return res.json(categorias);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao retornar Categorias' });
  }
});

router.get('/index/:IDCategoria', async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.IDCategoria);

    return res.json(categoria);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao retornar Categoria' });
  }
});

router.put('/update/:IDCategoria', authAdmin, async (req, res) => {
  const { nome } = req.body;

  try {
    const novaCategoria = await Categoria.findByIdAndUpdate(req.params.IDCategoria, {
      nome,
      updated: Date.now()
    }, { new: true });

    return res.send(novaCategoria);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao atualizar Categoria' });
  }
});

module.exports = router;
