var express = require('express');
var router = express.Router();
const passport = require('passport');
const { body, validationResult } = require('express-validator');

router.get('/', function(req, res, next) {
  console.log(req.user);
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

module.exports = router;
