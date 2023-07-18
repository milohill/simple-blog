const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Post = require('../models/post');
const Comment = require('../models/comment');

exports.comment_create = [
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('The content should be more than 1 character in length.')
    .isLength({ max: 100 })
    .withMessage('The content should be no more than 100 characters in length.'),
  body('guestPassword')
    .trim()
    .isLength({ min: 1 })
    .withMessage('The password should be more than 1 character in length.')
    .isLength({ max: 100 })
    .withMessage('The password should be no more than 100 characters in length.'),
  async (req, res, next) => {
    // pass errors if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors.array());
    }

    const { postId } = req.params;
    const { content, guestPassword } = req.body;

    try {
      const postToBeUpdated = await Post.findOne({ _id: postId }).exec();
      const hashedGuestPassword = await bcrypt.hash(guestPassword, 10);
      const newComment = new Comment({
        content,
        guestPassword: hashedGuestPassword,
        createdAt: new Date(),
      });
      const savedComment = await newComment.save();
      // push the saved comment's id to the corresponded post
      postToBeUpdated.comments.push(savedComment._id);
      await Post.findByIdAndUpdate(postId, postToBeUpdated, {});
      return res.json('comment saved');
    } catch (err) {
      return next(err);
    }
  },
];

exports.comment_delete = async (req, res, next) => {
  const { commentId } = req.params;
  const { guestPassword, adminPassword } = req.body;

  try {
    // if by admin
    if (adminPassword === 'c8a9ac481f0b5b4f43fcfbf3cbbec918d0f4d3b7') {
      await Comment.findByIdAndDelete(commentId);
      return res.json('comment deleted');
    }
    // if by guest
    const comment = await Comment.findOne({ _id: commentId }).exec();
    const isCorrect = await bcrypt.compare(
      guestPassword,
      comment.guestPassword,
    );
    if (!isCorrect) {
      return res.json('password unmatched');
    }
    await Comment.findByIdAndDelete(commentId);
    return res.json('comment deleted');
  } catch (err) {
    next(err);
  }
};

exports.comment_update = [
  body('content')
    .isLength({ min: 1 })
    .withMessage('The content should be more than 1 character in length.')
    .isLength({ max: 100 })
    .withMessage('The content should be no more than 100 characters in length.'),
  async (req, res, next) => {
    // pass errors if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors.array());
    }

    const { commentId } = req.params;
    const { guestPassword } = req.body;
    const { content } = req.body;

    try {
      const oldComment = await Comment.findById(commentId).exec();
      const isCorrect = await bcrypt.compare(
        guestPassword,
        oldComment.guestPassword,
      );
      if (!isCorrect) {
        return res.json('password unmatched');
      }
      const newComment = new Comment({
        _id: oldComment._id,
        guestId: oldComment.guestId,
        guestPassword: oldComment.guestPassword,
        createdAt: oldComment.createdAt,
        content,
        updatedAt: new Date(),
      });
      await Comment.findByIdAndUpdate(commentId, newComment, {});
      return res.json('comment updated');
    } catch (err) {
      return next(err);
    }
  },
];
