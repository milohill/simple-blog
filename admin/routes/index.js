var express = require('express');
var router = express.Router();
const passport = require('passport')

router.get('/', function(req, res, next) {
  if (!req.user) {
    return res.redirect('/login');
  }
    return res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}))

module.exports = router;
