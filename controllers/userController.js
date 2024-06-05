const User = require('../models/user');
const generateUUID = require('../shared/id_factory');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');

// Generar un token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id }, config.secretJwtToken, { expiresIn: '1h' });
};

// Controlador para obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

// Controlador para registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Comprobar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const newUser = new User({
      id: generateUUID(),
      name,
      username,
      email,
      password: await bcrypt.hash(password, 10) // Encriptar la contraseña antes de guardarla
    });

    const savedUser = await newUser.save();
    const token = generateToken(savedUser);

    res.status(201).json({ user: savedUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};

// Controlador para iniciar sesión
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Error en loginUser:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

// Controlador para eliminar un usuario por ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findOneAndDelete({ id });

    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};

// Controlador para obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

// Controlador para actualizar un usuario por ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findOneAndUpdate({ id }, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

module.exports = {
  getUserById,
  registerUser,
  loginUser,
  deleteUser,
  getAllUsers,
  updateUser
};
