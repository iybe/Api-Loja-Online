const mongoose = require('../database/index');

const CategoriaSchema = new mongoose.Schema({
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

const Categoria = mongoose.model('Categoria', CategoriaSchema);

module.exports = Categoria;
