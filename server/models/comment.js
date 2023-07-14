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
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', commentSchema);
