const mongoose = require('../database/index');

const VendaSchema = new mongoose.Schema({
  IDProduto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produto',
    require: true,
  },
  IDFrete: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Frete',
    require: true,
  },
  IDUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true,
  },
  IDEndereço: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Endereço',
    require: true,
  },
  valorProduto: {
    type: Number,
    required: true,
  },
  valorFrete: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  dataEnvio: {
    type: Date,
    required: false,
  },
  dataEntrega: {
    type: Date,
    required: false,
  },
  quantidade: {
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

const Venda = mongoose.model('Venda', VendaSchema);

module.exports = Venda;
