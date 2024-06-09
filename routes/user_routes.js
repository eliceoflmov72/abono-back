const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// registrar un nuevo usuario
router.post('/users/register', userController.registerUser);

// iniciar sesión
router.post('/users/login', userController.loginUser);

// Para obtener un usuario por ID
router.get('/users/:id', auth, userController.getUserById);

// Para eliminar un usuario por ID
router.delete('/users/:id', auth, userController.deleteUser);

// Para obtener todos los usuarios
router.get('/users', auth, userController.getAllUsers);

// Para actualizar un usuario por ID
router.put('/users/:id', auth, userController.updateUser);

module.exports = router;
