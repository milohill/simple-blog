const { body, validationResult } = require('express-validator');
const Post = require('../models/post');

exports.post_list = async (req, res, next) => {
  try {
    // get every post in the data base whose comments' IDs are populated
    const everyPost = await Post.find().populate('author comments').exec();
    return res.json(everyPost);
  } catch (err) {
    return next(err);
  }
};

exports.post_get = async (req, res, next) => {
  const { postId } = req.params;
  try {
    // get one post in the data base whose comments' ID is populated
    const post = await Post.findOne({ _id: postId }).populate('author comments').exec();
    return res.json(post);
  } catch (err) {
    return next(err);
  }
};

exports.post_create = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('The title should be more than 1 character in length.')
    .isLength({ max: 30 })
    .withMessage('The title should be no more than 30 characters in length.'),
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('The content should be more than 1 character in length.')
    .isLength({ max: 500 })
    .withMessage('The content should be no more than 500 characters in length.'),
  async (req, res, next) => {
    // pass errors if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors.array());
    }

    const {
      title, content, ifPublished, author,
    } = req.body;

    const newPost = new Post({
      title,
      content,
      author,
      ifPublished,
      createdAt: new Date(),
    });

    try {
      await newPost.save();
      return res.json('post saved');
    } catch (err) {
      return next(err);
    }
  },
];

exports.post_delete = async (req, res, next) => {
  const { postId } = req.params;

  try {
    await Post.findByIdAndDelete(postId);
    return res.json('post deleted');
  } catch (err) {
    return next(err);
  }
};

exports.post_update = [
  body('title')
    .trim()
    .isLength({ max: 30 })
    .withMessage('The title should be no more than 30 character in length.'),
  body('content')
    .trim()
    .isLength({ max: 500 })
    .withMessage('The content should be no more than 500 characters in length.'),
  async (req, res, next) => {
    // pass errors if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors.array());
    }

    const { postId } = req.params;
    const { title, content, published } = req.body;

    try {
      const oldPost = await Post.findOne({ _id: postId }).exec();
      const postToUpdate = new Post({
        title: title || oldPost.title,
        content: content || oldPost.content,
        ifPublished: published || oldPost.ifPublished,
        _id: oldPost._id,
        author: oldPost.author,
        comments: oldPost.comments,
        createdAt: oldPost.createdAt,
        updatedAt: new Date(),
      });
      await Post.findByIdAndUpdate(postId, postToUpdate, {});
      return res.json('post updated');
    } catch (err) {
      return next(err);
    }
  }];
