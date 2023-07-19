var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  try {
    const response = await fetch('http://localhost:3000/api/posts');
    const posts = await response.json();
    return res.render('index', {
      posts
    });
  } catch (err) {
    return next(err);
  }
});

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  res.render('login', { 
    errors: req.flash('error'),
    cachedForm: req.session.loginFormData || null,
   });
})

router.post('/login',
  // retain login form data in case of a failure
  (req, res, next) => {
    req.session.loginFormData = req.body;
    return next();
  },
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true })
);

router.get('/create', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  res.render('create');
})

router.post('/create', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  const { title, content, ifPublished } = req.body;
  const author = res.locals.user._id;
  console.log(title, content, ifPublished);

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
        author,
        ifPublished,
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
  } catch (err) {
    return res.render('create', {
      errors: [ err ],
      post: req.body
    })
  }
})

router.get('/:postId/delete', async (req, res, next) => {
  const { postId } = req.params;
  try {
    await fetch(`http://localhost:3000/api/posts/${postId}/delete`);
    return res.redirect('/');
  } catch (err) {
    return next(err);
  }
})

router.get('/:postId/update', async (req, res, next) => {
  const { postId } = req.params;
  try {
    const postResponse = await fetch(`http://localhost:3000/api/posts/${postId}`);
    const post = await postResponse.json();

    return res.render('update', {
      post,
    });
  } catch (err) {
    return next(err);
  }
})

router.post('/:postId/update', async (req, res) => {
  const { postId } = req.params;
  const { title, content, ifPublished } = req.body;

  try {
    await fetch(`http://localhost:3000/api/posts/${postId}/update`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        title,
        content,
        ifPublished,
      })
    });
    return res.redirect('/');
  } catch (err) {
    return next(err);
  }
})

// comment deletion
router.get('/:postId/:commentId/delete', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  const { postId, commentId } = req.params;

  try {
    await fetch(`http://localhost:3000/api/posts/${postId}/comments/${commentId}/delete`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        adminPassword: process.env.ADMIN_PASSWORD,
      })
    });
    // back to the post where the deletion happened
    return res.redirect(`/${postId}/update`);
  } catch (err) {
    return next(err);
  };
});

module.exports = router;