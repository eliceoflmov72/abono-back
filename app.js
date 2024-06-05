const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passRouter = require('./routes/pass_routes');
const userRouter = require('./routes/user_routes');
const refillRouter = require('./routes/refill_routes');

const app = express();

// Configurar CORS
app.use(cors());

// Conectar a la base de datos 'abono'
mongoose.connect('mongodb://127.0.0.1:27017/abono')
  .then(() => console.log('Conectado a la base de datos'))
  .catch((error) => console.error('Error al conectar a la base de datos:', error));

// Middleware
app.use(express.json());

// Usar las rutas
app.use('/api', passRouter); // Añade las rutas de abono
app.use('/api', userRouter); // Añade las rutas de usuario
app.use('/api', refillRouter); // Añade las rutas de refill

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
