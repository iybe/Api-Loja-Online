const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

function generateToken(params = {}, tipo = 'usuario') {
  const secret = tipo === 'usuario' ? authConfig.user : authConfig.admin;

  return jwt.sign(params, secret, {
    expiresIn: 7200,
  });
}

module.exports = generateToken;
