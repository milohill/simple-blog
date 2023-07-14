const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Post = require('../models/post');
const Comment = require('../models/comment');

// exports.comment_list = async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const comments = await Comment.find({ post: req.params.postId }).exec();
//     return res.json(comments);
//   } catch (err) {
//     return next(err);
//   }
// };

exports.comment_create = [
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('The content should be more than 1 character in length.')
    .isLength({ max: 100 })
    .withMessage('The content should be no more than 100 characters in length.'),
  body('guestPassword').trim(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors.array());
    }

    try {
      const { postId } = req.params;
      const postToBeUpdated = await Post.findOne({ _id: postId });

      const hashedGuestPassword = await bcrypt.hash(req.body.guestPassword, 10);
      const newComment = new Comment({
        content: req.body.content,
        guestPassword: hashedGuestPassword,
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
  const { guestPassword } = req.body;
  const { ifAdmin } = req.body;

  try {
    if (ifAdmin === true) {
      await Comment.findByIdAndDelete(commentId);
      return res.json('comment deleted');
    }

    const comment = await Comment.findOne({ _id: commentId }).exec();
    const isCorrect = await bcrypt.compare(
      guestPassword,
      comment.guestPassword,
    );
    if (!isCorrect) {
      return res.send('the password does not match');
    }
    await Comment.findByIdAndDelete(commentId);
    return res.json('comment deleted');
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
      const { commentId } = req.params;
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
