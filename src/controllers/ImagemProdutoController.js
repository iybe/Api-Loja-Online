const { Router } = require('express');
const multer = require('multer');

const ImagemProduto = require('../models/ImagemProduto');
const uploadConfig = require('../config/upload');
const authAdmin = require('../middlewares/authAdmin');

const router = Router();
const upload = multer(uploadConfig);

router.get('/show', authAdmin, async (req, res) => {
  const imagensProdutos = await ImagemProduto.find();

  return res.json(imagensProdutos);
});

router.get('/showByProduto/:IDProduto', async (req, res) => {
  try {
    const imagensProdutos = await ImagemProduto.find(
      { IDProduto: req.params.IDProduto },{
        IDProduto: 0,
        imagem: 0,
        created: 0,
        updated: 0,
        __v: 0
      });

    return res.json(imagensProdutos);
  } catch (error) {
    return res.status(400).send({ error: "Error ao retornar as Imagens do Produto"});
  }
});

router.post('/create', authAdmin, upload.single('image'), async (req, res) => {
  const { filename } = req.file;
  let { idproduto, isavatar, apelido } = req.headers;

  if(isavatar === 'true'){
    const imagem = await ImagemProduto.findOne({ IDProduto: idproduto, isAvatar: true});
    if(imagem){
      isavatar = 'false';
    }
  }

  const imagemProdutoCriada = await ImagemProduto.create({
    IDProduto: idproduto,
    isAvatar: isavatar === 'true' ? true : false,
    apelido,
    imagem: filename,
    imagem_url:  `http://localhost:3333/files/${filename}`,
  });

  return res.json(imagemProdutoCriada);
});

router.get('/imagemPrincipal/:IDProduto', async (req, res) => {
  const IDProduto = req.params.IDProduto;
  try {
    const imagem = await ImagemProduto.findOne({
      IDProduto,
      isAvatar: true
    },{
      IDProduto: 0,
      imagem: 0,
      created: 0,
      updated: 0,
      __v: 0
    });

    return res.json(imagem);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.put('/setImagemPrincipal', authAdmin, async (req, res) => {
  const { IDImagemProduto, IDProduto } = req.body;
  try {
    const imagem = await ImagemProduto.findOneAndUpdate({
      IDProduto,
      isAvatar: true
    },{
      isAvatar: false
    });

    if(!imagem){
      return res.status(400).send();
    }

    await ImagemProduto.findByIdAndUpdate(IDImagemProduto,{
      isAvatar: true
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
