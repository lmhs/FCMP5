const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', passport.authenticate('local'), (req, res) => {
  res.redirect('blogs/');
});



module.exports = router;