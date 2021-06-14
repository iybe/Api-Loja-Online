const { Router } = require('express');

const Venda = require('../models/Venda');
const Estoque = require('../models/Estoque');
const Produto = require('../models/Produto');
const Frete = require('../models/Frete');

const authAdmin = require('../middlewares/authAdmin');
const authUsuario = require('../middlewares/authUsuario');
const authAdminORUser = require('../middlewares/authAdminORUser');

const router = Router();

router.get('/show', authAdmin, async (req, res) => {
  const vendas = await Venda.find();

  return res.json(vendas);
});

router.post('/create', authUsuario, async (req, res) => {
  try {
    const { IDProduto, IDFrete, quantidade } = req.body;

    if(!(await Estoque.findOne({ IDProduto, quantidadeAtual: { $gte: quantidade } }))){
      return res.status(200).send({ falha: 'Produto não disponivel' });
    }

    const produto = await Produto.findById(IDProduto);
    console.log(produto);

    req.body.status = 'Solicitado';
    req.body.valorProduto = produto.valorVenda;

    const frete = await Frete.findById(IDFrete);
    req.body.valorFrete = frete.valor;
    console.log(frete);
    console.log(req.body);

    const VendaCriada = await Venda.create(req.body);

    return res.send(VendaCriada);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao criar Venda' });
  }
})

router.get('/index/:IDVenda', authAdminORUser, async (req, res) => {
  try {
    const venda = await Venda.findOne({ _id: req.params.IDVenda });

    return res.json(venda);
  } catch (error) {
    return res.status(400).send({ error: "Erro no retorno da Venda especificada" });
  }
});

router.get('/showByUsuario/:IDUsuario', authAdminORUser, async (req, res) => {
  try {
    const vendas = await Venda.findById(req.params.IDUsuario);

    if(!vendas){
      return res.json([]);
    }

    return res.json(vendas);
  } catch (error) {
    return res.status(400).send({ error: "Erro no retorno das Compras" });
  }
});

router.post('/confirmarEnvio', authAdmin, async (req, res) => {
  const { IDVenda, IDEstoque } = req.body;
  try {
    const venda = await Venda.findById(IDVenda);
    const estoque = await Estoque.findById(IDEstoque);
    if(venda.status === 'Solicitado'){
      if(estoque.quantidadeAtual < venda.quantidade){
        return res.status(400).send({ error: "Quantidade não disponivel no referido Estoque" });
      }

      await Venda.findByIdAndUpdate(IDVenda, {
        status: 'Enviado',
        dataEnvio: Date.now(),
        updated: Date.now()
      }, { new: true });

      await Estoque.findByIdAndUpdate(IDEstoque, {
        quantidadeAtual: estoque.quantidadeAtual - venda.quantidade,
        updated: Date.now()
      });

      return res.send({ status: 'Confirmação de Envio Bem Sucedida'});
    }else{
      return res.status(400).send({ error: "Venda não esta em estado de Solicitado" });
    }
  } catch (error) {
    return res.status(400).send({ error: "Erro na confirmaçao" });
  }
});

router.get('/confirmarRecebimento/:IDVenda', authUsuario, async (req, res) => {
  const IDVenda = req.params.IDVenda;
  try {
    const venda = await Venda.findById(IDVenda);
    if(venda.status === 'Enviado'){
      await Venda.findByIdAndUpdate(IDVenda, {
        status: 'Entregue',
        dataEntrega: Date.now(),
        updated: Date.now()
      }, { new: true });

      return res.send({ status: 'Confirmação de Recebimento Bem Sucedida'});
    }else{
      return res.status(400).send({ error: "Venda não esta em estado de Enviado" });
    }
  } catch (error) {
    return res.status(400).send({ error: "Erro na confirmaçao" });
  }
});

router.get('/searchByStatus/:status', authAdmin, async (req, res) => {
  const status = req.params.status;
  try {
    const vendas = await Venda.find({ status });
    if(!vendas){
      return res.json([]);
    }

    return res.json(vendas);
  } catch (error) {
    return res.status(400).send({ error: "Erro no retorno por status" });
  }
});

router.get('/valorVendido', authAdmin, async (req, res) => {
  try {
    const vendas = await Venda.find();
    if(!vendas){
      return res.json({ valor: 0 });
    }
    const valor = vendas.reduce(function(acumulador, venda) {
      return acumulador + (venda.valorProduto * venda.quantidade);
    }, 0);
    return res.json({ valor });
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
