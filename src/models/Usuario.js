const mongoose = require('../database/index');

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  email: {
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

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;
