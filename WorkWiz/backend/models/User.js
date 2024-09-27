// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: false },
  expertise: { type: String, required: false },
  location: { type: String, required: false },
});

module.exports = mongoose.model('User', UserSchema);
