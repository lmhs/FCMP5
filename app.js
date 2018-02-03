const http = require('http');
const config = require('./utils/config.json');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const handlebars = require('express-handlebars');
const logger = require('./logger');
const methodOverride = require('method-override');
const blogs = require('./blogs/blogs');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/blogs', blogs);
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.listen(config.port, () => console.log(`Listening to ports: ${config.port}`));

app.get('*', (req, res) => {
  res.render('404');
})