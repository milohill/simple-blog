var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

const Admin = require('./models/admin');

require('dotenv').config();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');

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
  async function(name, password, done) {
    try {
      const admin = await Admin.findOne({ name });
      if (!admin) {
        return done(null, false, { message: 'Name not found' });
      }

      const isValid = await bcrypt.compare(password, admin.password)
      if (!isValid) {
        return done(null, false, { message: 'Incorrect password' });
      }
      
      return done(null, admin);
    } catch (err) {
      return done(null, false);
    }
  }));

passport.serializeUser(function(admin, done) {
  done(null, admin._id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return done(null, false);
    }
    return done(null, admin);
  } catch (error) {
    done(null, error)
  }
});

var router = require('./routes/route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(flash())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app configuration
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 1000 * 10
  }
}));

app.use(passport.initialize());
app.use(passport.session());
// store the user object in the locals
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
})

app.use('/', router);

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
