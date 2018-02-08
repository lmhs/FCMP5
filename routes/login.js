const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const config = require('../config.json');
const logger = require('../logger');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', authenticate, (req, res) => {
  res.redirect('blogs/');
});

function authenticate(req, res, next) {
  User.findOne({
    username: req.body.username
  }, (error, user) => {
    if (error) {
      next(error);
    } else if (!user) {
      next('User not found');
    } else {
      if (user.comparePasswords(req.body.password)) {
        const json = res.json({token: jwt.sign({id: user._id}, config.secretString)});
        return json;
      } else {
        next('Wrong password');
      }
    }
  });
}

router.use(logger.errorHandler);

module.exports = router;