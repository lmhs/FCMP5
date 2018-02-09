const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const config = require('../config.json');
const logger = require('../logger');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/blogs/');
});

router.use(logger.errorHandler);

module.exports = router;