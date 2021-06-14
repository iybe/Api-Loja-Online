const mongoose = require('../database/index');

const ProdutoSchema = new mongoose.Schema({
  IDCategoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    require: true,
  },
  IDMarca: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Marca',
    require: true,
  },
  nome: {
    type: String,
    required: true,
  },
  detalhes: {
    type: String,
    required: false,
  },
  valorVenda: {
    type: Number,
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

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;
