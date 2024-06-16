const express = require('express');
const router = express.Router();
const userHistoryController = require('../controllers/userHistoryController');

// añadir un pass al history del usuario
router.post('/history/add', userHistoryController.addPassToHistory);

// eliminar un pass del history del usuario
router.post('/history/remove', userHistoryController.removePassFromHistory);

// obtener el history del usuario
router.get('/history/:userId', userHistoryController.getUserHistory);

// añadir un comentario al history del usuario
router.post('/history/comment/add', userHistoryController.addCommentToHistory);

// eliminar un comentario del history del usuario
router.post('/history/comment/remove', userHistoryController.removeCommentFromHistory);

// obtener todos los comentarios de un pase concreto
router.get('/history/comments/:passId', userHistoryController.getAllCommentsForPass);

module.exports = router;
