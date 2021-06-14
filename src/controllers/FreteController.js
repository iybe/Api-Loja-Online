const { Router } = require('express');

const Frete = require('../models/Frete');
const RProdutoFrete = require('../models/RProdutoFrete');

const authAdmin = require('../middlewares/authAdmin');

const router = Router();

router.get('/show', async (req, res) => {
  const fretes = await Frete.find();

  return res.json(fretes);
});

router.post('/create', authAdmin, async (req, res) => {
  const { nome } = req.body;

  try {
    if(await Frete.findOne({ nome })){
      return res.status(400).send({ error: 'Frete ja existente' });
    }

    const FreteCriado = await Frete.create(req.body);

    return res.send(FreteCriado);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao criar frete' });
  }
})

router.get('/index/:IDFrete', async (req, res) => {
  try {
    const freteRetornado = await Frete.findOne({ _id: req.params.IDFrete });

    return res.json(freteRetornado);
  } catch (error) {
    return res.status(400).send({ error: "Erro no retorno do Frete especificado" });
  }
});

router.put('/update/:IDFrete', authAdmin, async (req, res) => {
  const data = req.body;

  try {
    const frete = await Frete.findByIdAndUpdate(req.params.IDFrete, {
      ...data,
      updated: Date.now()
    }, { new: true });

    return res.send(frete);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao atualizar Frete' });
  }
});

router.post('/relacionar', authAdmin, async (req, res) => {
  const { IDFrete, IDProduto } = req.body;
  try {
    const R = await RProdutoFrete.create({ IDFrete, IDProduto });
    return res.send(R);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao criar Relaçao' });
  }
});

router.get('/freteByProduto/:IDProduto', async (req, res) => {
  const IDProduto = req.params.IDProduto;
  try {
    const relaçoes = await RProdutoFrete.find({ IDProduto });
    const ids = relaçoes.map(r => r.IDProduto);
    const fretes = await RProdutoFrete.find({ IDProduto: ids });
    return res.json(fretes);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao buscar fretes' });
  }
});

module.exports = router;
