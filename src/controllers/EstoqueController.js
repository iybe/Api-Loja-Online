const { Router } = require('express');

const Estoque = require('../models/Estoque');

const router = Router();

router.get('/show', async (req, res) => {
  const estoques = await Estoque.find();

  return res.json(estoques);
});

router.post('/create', async (req, res) => {
  try {
    req.body.quantidadeAtual = req.body.quantidadeInicial;

    const EstoqueCriado = await Estoque.create(req.body);

    return res.send(EstoqueCriado);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao criar Estoque' });
  }
})

router.get('/index/:IDEstoque', async (req, res) => {
  try {
    const estoque = await Estoque.findOne({ _id: req.params.IDEstoque });

    return res.json(estoque);
  } catch (error) {
    return res.status(400).send({ error: "Erro no retorno do Estoque especificado" });
  }
});

router.put('/update/:IDEstoque', async (req, res) => {
  const data = req.body;

  try {
    const estoque = await Estoque.findByIdAndUpdate(req.params.IDEstoque, {
      ...data,
      updated: Date.now()
    }, { new: true });

    return res.send(estoque);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao atualizar Estoque' });
  }
});

module.exports = router;
