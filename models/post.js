const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 10,
  },
  content: {
    type: String,
    required: true,
    maxLength: 100,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.ObjectId,
    required: true,
  },
  comments: {
    type: Schema.ObjectId,
    default: [],
  },
});

module.exports = mongoose.model('Post', postSchema);
