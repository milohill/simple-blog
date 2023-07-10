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

exports.post_get = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findOne({ _id: postId });
    return res.send(post);
  } catch (error) {
    return next(error);
  }
};

exports.post_create = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage(
      'The content should be more than 1 characters in length.',
    )
    .isLength({ max: 30 })
    .withMessage('The title should be no more than 30 character in length.'),
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage(
      'The content should be more than 1 characters in length.',
    )
    .isLength({ max: 500 })
    .withMessage(
      'The content should be no more than 500 characters in length.',
    ),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors.array());
    }

    const {
      published, title, content, author,
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

exports.post_update = [body('title')
  .trim()
  .isLength({ min: 1 })
  .withMessage(
    'The content should be more than 1 characters in length.',
  )
  .isLength({ max: 30 })
  .withMessage('The title should be no more than 30 character in length.'),
body('content')
  .trim()
  .isLength({ min: 1 })
  .withMessage(
    'The content should be more than 1 characters in length.',
  )
  .isLength({ max: 500 })
  .withMessage(
    'The content should be no more than 500 characters in length.',
  ),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(errors.array());
  }

  const { postId } = req.params;
  const { title, content, published } = req.body;

  try {
    const oldPost = await Post.findOne({ _id: postId });
    const newPost = new Post({
      _id: oldPost._id,
      title: title || oldPost.title,
      content: content || oldPost.content,
      published: published || oldPost.published,
      author: oldPost.author,
    });
    await Post.findOneAndUpdate({ _id: postId }, newPost);
    return res.send('post updated');
  } catch (error) {
    return res.send(error);
  }
}];
