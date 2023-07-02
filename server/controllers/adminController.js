const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/admin');

exports.admin_signup = [
  body('name').trim().isLength({ max: 20 }),
  body('password').trim().isLength({ max: 30 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors);
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const admin = new Admin({
      name: req.body.name,
      password: hashedPassword,
    });
    await admin.save();
    res.send('Admin credential created');
  },
];
