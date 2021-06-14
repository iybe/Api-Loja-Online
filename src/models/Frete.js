const mongoose = require('../database/index');

const FreteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  prazoMinimoEntrega: {
    type: Number,
    required: true,
  },
  prazoMaximoEntrega: {
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

const Frete = mongoose.model('Frete', FreteSchema);

module.exports = Frete;
