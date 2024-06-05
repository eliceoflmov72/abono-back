const Refill = require('../models/refill');
const Pass = require('../models/pass');
const generateUUID = require('../shared/id_factory');

// Controlador para obtener un refill por ID
const getRefillById = async (req, res) => {
    try {
        const { id } = req.params;
        const refill = await Refill.findOne({ id }); // Usando findOne para buscar por id
        if (!refill) {
            return res.status(404).json({ message: 'Refill no encontrado' });
        }
        res.status(200).json(refill);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el refill', error });
    }
};

// Controlador para crear un nuevo refill
const createRefill = async (req, res) => {
    try {
        const { passId, company, coordinates, name, description, valid_period, price, image, type } = req.body;

        // Verificar que el passId proporcionado existe
        const pass = await Pass.findOne({ id: passId });
        if (!pass) {
            return res.status(404).json({ message: 'Pass no encontrado' });
        }

        const newRefill = new Refill({
            id: generateUUID(),
            passId,
            company,
            coordinates,
            name,
            description,
            valid_period,
            image,
            type
        });

        const savedRefill = await newRefill.save();
        res.status(201).json(savedRefill);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el refill', error });
    }
};

// Controlador para eliminar un refill por ID
const deleteRefill = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRefill = await Refill.findOneAndDelete({ id }); // Usando findOneAndDelete para eliminar por id

        if (!deletedRefill) {
            return res.status(404).json({ message: 'Refill no encontrado' });
        }

        res.status(200).json({ message: 'Refill eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el refill', error });
    }
};

// Controlador para obtener todos los refills
const getAllRefills = async (req, res) => {
    try {
        const refills = await Refill.find();
        res.status(200).json(refills);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los refills', error });
    }
};

// Controlador para actualizar un refill por ID
const updateRefill = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRefill = await Refill.findOneAndUpdate({ id }, req.body, { new: true }); // Usando findOneAndUpdate para actualizar por id

        if (!updatedRefill) {
            return res.status(404).json({ message: 'Refill no encontrado' });
        }

        res.status(200).json(updatedRefill);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el refill', error });
    }
};

// Controlador para obtener todos los refills por passId
const getRefillsByPassId = async (req, res) => {
    try {
        const { passId } = req.params;
        const refills = await Refill.find({ passId });
        if (!refills.length) {
            return res.status(404).json({ message: 'No se encontraron refills para este passId' });
        }
        res.status(200).json(refills);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los refills por passId', error });
    }
};

module.exports = {
    getRefillById,
    createRefill,
    deleteRefill,
    getAllRefills,
    updateRefill,
    getRefillsByPassId
};
