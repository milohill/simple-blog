const express = require('express');

const router = express.Router();

// controllers
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

// get every post
router.get('/posts', postController.post_get);

// post a post
router.post('/posts', postController.post_post);

// get users according to a post
router.get('/comments/:postId', commentController.comment_get);

// post a user with a post id
router.post('/comments/:postId', commentController.comment_post);

module.exports = router;
