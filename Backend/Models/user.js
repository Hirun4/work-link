const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  title: { type: String },
  bio: { type: String },
  skills: { type: String },
  portfolio: { type: String },
  companyName: { type: String },
  contactNumber: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
