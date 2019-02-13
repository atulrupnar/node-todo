var express  = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');

require('dotenv').config();

var index = require('./app/routes/index');
var users = require('./app/routes/users');
var port = process.env.PORT || 7002; // set our port

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.options('*', cors());
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send({status : false, error : err});
});

app.listen(port);
exports = module.exports = app;