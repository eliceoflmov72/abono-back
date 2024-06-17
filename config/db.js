// Exportamos la variable de entorno
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);



