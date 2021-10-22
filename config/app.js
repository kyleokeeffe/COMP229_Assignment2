//Declaring imports
//External Modules
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let cors = require('cors');

//modules for authentication 
let session=require('express-session');
let passport=require('passport');

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

//Database setup 
let DB = require('./db');

//Connect to database
mongoose.connect(DB.URI);

let mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind('Connection Error:'));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB');
});


//Local Modules
let indexRouter = require('../routes/index');
let contactRouter = require('../routes/contact');
let businessContactsRouter = require('../routes/businessContacts');
// let loginRouter = require('../routes/login');

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


//set up express session
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

//Create user model instance
let userModel = require('../models/user.js');
let User = userModel.User;

// implement a User Authentication Strategy
passport.use(User.createStrategy());

//serialize and deserical the user info 
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

// verify that the token sent by the user - check if valid
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.Secret;

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
  .then(user => {
    return done(null, user);
  }).catch(err => {
    return done(err, false);
  });
});


passport.use(strategy);

//Setting HTTP request handlers
app.use('/', indexRouter);
app.use('/contact', contactRouter);
// app.use('/login', loginRouter);
app.use('/businessContacts', businessContactsRouter);




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
