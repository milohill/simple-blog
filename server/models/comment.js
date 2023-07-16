const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
    maxLength: 100,
  },
  guestPassword: {
    type: String,
    require: true,
    maxLength: 100,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Comment', commentSchema);
