const { Router } = require('express');

const Produto = require('../models/Produto');
const ImagemProduto = require('../models/ImagemProduto');

const authAdmin = require('../middlewares/authAdmin');

const router = Router();

router.get('/show', async (req, res) => {
  const Produtos = await Produto.find();

  return res.json(Produtos);
});

router.post('/create', authAdmin, async (req, res) => {
  const { nome, IDCategoria, IDMarca } = req.body;

  try {
    if(await Produto.findOne({ nome, IDCategoria, IDMarca})){
      return res.status(400).send({ error: 'Produto ja existente' });
    }

    const ProdutoCriado = await Produto.create(req.body);

    return res.send(ProdutoCriado);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao criar produto' });
  }
})

router.get('/index/:IDProduto', async (req, res) => {
  try {
    const produtoRetornado = await Produto.findOne({ _id: req.params.IDProduto });

    let imageUrl = await ImagemProduto
      .findOne({ IDProduto: produtoRetornado._id, isAvatar: true }, { imagem_url: 1, _id: 0 });

    imageUrl = imageUrl ? imageUrl.imagem_url : "not found";

    return res.json({produtoRetornado, imageUrl});
  } catch (error) {
    return res.status(400).send({ error: "Erro no retorno do Produto especificado" });
  }
});

router.put('/update/:IDProduto', authAdmin, async (req, res) => {
  const data = req.body;

  try {
    const produto = await Produto.findByIdAndUpdate(req.params.IDProduto, {
      ...data,
      updated: Date.now()
    }, { new: true });

    return res.send(produto);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao atualizar Produto' });
  }
});

router.get('/searchByName/:nome', async (req, res) => {
  const name = req.params.nome;
  try {
    const reg = new RegExp(name,"gi");
    const produtos = await Produto.find({ nome: { $regex: reg } });

    if(!produtos){
      return res.json([]);
    }

    return res.json(produtos);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao retornar Produtos' });
  }
});

router.get('/search', async (req, res) => {
  const data = req.body;
  try {
    const { IDCategoria, valorMin, valorMax, porMarca } = data;

    let produtos;

    if(porMarca){
      const { IDMarca } = data;

      produtos = await Produto.find({
        IDCategoria,
        valorVenda: { $gt: valorMin, $lt: valorMax },
        IDMarca
      });
    }else{
      produtos = await Produto.find({
        IDCategoria,
        valorVenda: { $gt: valorMin, $lt: valorMax }
      });
    }

    return res.json(produtos);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao retornar resultado da Pesquisa' });
  }
});

module.exports = router;
