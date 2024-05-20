const express = require('express');
const router = express.Router();
const { Passes } = require('../../models/passes.model');

// Ruta para obtener todos los documentos de GenericBus
router.get('/', async (req, res) => {
    try {
        const passes = await Passes.find();
        res.json(passes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener un documento específico de GenericBus por ID
router.get('/:id', async (req, res) => {
    try {
        const pass = await Passes.findById(req.params.id);
        if (pass) {
            res.json(pass);
        } else {
            res.status(404).json({ message: 'GenericBus not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
