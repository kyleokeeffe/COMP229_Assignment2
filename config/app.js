//Declaring imports
//External Modules
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');

//Local Modules
let indexRouter = require('../routes/index');
let contactRouter = require('../routes/contact');

//Instantiating the Express module
let app = express();

//Configuring Express
//set path for views 
app.set('views', path.join(__dirname, '../views'));
//set ejs as the view engine
app.set('view engine', 'ejs');

//Creating middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Setting static folders
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

//Setting HTTP request handlers
app.use('/', indexRouter);
app.use('/contact', contactRouter);

//Predefined callback function in case of error 
app.use(function(req, res, next) {
  next(createError(404));
});

//Predefined error handling 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
