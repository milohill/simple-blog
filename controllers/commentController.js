const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/comment');
require('dotenv').config();

// for the editor
exports.comment_get = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).exec();
    return res.json(comments);
  } catch (err) {
    err.comment = 'Comment not found';
    next(err);
  }
};

// for the editor
exports.comment_post = [
  body('content').trim().isLength({ max: 50 }),
  body('guestId').trim(),
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
        guestId: req.body.guestId,
        guestPassword: hashedGuestPassword,
      });
      await comment.save();
      res.send('comment saved');
    } catch (err) {
      next(err);
    }
  },
];
