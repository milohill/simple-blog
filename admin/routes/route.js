var express = require('express');
var router = express.Router();
const passport = require('passport');
const { body, validationResult } = require('express-validator');

router.get('/', function(req, res, next) {
  res.render('index')
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
  res.render('create');
})

router.post('/create', (req, res) => {
  const { title, content, published}
})
module.exports = router;
