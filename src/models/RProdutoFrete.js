const mongoose = require('../database/index');

const RProdutoFreteSchema = new mongoose.Schema({
  IDFrete: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Frete',
    require: true,
  },
  IDProduto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produto',
    require: true,
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

const RProdutoFrete = mongoose.model('RProdutoFrete', RProdutoFreteSchema);

module.exports = RProdutoFrete;
