const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

// Authentication
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('./models/admin');

// Passport configuration
passport.use(
  new LocalStrategy(
    { usernameField: 'id', passwordField: 'password' },
    (async (id, password, done) => {
      const admin = await Admin.findOne({ id });
      bcrypt.compare(password, admin.password, (err, res) => {
        if (res) {
          return done(null, admin);
        }
        return done(null, false, {
          message: 'Incorrect password',
        });
      });
    }),
  ),
);
passport.serializeUser((admin, done) => {
  done(null, admin.id);
});

passport.deserializeUser(async (adminId, done) => {
  try {
    const admin = await Admin.findOne({ _id: adminId }).exec();
    done(null, admin);
  } catch (err) {
    done(err);
  }
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// DB connection
const connectURL = process.env.MONGODB_URL;

main().catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect(connectURL);
}

// routes
const apiRoute = require('./routes/api');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.json(err);
});

module.exports = app;
