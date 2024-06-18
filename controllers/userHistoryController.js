const UserHistory = require('../models/user_history');

// Función para obtener todos los comentarios de un passId específico
exports.getAllCommentsForPass = async (req, res) => {
  const { passId } = req.params;

  try {
    const userHistories = await UserHistory.find({ 'comments.passId': passId }); // Buscar UserHistoryes de usuarios con comentarios para el passId
    const comments = userHistories.flatMap(userHistory =>
      userHistory.comments.filter(comment => comment.passId === passId) // Filtrar comentarios para el passId
    );

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).send('Error al obtener comentarios');
  }
};

exports.addPassToHistory = async (req, res) => {
  const { userId, passId } = req.body;

  try {
    let userHistory = await UserHistory.findOne({ userId }); // Buscar UserHistory concreto con ese userId

    if (!userHistory) {
      userHistory = new UserHistory({// Crear nuevo UserHistory con el passId
        userId,
        passIds: [passId]
      });
    } else {
      if (!userHistory.passIds.includes(passId)) {
        userHistory.passIds.push(passId); // Añadir passId al UserHistory existente
      }
    }

    await userHistory.save();
    res.status(200).send('Pass añadido a UserHistory');
  } catch (error) {
    console.error('Error al añadir pass a UserHistory:', error);
    res.status(500).send('Error al añadir pass a UserHistory');
  }
};

exports.removePassFromHistory = async (req, res) => {
  const { userId, passId } = req.body;

  try {
    const userHistory = await UserHistory.findOne({ userId }); // Buscar UserHistory concreto con ese userId

    if (userHistory) {
      userHistory.passIds = userHistory.passIds.filter(id => id !== passId); // Eliminar passId del UserHistory
      await userHistory.save();
      res.status(200).send('Pass eliminado de UserHistory');
    } else {
      res.status(404).send('UserHistory no encontrado');
    }
  } catch (error) {
    console.error('Error al eliminar pass del UserHistory:', error);
    res.status(500).send('Error al eliminar pass del UserHistory');
  }
};

exports.getUserHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const userHistory = await UserHistory.findOne({ userId }); // Buscar UserHistory concreto con ese userId

    if (userHistory) {
      res.status(200).json(userHistory);
    } else {
      res.status(404).send('User history no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener UserHistory:', error);
    res.status(500).send('Error al obtener UserHistory');
  }
};

exports.addCommentToHistory = async (req, res) => {
  const { userId, passId, comment, createdBy } = req.body;

  try {
    let userHistory = await UserHistory.findOne({ userId }); // Buscar UserHistory concreto con ese userId

    if (!userHistory) {
      userHistory = new UserHistory({
        userId,
        passIds: [],
        comments: [{ passId, comment, createdBy }] // Crear nuevo UserHistory con el comentario
      });
    } else {
      userHistory.comments.push({ passId, comment, createdBy }); // Añadir comentario al UserHistory existente
    }

    await userHistory.save();
    res.status(200).send('Comentario añadido a UserHistory');
  } catch (error) {
    console.error('Error editando comentario de UserHistory:', error);
    res.status(500).send('Error editando comentario de UserHistory');
  }
};

exports.removeCommentFromHistory = async (req, res) => {
  const { userId, passId } = req.body;

  try {
    const userHistory = await UserHistory.findOne({ userId }); // Buscar UserHistory concreto con ese userId

    if (userHistory) {
      userHistory.comments = userHistory.comments.filter(comment => comment.passId !== passId); // Eliminar comentario del UserHistory
      await userHistory.save();
      res.status(200).send('Comentario eliminado del UserHistory');
    } else {
      res.status(404).send('User history no encontrado');
    }
  } catch (error) {
    console.error('Error al eliminar comentarios de UserHistoryistory:', error);
    res.status(500).send('Error al eliminar comentarios de UserHistoryistory');
  }
};
