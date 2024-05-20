const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const routes = require('./routes'); // Importar el enrutador principal

// Configurar CORS
app.use(cors());

// Conectar a la base de datos 'abono'
mongoose.connect('mongodb://127.0.0.1:27017/abono', {
    // Las opciones 'useNewUrlParser' y 'useUnifiedTopology' ya no son necesarias.
});

// Middleware
app.use(express.json());

// Usar las rutas
app.use('/api', routes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
