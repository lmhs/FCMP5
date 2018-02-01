const http = require('http');
const config = require('./config.json');
const data = require('./Articles.json');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const handlebars = require('express-handlebars');
const logger = require('./logger');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.send('welcome to my blog'));

app.listen(config.port, () => console.log(`Listening to ports: ${config.port}`));

app.get('/blogs', (req, res) => {
  res.send(JSON.stringify(data));
});

function getArticles() {
  return data.articles;
}

function getPost(id) {
  return getArticles().find((article) => article.id === +id)
}

app.get('/blogs/:id', (req, res) => {
  const article = getPost(req.params.id);
  if (article) {
    res.render('article', {title: article.title, author: article.author, content: article.content});
  } else {
    res.render('404');
  }
});

function addPost(post) {
  return [...getArticles(), post];
}

function saveData(data) {
  fs.writeFile(__dirname + '/Articles.json', JSON.stringify(data));
}

app.post('/blogs', (req, res) => {
  const oldData = getArticles();
  const articles = addPost({
    id: oldData[oldData.length - 1].id + 1,
    title: req.body.title,
    author: req.body.author,
    content: req.body.content
  });
  const newData = {articles};
  saveData(newData);
});

app.put('/blogs/:id', (req, res) => {
  const id = req.params.id;
  const article = getPost(id);
  const oldData = getArticles();
  // immutable article
  const newArticle = Object.assign({}, article, req.body);
  const position = oldData.findIndex((element) => element.id === +id);

  // immutable array
  const articles = [
    ...oldData.slice(0, position),
    newArticle,
    ...oldData.slice(position + 1)
  ];
  const newData = {articles};
  saveData(newData);
});

function removePost(id) {
  return getArticles().filter((article) => article.id !== +id);
}

app.delete('/blogs/:id', (req, res) => {
  const articles = removePost(req.params.id);
  const newData = {articles};
  saveData(newData);
  res.render('message', {text: 'Success!'});
});

app.get('*', (req, res) => {
  res.render('404');
})