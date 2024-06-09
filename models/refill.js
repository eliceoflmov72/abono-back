const mongoose = require('mongoose');
const generateUUID = require('../shared/id_factory');

const coordinateSchema = new mongoose.Schema({
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  }
}, { _id: false }); // Desactiva el _id para coordinates

const refillSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: generateUUID // Asigna un UUID por defecto usando generateUUID
  },
  passId: {
    type: String,
    required: true,
    ref: '' // Referencia al modelo Pass
  },
  company: {
    type: String,
    required: true
  },
  coordinates: [coordinateSchema],
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
}, { versionKey: false }); // Desactiva el campo __v

const Refill = mongoose.model('Refill', refillSchema);

module.exports = Refill;
