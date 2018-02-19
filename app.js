const config = require('./config.json');
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const logger = require('./logger');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User.js');
const blogs = require('./routes/blogs');
const login = require('./routes/login');
const app = express();

passport.serializeUser(function(user, cb) {
  cb(null, user.token);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      user.token = jwt.sign({id: user._id}, config.secretString);
      return done(null, user);
    });
  }
));
app.use(morgan(':url :date[iso]', {stream: logger.winstonLogger.stream}));

app.use('/blogs', blogs);
app.use('/login', login);

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.listen(config.port, () => console.log(`Listening to ports: ${config.port}`));


app.get('*', (req, res) => {
  res.render('404');
})