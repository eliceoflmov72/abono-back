const express = require('express');
const router = express.Router();
const passController = require('../controllers/passController'); // Asegúrate de que la ruta sea correcta

// Ruta para crear un nuevo abono
router.post('/passes', passController.createPass);

// Ruta para eliminar un abono por ID
router.delete('/passes/:id', passController.deletePass);

// Ruta para obtener todos los abonos
router.get('/passes', passController.getAllPasses);

// Ruta para actualizar un abono por ID
router.put('/passes/:id', passController.updatePass);

module.exports = router;