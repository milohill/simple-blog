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
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Admin', adminSchema);
