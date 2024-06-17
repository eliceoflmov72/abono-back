const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// registrar un nuevo usuario
router.post('/users/register', userController.registerUser);

// iniciar sesión
router.post('/users/login', userController.loginUser);


// 2 - Asociamos el auth a rutas
// Cualquier solicitud pasa primero por auth

// obtener un usuario por ID
router.get('/users/:id', auth, userController.getUserById);

// eliminar un usuario por ID
router.delete('/users/:id', auth, userController.deleteUser);

// obtener todos los usuarios
router.get('/users', auth, userController.getAllUsers);

// actualizar un usuario por ID
router.put('/users/:id', auth, userController.updateUser);

// refrescar el token
router.post('/users/refresh-token', userController.refreshToken);

module.exports = router;
