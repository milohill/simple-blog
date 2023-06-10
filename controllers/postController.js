const { body, validationResult } = require('express-validator');
const Post = require('../models/post');

// for the reader
exports.post_list = async (req, res, next) => {
  try {
    const allPosts = await Post.find().exec();
    res.json(allPosts);
  } catch (err) {
    next(err);
  }
};

// for the editor
exports.post_create = [
  body('title')
    .trim()
    .isLength({ max: 10 })
    .withMessage('The title should be no more than 10 characters in length.'),
  body('content')
    .trim()
    .isLength({ max: 100 })
    .withMessage(
      'The content should be no more than 100 characters in length.'
    ),
  body('author').trim(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(errors.array());
    }

    const { title, content, author } = req.body;
    const post = new Post({
      title,
      content,
      author,
    });

    try {
      await post.save();
      res.send('post saved');
    } catch (err) {
      next(err);
    }
  },
];
