const express = require('express');
const router = express.Router();
const userHistoryController = require('../controllers/userHistoryController');

// Para añadir un pass al history del usuario
router.post('/history/add', userHistoryController.addPassToHistory);

// Para eliminar un pass del history del usuario
router.post('/history/remove', userHistoryController.removePassFromHistory);

// Para obtener el history del usuario
router.get('/history/:userId', userHistoryController.getUserHistory);

// Para añadir un comentario al history del usuario
router.post('/history/comment/add', userHistoryController.addCommentToHistory);

// Para eliminar un comentario del history del usuario
router.post('/history/comment/remove', userHistoryController.removeCommentFromHistory);

module.exports = router;
