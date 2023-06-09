const express = require('express');

const router = express.Router();

// controllers
const postController = require('../controllers/postController');

router.get('/posts', postController.post_get);

router.post('/posts', postController.post_post);

module.exports = router;
