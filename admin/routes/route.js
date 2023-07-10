var express = require('express');
var router = express.Router();
const passport = require('passport');
const { body, validationResult } = require('express-validator');

router.get('/', async function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  const response = await fetch('http://localhost:3000/api/posts');
  const posts = await response.json();

  const updatedPosts = await Promise.all(posts.map(async function(post) {
    const commentResponse = await fetch(`http://localhost:3000/api/comments/${post._id}`);
    const comments = await commentResponse.json();
    post.comments = comments;

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    post.date = formattedDate;

    return post;
  }));

  res.render('index', {
    posts: updatedPosts
  });
});

router.get('/login', function(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  return res.render('login', { 
    errors: req.flash('error'),
    cachedForm: req.session.loginFormData || null,
   });
})

router.post('/login',
  // retain login form data in case of a failure
  (req, res, next) => {
    req.session.loginFormData = req.body;
    next();
  },
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true })
);

router.get('/create', (req, res) => {
  if (!req.isAuthenticated()) {
    console.log('from get create');
    return res.redirect('/login');
  }

  res.render('create');
})

// update it!
router.post('/create', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  const { title, content, published } = req.body;
  const author = res.locals.user._id;

  try {
    const response = await fetch('http://localhost:3000/api/posts/create', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        content,
        published,
        author,
      })
    })
    const json = await response.json();
    // if an error ocurred from express validator
    if (json !== 'post saved') {
      return res.render('create', {
        errors: json,
        post: req.body
      })
    }
    return res.redirect('/');
  } catch (error) {
    return res.render('create', {
      errors: [ error ],
      post: req.body
    })
  }
})

router.get('/:postId/delete', async (req, res) => {
  const { postId } = req.params;
  try {
    await fetch(`http://localhost:3000/api/posts/${postId}/delete`, {
      method: 'POST'
    });
    return res.redirect('/');
  } catch (error) {
    return res.send(error);
  }
})

router.get('/:postId/update', async (req, res) => {
  const { postId } = req.params;
  try {
    const postResponse = await fetch(`http://localhost:3000/api/posts/${postId}`);
    const postData = await postResponse.json();

    const commentResponse = await fetch(`http://localhost:3000/api/comments/${postId}`);
    const comments = await commentResponse.json();
    const formattedComments = comments.map(comment => {
      comment.date = new Date(comment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
      return comment;
    })

    return res.render('update', {
      ifUpdate: true,
      post: postData,
      comments: formattedComments,
    });
  } catch (error) {
    return next(error);
  }
})

router.post('/:postId/update', async (req, res) => {
  const { postId } = req.params;
  const { title, content, published } = req.body;

  try {
    await fetch(`http://localhost:3000/api/posts/${postId}/update`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
        published,
      })
    });
    return res.redirect('/');
  } catch (error) {
    return next(error);
  }
})

// comment deletion
router.get('/:postId/:commentId/delete', async (req, res, next) => {
  // in case it's not an authorized access
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  const { postId } = req.params;
  const { commentId } = req.params;

  try {
    await fetch(`http://localhost:3000/api/comments/${postId}/${commentId}/delete`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        ifAdmin: true,
      })
    });
    // back to the post where the deletion happened
    return res.redirect(`/${postId}/update`);
  } catch (error) {
    return next(error);
  }

})

module.exports = router;