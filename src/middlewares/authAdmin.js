const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: 'Nenhum Token Fornecido' });

  const parts = authHeader.split(' ');

  if (!parts.length === 2)
    return res.status(401).send({ error: 'Error no Token' });

  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatado' });

  jwt.verify(token, authConfig.admin, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalido' });

    return next();
  });
};
