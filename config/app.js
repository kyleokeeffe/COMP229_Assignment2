// Filename:     app.js
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 23, 2021 

//Declare imports
  //External Modules
  let createError = require('http-errors');
  let express = require('express');
  let path = require('path');
  let cookieParser = require('cookie-parser');
  let logger = require('morgan');
  let mongoose = require('mongoose');

  //External modules for authentication 
  let session=require('express-session');
  let passport=require('passport');
  let passportLocal = require('passport-local');
  let localStrategy = passportLocal.Strategy;
  let flash = require('connect-flash');


// Database configuration
  //Database setup 
  let dbURI = require('./db.js');

  //Connect to database
  mongoose.connect(dbURI.Atlas);

  //Instantiate db connection
  let mongoDB = mongoose.connection;

  //Define database event listeners
  mongoDB.on('error', console.error.bind('Connection Error:'));
  mongoDB.once('open', () => {
    console.log('Connected to MongoDB');
  });

//Routing
  //Import local router modules
  let indexRouter = require('../routes/index');
  let businessContactsRouter = require('../routes/businessContacts');
  let userRouter = require('../routes/user');

  //Setting HTTP request handlers
  app.use('/', indexRouter);
  app.use('/user', userRouter);
  app.use('/businessContacts', businessContactsRouter);

//Configuring Express
  //Instantiating the Express module
  let app = express();
  //Set views path 
  app.set('views', path.join(__dirname, '../views'));
  //set views engine to ejs
  app.set('view engine', 'ejs');

  //Creating middleware
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  //Setting static folders
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(express.static(path.join(__dirname, '../node_modules')));

// Authentication configuration
  //Set up express session
  app.use(session({
    secret: 'SomeSecret',
    saveUninitialized: false,
    resave: false
  }));

  //Initialize flash
  app.use(flash());

  //Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

//Passport user configuration 
  //Import user model
  let userModel = require('../models/user.js');
  //Instantiate user model
  let User = userModel.User;

// Error Handling
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