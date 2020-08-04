var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const models = require('./models/index');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

models.sequelize.sync().then( () => {
    console.log("DB connection sucess");
  }).catch(err => {
    console.log("DB connection error.");
    console.log(err);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
