var express = require('express');
var router = express.Router();
const passport = require('passport');
const { body, validationResult } = require('express-validator');

router.get('/', async function(req, res, next) {
  // if (!req.isAuthenticated()) {
  //   return res.redirect('/login');
  // }
  const response = await fetch('http://localhost:3000/api/posts');
  const posts = await response.json();
  console.log(posts);

  const updatedPosts = await Promise.all(posts.map(async function(post) {
    const commentResponse = await fetch(`http://localhost:3000/api/comments/${post._id}`);
    const comments = await commentResponse.json();
    post.comments = comments;
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
    form: req.session.loginFormData || null,
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
    return res.redirect('/login');
  }

  res.render('create');
})

router.post('/create', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  const { title, content } = req.body;
  const published = req.body.published ? true : false;
  const author = res.locals.user._id;

  try {
    await fetch('http://localhost:3000/api/posts/create', {
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

    return res.redirect('/');
  } catch (error) {
    return res.send(error)
  }
})
module.exports = router;
