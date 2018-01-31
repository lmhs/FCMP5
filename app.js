const http = require('http');
const config = require('./config.json');
const data = require('./Articles.json');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('welcome to my blog'));

app.listen(config.port, () => console.log(`Listening to ports: ${config.port}`));

app.get('/blogs', (req, res) => {
  res.send(JSON.stringify(data));
});

function getPost(id) {
  return data.articles.find((article) => article.id === +id)
}

app.get('/blogs/:id', (req, res) => {
  const article = getPost(req.params.id);
  res.send(`<article><h2>${article.title}</h2> <h3>${article.author}</h3> <p>${article.content}</p>`);
});

function addPost(post) {
  return [...data.articles, post];
}

app.post('/blogs', (req, res) => {
  const articles = addPost({
    id: data.articles[data.articles.length - 1].id + 1,
    title: req.body.title,
    author: req.body.author,
    content: req.body.content
  });
  const newData = {articles};
  fs.writeFile('Articles.json', JSON.stringify(newData));
});

app.put('/blogs/:id', (req, res) => {
  const id = req.params.id;
  const article = getPost(id);
  // immutable article
  const newArticle = Object.assign({}, article, req.body);
  const position = data.articles.findIndex((element) => element.id === +id);

  // immutable array
  const articles = [
    ...data.articles.slice(0, position),
    newArticle,
    ...data.articles.slice(position + 1)
  ];
  const newData = {articles};

  fs.writeFile('Articles.json', JSON.stringify(newData));
});

function removePost(id) {
  return data.articles.filter((article) => article.id !== +id);
}

app.delete('/blogs/:id', (req, res) => {
  const articles = removePost(req.params.id);
  const newData = {articles};
  fs.writeFile('Articles.json', JSON.stringify(newData));
});