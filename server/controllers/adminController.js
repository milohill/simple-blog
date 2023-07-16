const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/admin');

exports.admin_signup = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('The name should be more than 1 character in length.')
    .isLength({ max: 20 })
    .withMessage('The name should be no more than 20 characters in length.'),
  body('password')
    .trim()
    .isLength({ min: 1 })
    .withMessage('The password should be more than 1 character in length.')
    .isLength({ max: 100 })
    .withMessage('The password should be no more than 100 characters in length.'),
  async (req, res, next) => {
    // pass errors if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors);
    }

    const { adminName } = req.body;
    const { adminPassword } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const newAdmin = new Admin({
        name: adminName,
        password: hashedPassword,
        createdAt: new Date(),
      });
      await newAdmin.save();
      return res.json('credential created');
    } catch (err) {
      return res.json(err);
    }
  },
];
