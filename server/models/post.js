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
  author: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  ifPublished: {
    type: Boolean,
    required: true,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Post', postSchema);
