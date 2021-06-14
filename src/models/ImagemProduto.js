const mongoose = require('../database/index');

const ImagemProdutoSchema = new mongoose.Schema({
  IDProduto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produto',
    require: true,
  },
  isAvatar: {
    type: Boolean,
    required: true,
  },
  apelido: {
    type: String,
    required: true,
  },
  imagem: {
    type: String,
    required: true,
  },
  imagem_url: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

const ImagemProduto = mongoose.model('ImagemProduto', ImagemProdutoSchema);

module.exports = ImagemProduto;
