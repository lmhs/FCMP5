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

app.get('/blogs/:id', (req, res) => {
  const id = +req.params.id;
  const article = data.articles.find((item) => item.id === id);
  res.send(`<article><h2>${article.title}</h2> <h3>${article.author}</h3> <p>${article.content}</p>`);
});

function addPost(post) {
  return [...data.articles, post];
}

app.post('/blogs', (req, res) => {
  console.log(`bodyTitle: ${req.body.title}`);
  const articles = addPost({
    id: data.articles.length,
    title: req.body.title,
    author: req.body.author,
    content: req.body.content
  });
  const newData = {articles};
  fs.writeFile('Articles.json', JSON.stringify(newData));
});