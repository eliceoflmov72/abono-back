const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const generateUUID = require('../shared/id_factory');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: generateUUID // Asigna un UUID por defecto generateUUID
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tipo: {
    type: String,
    enum: ['admin', 'default'],
    default: 'default'
  }
}, { versionKey: false }); // Desactiva el campo __v

// Definición del middleware antes del save
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) { // Si no ha sido modificado
      return next(); // callback para pasar al siguiente middleware
    }
    const salt = await bcrypt.genSalt(10); // Cifrado de 10 (costo de procesamiento y complejidad de cifrado)
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Para pasar el control al siguiente middleware o termina si todo esta bien
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
