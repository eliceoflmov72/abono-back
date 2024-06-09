const UserHistory = require('../models/user_history');

exports.addPassToHistory = async (req, res) => {
  const { userId, passId } = req.body;

  try {
    let userHistory = await UserHistory.findOne({ userId });

    if (!userHistory) {
      userHistory = new UserHistory({
        userId,
        passIds: [passId]
      });
    } else {
      if (!userHistory.passIds.includes(passId)) {
        userHistory.passIds.push(passId);
      }
    }

    await userHistory.save();
    res.status(200).send('Pass añadido satisfactoriamente al historial');
  } catch (error) {
    console.error('Error añadiendo el pass al historial:', error);
    res.status(500).send('Error añadiendo el pass al historial');
  }
};

exports.removePassFromHistory = async (req, res) => {
  const { userId, passId } = req.body;

  try {
    const userHistory = await UserHistory.findOne({ userId });

    if (userHistory) {
      userHistory.passIds = userHistory.passIds.filter(id => id !== passId);
      await userHistory.save();
      res.status(200).send('Pass eliminado satisfactoriamente del historial');
    } else {
      res.status(404).send('User history no encontrado');
    }
  } catch (error) {
    console.error('Error eliminando el pass del history:', error);
    res.status(500).send('Error eliminando el pass del history');
  }
};

exports.getUserHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const userHistory = await UserHistory.findOne({ userId });

    if (userHistory) {
      res.status(200).json(userHistory);
    } else {
      res.status(404).send('User history no encontrado');
    }
  } catch (error) {
    console.error('Errpr obteniendo el historial:', error);
    res.status(500).send('Errpr obteniendo el historial');
  }
};

exports.addCommentToHistory = async (req, res) => {
  const { userId, passId, comment } = req.body;

  try {
    let userHistory = await UserHistory.findOne({ userId });

    if (!userHistory) {
      userHistory = new UserHistory({
        userId,
        passIds: [],
        comments: [{ passId, comment }]
      });
    } else {
      userHistory.comments.push({ passId, comment });
    }

    await userHistory.save();
    res.status(200).send('Comentario añadido satisfactoriamente al historial');
  } catch (error) {
    console.error('Error editando el comentario del hsitoriañ:', error);
    res.status(500).send('Error editando el comentario del hsitoriañ');
  }
};

exports.removeCommentFromHistory = async (req, res) => {
  const { userId, passId } = req.body;

  try {
    const userHistory = await UserHistory.findOne({ userId });

    if (userHistory) {
      userHistory.comments = userHistory.comments.filter(comment => comment.passId !== passId);
      await userHistory.save();
      res.status(200).send('Comentario eliminado satisfactoriamente del historial');
    } else {
      res.status(404).send('User histtory no encontrado');
    }
  } catch (error) {
    console.error('Error eliminando el comentario del history:', error);
    res.status(500).send('Error eliminando el comentario del history');
  }
};
