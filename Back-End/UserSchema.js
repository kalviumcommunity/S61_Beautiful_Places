const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email:{
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
