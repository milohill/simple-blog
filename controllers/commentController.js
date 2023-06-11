const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/comment');
require('dotenv').config();

exports.comment_list = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).exec();
    return res.json(comments);
  } catch (err) {
    err.comment = 'Comment not found';
    return next(err);
  }
};

exports.comment_create = [
  body('content').trim().isLength({ max: 50 }),
  body('guestPassword').trim(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(errors.array());
    }

    try {
      const hashedGuestPassword = await bcrypt.hash(req.body.guestPassword, 10);
      const comment = new Comment({
        post: req.params.postId,
        content: req.body.content,
        guestPassword: hashedGuestPassword,
      });
      await comment.save();
      return res.send('comment saved');
    } catch (err) {
      return next(err);
    }
  },
];

exports.comment_delete = async (req, res, next) => {
  const { commentId } = req.body;
  const { guestPassword } = req.body;

  try {
    const comment = await Comment.findOne({ _id: commentId }).exec();
    const isCorrect = await bcrypt.compare(
      guestPassword,
      comment.guestPassword
    );
    if (!isCorrect) {
      return res.send('the password does not match');
    }
    await Comment.findByIdAndDelete(commentId);
    return res.send('comment deleted');
  } catch (err) {
    next(err);
  }
};

exports.comment_update = [
  body('content').trim().isLength({ max: 50 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors);
    }

    try {
      const { commentId } = req.body;
      const oldComment = await Comment.findById(commentId).exec();
      const newComment = new Comment({
        _id: commentId,
        post: oldComment.post,
        content: req.body.content,
        guestId: oldComment.guestId,
        guestPassword: oldComment.guestPassword,
        date: oldComment.date,
      });
      await Comment.findByIdAndUpdate(commentId, newComment, {});
      return res.send('comment updated');
    } catch (err) {
      return next(err);
    }
  },
];
