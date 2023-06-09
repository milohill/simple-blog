const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  post: {
    type: Schema.ObjectId,
    required: true,
  },
  author: {
    type: Schema.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', commentSchema);
