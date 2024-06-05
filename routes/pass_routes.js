const express = require('express');
const router = express.Router();
const passController = require('../controllers/passController');

// crear un nuevo abono
router.post('/passes', passController.createPass);

// eliminar un abono por ID
router.delete('/passes/:id', passController.deletePass);

// obtener todos los abonos
router.get('/passes', passController.getAllPasses);

// actualizar un abono por ID
router.put('/passes/:id', passController.updatePass);

// obtener un abono por ID
router.get('/passes/:id', passController.getPassById);

module.exports = router;
