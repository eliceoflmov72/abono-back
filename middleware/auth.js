const jwt = require('jsonwebtoken');
const config = require('../config');

// 1 - Definimos en una constante el middleware de autenticación
const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', ''); // Extraemos el token del header

  if (!token) {
    return res.status(401).send('Acceso denegado. Token no proporcionado.');
  }

  try {
    const verified = jwt.verify(token, config.secretJwtToken); // Verificar token con jwt
    req.user = verified; // Guardar usuario verificado en la solicitud
    next(); // Continuar al siguiente middleware
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ message: 'Token expirado', tokenExpired: true }); // Token expirado
    }
    res.status(400).send('Token inválido'); // Token inválido
  }
};

module.exports = auth;
