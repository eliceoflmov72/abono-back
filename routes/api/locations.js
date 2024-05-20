const express = require('express');
const router = express.Router();
const { Location, GenericBus } = require('../../models/passes.model');

// Ruta para obtener todas las ubicaciones
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener todos los documentos de GenericBus
router.get('/generic_bus', async (req, res) => {
    try {
        const genericBuses = await GenericBus.find();
        res.json(genericBuses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener un documento específico de GenericBus por ID
router.get('/generic_bus/:id', async (req, res) => {
    try {
        const genericBus = await GenericBus.findById(req.params.id);
        if (genericBus) {
            res.json(genericBus);
        } else {
            res.status(404).json({ message: 'GenericBus not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
