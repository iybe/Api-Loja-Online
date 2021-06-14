const mongoose = require('../database/index');

const EndereçoSchema = new mongoose.Schema({
  IDUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true,
  },
  apelido: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  cidade: {
    type: String,
    required: true,
  },
  bairro: {
    type: String,
    required: true,
  },
  rua: {
    type: String,
    required: true,
  },
  numero: {
    type: String,
    required: true,
  },
  complemento: {
    type: String,
    required: false,
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

const Endereço = mongoose.model('Endereço', EndereçoSchema);

module.exports = Endereço;
