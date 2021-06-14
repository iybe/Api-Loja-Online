const mongoose = require('../database/index');

const MarcaSchema = new mongoose.Schema({
  nome: {
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

const Marca = mongoose.model('Marca', MarcaSchema);

module.exports = Marca;
