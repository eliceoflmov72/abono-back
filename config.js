require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  secretJwtToken: process.env.SECRET_JWT_TOKEN
};