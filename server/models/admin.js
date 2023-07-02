const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    maxLength: 100,
  },
  // no need to input
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Admin', adminSchema);
