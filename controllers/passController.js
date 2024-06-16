const Pass = require('../models/pass');
const generateUUID = require('../shared/id_factory');

// Controlador para obtener un abono por ID
const getPassById = async (req, res) => {
    try {
        const { id } = req.params;
        const pass = await Pass.findOne({ id }); // findOne para buscar por id
        if (!pass) {
            return res.status(404).json({ message: 'Abono no encontrado' });
        }
        res.status(200).json(pass);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el abono', error });
    }
};

// Controlador para crear un nuevo abono
const createPass = async (req, res) => {
    try {
        const { company, coordinates, name, description, valid_period, price, image, type } = req.body;

        // Comprobar si ya existe un abono con el mismo nombre, precio y tipo
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
        res.status(500).json({ message: 'Error al crear el abono', error });
    }
};

// Controlador para eliminar un abono por ID
const deletePass = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPass = await Pass.findOneAndDelete({ id }); // findOneAndDelete para eliminar por id

        if (!deletedPass) {
            return res.status(404).json({ message: 'Abono no encontrado' });
        }

        res.status(200).json({ message: 'Abono eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el abono', error });
    }
};

// Controlador para obtener todos los abonos
const getAllPasses = async (req, res) => {
    try {
        const passes = await Pass.find();
        res.status(200).json(passes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los abonos', error });
    }
};

// Controlador para actualizar un abono por ID
const updatePass = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPass = await Pass.findOneAndUpdate({ id }, req.body, { new: true }); // findOneAndUpdate para actualizar por id

        if (!updatedPass) {
            return res.status(404).json({ message: 'Abono no encontrado' });
        }

        res.status(200).json(updatedPass);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el abono', error });
    }
};

module.exports = {
    getPassById,
    createPass,
    deletePass,
    getAllPasses,
    updatePass
};
