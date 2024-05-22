const Pass = require('../models/pass'); // Asegúrate de que la ruta sea correcta

// Controlador para crear un nuevo abono
const createPass = async (req, res) => {
    try {
        const { company, coordinates, name, description, valid_period, price, image, type } = req.body;

        // Comprobar si ya existe un abono con el mismo nombre, precio y tipo
        // Dado que el _id de mongoDB es practicamente unico no es necesario tenerlo en cuenta
        const existingPass = await Pass.findOne({ name, price, type });
        if (existingPass) {
            return res.status(400).json({ message: 'El abono ya existe' });
        }

        const newPass = new Pass({
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
        const deletedPass = await Pass.findByIdAndDelete(id);

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
        const updatedPass = await Pass.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedPass) {
            return res.status(404).json({ message: 'Abono no encontrado' });
        }

        res.status(200).json(updatedPass);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el abono', error });
    }
};

module.exports = {
    createPass,
    deletePass,
    getAllPasses,
    updatePass
};