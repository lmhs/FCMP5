const http = require('http');
const config = require('./config.json');
const article = require('./Article.json');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send(JSON.stringify(article)));

app.listen(config.port, () => console.log(`Listening to ports: ${config.port}`));