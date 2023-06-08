const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('Comment', commentSchema);
