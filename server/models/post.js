const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 30,
  },
  content: {
    type: String,
    required: true,
    maxLength: 500,
  },
  published: {
    type: Boolean,
    required: true,
  },
  author: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  // no need to input
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', postSchema);
