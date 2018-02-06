const winston = require('winston');

const winstonLogger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'combined.log',
      timestamp: true
    })
  ]
});

winstonLogger.stream = {
  write: function(message, encoding){
    winstonLogger.info(message);
  }
};

function errorHandler (err, req, res, next) {
  res.status(500);
  res.render('error', {error: err});
}

module.exports = {winstonLogger, errorHandler};