const express = require('express');

const router = express.Router();

// # Controllers
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const adminController = require('../controllers/adminController');

// # Post APIs
// list every post
router.get('/posts', postController.post_list);

// get a post
router.get('/posts/:postId', postController.post_get);

// create a new post
router.post('/posts/create', postController.post_create);

// delete a post
router.get('/posts/:postId/delete', postController.post_delete);

// update a post
router.post('/posts/:postId/update', postController.post_update);

// # Comment APIs
// create a new comment
router.post('/posts/:postId/comments/create', commentController.comment_create);

// delete a comment
router.post('/posts/:postId/comments/:commentId/delete', commentController.comment_delete);

// update a comment
router.post('/posts/:postId/comments/:commentId/update', commentController.comment_update);

// create a new admin credential
router.post('/admin/signup', adminController.admin_signup);

// # Misc.
// test the server
router.post('/test', (req, res) => {
  res.send(req.body);
});

module.exports = router;
