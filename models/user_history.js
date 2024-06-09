const mongoose = require('mongoose');
const generateUUID = require('../shared/id_factory');

const commentSchema = new mongoose.Schema({
  passId: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
}, { _id: false }); // Desactiva el _id para los comentarios

const userHistorySchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: generateUUID // Asigna un UUID por defecto usando generateUUID
  },
  userId: {
    type: String,
    required: true
  },
  passIds: [{
    type: String,
    required: true
  }],
  comments: [commentSchema] // Array de comentarios
}, { versionKey: false }); // Desactiva el campo __v

const UserHistory = mongoose.model('UserHistory', userHistorySchema);

module.exports = UserHistory;
