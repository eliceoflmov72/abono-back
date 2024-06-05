const express = require('express');
const router = express.Router();
const refillController = require('../controllers/refillController');

// crear un nuevo refill
router.post('/refills', refillController.createRefill);

// obtener todos los refills
router.get('/refills', refillController.getAllRefills);

// obtener un refill por ID
router.get('/refills/:id', refillController.getRefillById);

// actualizar un refill por ID
router.put('/refills/:id', refillController.updateRefill);

// eliminar un refill por ID
router.delete('/refills/:id', refillController.deleteRefill);

// obtener todos los refills por passId
router.get('/refills/pass/:passId', refillController.getRefillsByPassId);

module.exports = router;
