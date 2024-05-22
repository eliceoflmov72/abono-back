const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const passRouter = require('./routes/pass_routes'); // Asegúrate de que la ruta sea correcta

// Configurar CORS
app.use(cors());

// Conectar a la base de datos 'abono'
mongoose.connect('mongodb://127.0.0.1:27017/abono')
  .then(() => console.log('Conectado a la base de datos'))
  .catch((error) => console.error('Error al conectar a la base de datos:', error));

// Middleware
app.use(express.json());

// Usar las rutas
app.use('/api', passRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
