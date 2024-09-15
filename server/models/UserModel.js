const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
});

// User Model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel; 
