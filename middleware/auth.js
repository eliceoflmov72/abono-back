const jwt = require('jsonwebtoken');
const config = require('../config');

const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Acceso denegado. No se proporcionó un token.');
  }

  try {
    const verified = jwt.verify(token, config.secretJwtToken);
    req.user = verified;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ message: 'Token expirado', tokenExpired: true });
    }
    res.status(400).send('Token inválido');
  }
};

module.exports = auth;
