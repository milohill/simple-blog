const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  post: {
    type: Schema.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxLength: 50,
  },
  guestId: {
    type: String,
    required: true,
  },
  guestPassword: {
    type: String,
    require: true,
  },
  // no need to input
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', commentSchema);
