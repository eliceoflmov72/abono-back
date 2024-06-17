require('dotenv').config();

// Exportamos las variables de entorno
module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  secretJwtToken: process.env.SECRET_JWT_TOKEN,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY
};
