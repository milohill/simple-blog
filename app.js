var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt = require('bcryptjs');
const Admin = require('./models/admin');

const passport = require('passport');
const LocalStrategy = require('passport-local')

const mongoose = require('mongoose');

const mongoDB = process.env.MONGO_DB_URL;

const main = async () => {
  await mongoose.connect(mongoDB);
};

main().catch((err) => {
  console.log(err);
});

// passport configuration
passport.use(new LocalStrategy(
  {
    usernameField: 'name',
    passwordField: 'password'
  },
  function(name, password, done) {
      Admin.findOne({ name })
          .then(async (admin) => {
              if (!admin) { return done(null, false) }
              
              // Function defined at bottom of app.js
              const isValid = await bcrypt.compare(admin.password, password);
              
              if (isValid) {
                  return done(null, user);
              } else {
                  return done(null, false);
              }
          })
          .catch((err) => {   
              done(err);
          });
}));

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
