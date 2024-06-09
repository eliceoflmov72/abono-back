const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const generateUUID = require('../shared/id_factory'); // Asegúrate de tener esta función para generar UUIDs

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: generateUUID // Asigna un UUID por defecto usando generateUUID
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

// Middleware para encriptar la contraseña antes de guardarla
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
