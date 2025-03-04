const mongoose = require('mongoose');

const AlumniSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  batch: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Alumni', AlumniSchema);