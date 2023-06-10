const express = require('express');

const router = express.Router();

// controllers
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

// list every post
router.get('/posts', postController.post_list);

// create a post
router.post('/posts/create', postController.post_create);

// list comments according to a post
router.get('/comments/:postId', commentController.comment_list);

// create a comment with a post id
router.post('/comments/:postId/create', commentController.comment_create);

// delete a comment from a post
router.post('/comments/:postId/delete', commentController.comment_delete);

// update a comment in a post
router.post('/comments/:postId/update', commentController.comment_update);

module.exports = router;
