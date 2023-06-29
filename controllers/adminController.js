const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const Admin = require('../models/admin');

exports.admin_signup = [
  body('id').trim().isLength({ max: 20 }),
  body('password').trim().isLength({ max: 30 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors);
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const admin = new Admin({
      id: req.body.id,
      password: hashedPassword,
    });
    await admin.save();
    res.send('Admin credential created');
  },
];

exports.admin_login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
});
