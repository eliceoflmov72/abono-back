const jwt = require('jsonwebtoken');
const config = require('../config');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, config.secretJwtToken);
    req.user = decoded;
    console.log('Token verificado:', decoded); // IMPORTANT
    next();
  } catch (error) {
    console.error('Error en la verificación del token:', error); // IMPORTANT
    res.status(400).json({ message: 'Token no válido.' });
  }
};

module.exports = auth;
