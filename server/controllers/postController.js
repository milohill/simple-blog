const { body, validationResult } = require('express-validator');
const Post = require('../models/post');

// for the reader
exports.post_list = async (req, res, next) => {
  try {
    const allPosts = await Post.find().exec();
    return res.json(allPosts);
  } catch (err) {
    return next(err);
  }
};

// for the editor
exports.post_create = [
  body('title')
    .trim()
    .isLength({ max: 5 })
    .withMessage('The title should be no more than 1 character in length.'),
  body('content')
    .trim()
    .isLength({ max: 500 })
    .withMessage(
      'The content should be no more than 500 characters in length.',
    ),
  body('author').trim(),
  body('published').trim(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors.array());
    }

    const {
      title, content, author, published,
    } = req.body;
    const newPost = new Post({
      title,
      content,
      author,
      published,
    });

    try {
      await newPost.save();
      res.json('post saved');
    } catch (err) {
      return res.json(err);
    }
  },
];

exports.post_delete = async (req, res) => {
  const { postId } = req.params;

  try {
    await Post.findByIdAndDelete(postId);
    return res.send('post deleted');
  } catch (error) {
    return res.send(error);
  }
};

exports.post_update = async (req, res) => {
  const { postId } = req.params;

  try {
    const oldPost = await Post.findOne({ _id: postId });
    const newPost = new Post({
      _id: oldPost._id,
      title: req.body.title || oldPost.title,
      content: req.body.content || oldPost.content,
      published: req.body.published || oldPost.published,
      author: oldPost.author,
    });
    await Post.findOneAndUpdate({ _id: postId }, newPost);
    return res.send('post updated');
  } catch (error) {
    return res.send(error);
  }
};
