const http = require('http');
const config = require('./config.json');
const article = require('./Article.json');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`${JSON.stringify(article)}`);
}).listen(config.port);