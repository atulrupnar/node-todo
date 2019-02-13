var express  = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session      = require('express-session');
var cors = require('cors');

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
require('dotenv').config();

var index = require('./app/routes/index');
var users = require('./app/routes/users');

var db = require('./app/config/db');
var port = process.env.PORT || 7002; // set our port

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.options('*', cors());
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

mongoose.connect(process.env.MONGODB_URI); // connect to our database
require('./app/config/passport')(passport); // pass passport for configuration

/*app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));*/

app.use(session({
    secret: 'a4f8071f-c873-4447-8ee2',
    cookie: { maxAge: 2 * 60 * 60 * 1000 },
    store: new (require('express-sessions'))({
        storage: 'mongodb',
        instance: mongoose, // optional 
        host: 'localhost', // optional 
        port: 27017, // optional 
        db: 'todo_app', // optional 
        expire: 86400 // optional 

    }),
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

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

db.connect(process.env.MONGODB_URI, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
  app.listen(port);
    console.log('Online ToDo application started at ' + port);
  }
});

exports = module.exports = app;