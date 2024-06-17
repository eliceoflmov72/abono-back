const Pass = require('../models/pass');
const generateUUID = require('../shared/id_factory');

// Controlador para obtener abono por id
const getPassById = async (req, res) => {
    try {
        const { id } = req.params;
        const pass = await Pass.findOne({ id }); // findOne para buscar por id
        if (!pass) {
            return res.status(404).json({ message: 'Abono no encontrado' });
        }
        res.status(200).json(pass);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener abono', error });
    }
};

// Controlador para crear un nuevo abono
const createPass = async (req, res) => {
    try {
        const { company, coordinates, name, description, valid_period, price, image, type } = req.body;

        // Comprobar si existe un abono con == nombre / precio / tipo
        const existingPass = await Pass.findOne({ name, price, type });
        if (existingPass) {
            return res.status(400).json({ message: 'El abono ya existe' });
        }

        const newPass = new Pass({
            id: generateUUID(),
            company,
            coordinates,
            name,
            description,
            valid_period,
            price,
            image,
            type
        });

        const savedPass = await newPass.save();
        res.status(201).json(savedPass);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear abono', error });
    }
};

// Controlador para eliminar un abono por id
const deletePass = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPass = await Pass.findOneAndDelete({ id }); // findOneAndDelete para eliminar por id
        
        if (!deletedPass) {
            return res.status(404).json({ message: 'Abono no encontrado' });
        }

        res.status(200).json({ message: 'Abono eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar abono', error });
    }
};

// Controlador para obtener todos los abonos
const getAllPasses = async (req, res) => {
    try {
        const passes = await Pass.find(); // find para obtener todos los abonos
        res.status(200).json(passes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener abonos', error });
    }
};

// Controlador para actualizar un abono por id
const updatePass = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPass = await Pass.findOneAndUpdate({ id }, req.body, { new: true }); // findOneAndUpdate para actualizar por id

        if (!updatedPass) {
            return res.status(404).json({ message: 'Abono no encontrado' });
        }

        res.status(200).json(updatedPass);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar abono', error });
    }
};

module.exports = {
    getPassById,
    createPass,
    deletePass,
    getAllPasses,
    updatePass
};
