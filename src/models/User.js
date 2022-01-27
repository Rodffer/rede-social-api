const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: 'Nome de usuário requerido',
    min: 3,
    max: 20,
    unique: 'Nome de usuário em uso'
  },
  email: {
    type: String,
    required: 'E-mail requerido',
    max: 50,
    unique: 'E-mail em uso'
  },
  password: {
    type: String,
    required: 'Senha requerida',
    min: 6,
  },
  profilePicture: {
    type: String,
    default: null
  },
  coverPicture: {
    type: String,
    default: null
  },
  followers: {
    type: Array,
    default: []
  },
  followings: {
    type: Array,
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    max: 50
  },
  city: {
    type: String,
    max: 50
  },
  from: {
    type: String,
    max: 50
  },
  relationship: {
    type: Number,
    enum: [ 1, 2, 3 ]
  }

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
