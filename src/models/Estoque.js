const mongoose = require('../database/index');

const EstoqueSchema = new mongoose.Schema({
  IDProduto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produto',
    require: true,
  },
  quantidadeInicial: {
    type: Number,
    required: true,
  },
  quantidadeAtual: {
    type: Number,
    required: true,
  },
  valorTotalCompra: {
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

const Estoque = mongoose.model('Estoque', EstoqueSchema);

module.exports = Estoque;
