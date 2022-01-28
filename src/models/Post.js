const mongoose = require('mongoose');

const Post = new mongoose.Schema({
  userId: {
    type: String,
    required: 'Id do usuário requerido no post'
  },
  description: {
    type: String,
    max: 500
  },
  img: {
    type: String,
  },
  likes: {
    type: Array,
    default: [],
  }

}, { timestamps: true });

module.exports = mongoose.model('Post', Post);
