const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/frontcamp');

const articleSchema = new Schema({
  title: String,
  author: String,
  pubdate: {type: Date, default: Date.now},
  content: String
});

const Article = mongoose.model('Article', articleSchema);

router.get('/', (req, res) => res.render('index'));

function logErrors (err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler (err, req, res, next) {
  res.status(500);
  res.render('error', {error: err});
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

router.get('/', (req, res) => {
  const getArticles = getPosts();
  getArticles.then((articles) => {
    res.render('articles', {articles});
  });
});

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
    throw new Error('empty fields');
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

router.use(logErrors);
router.use(clientErrorHandler);
router.use(errorHandler);

module.exports = router;
