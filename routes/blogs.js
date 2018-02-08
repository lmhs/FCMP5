const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const logger = require('../logger');

mongoose.connect(`mongodb://${config.db.url}/${config.db.name}`);

const articleSchema = new Schema({
  title: String,
  author: String,
  pubdate: {type: Date, default: Date.now},
  content: String
});

const Article = mongoose.model('Article', articleSchema);

router.get('/', checkAuth, (req, res) => {
  const getArticles = getPosts();
  getArticles.then((articles) => {
    res.render('articles', {articles});
  });
});

function checkAuth(req, res, next) {
  const authHeaders = req.get('Authorization') ? req.get('Authorization').split(' ') : null;
  if (authHeaders.length > 0 &&
      authHeaders[0] === 'Bearer' &&
      authHeaders[1]) {
    const token = rauthHeaders[1];
    jwt.verify(token, config.secretString, function (err) {
      if (err) {
        res.redirect('/login/');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/login/');
  }
}

function getPosts() {
  return Article.find({}, function(err, articles) {
    return articles;
  });
}

function getPostById(id) {
  return Article.findById(id).exec();
}

function updatePostById(id, newPost) {
  return Article.findByIdAndUpdate(id, newPost, {new: true, upsert: true}).exec();
}

function removePostById(id) {
  return Article.findByIdAndRemove(id).exec();
}

router.get('/:id', (req, res, next) => {
  const getArticles = getPostById(req.params.id);
  getArticles.then((article) => {
    res.render('article', {
      title: article.title,
      author: article.author,
      content: article.content
    });
  })
  .catch(err => {
    next(err);
  });
});

router.post('/', (req, res, next) => {
  if (!req.body.title ||
    !req.body.author ||
    !req.body.content) {  
      return next('empty fields');
  }

  const newArticle = new Article({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content
  });

  newArticle.save()
  .then(() => {
    res.render('article', newArticle);
  })
  .catch(err => {
    next(err);
  });
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const article = getPostById(id);

  const updateArticle = updatePostById(id, req.body);

  updateArticle.then((article) => {
    res.render('article', article)
  })
  .catch(err => {
    next(err);
  });
});

router.delete('/:id', (req, res, next) => {
  const removeArticle = removePostById(req.params.id);
  removeArticle.then(() => {
    res.render('message', {text: 'Success!'});
  })
  .catch(err => {
    next(err);
  });
});

router.use(logger.errorHandler);

module.exports = router;
