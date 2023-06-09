const express = require('express');

const router = express.Router();
const Post = require('../models/post');

router.get('/posts', async (req, res, next) => {
  try {
    const allPosts = await Post.find().exec();
    res.json(allPosts);
  } catch (err) {
    next(err);
  }
});

router.post('/posts', async (req, res, next) => {
  const { title, content, date, author, comments } = req.body;
  const post = new Post({
    title,
    content,
    date,
    author,
    comments,
  });
  try {
    await post.save();
    res.send('post saved');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
