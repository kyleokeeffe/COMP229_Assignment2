// Filename:     controllers/user.js
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 23, 2021 


//Import module
let passport = require('passport');

//Import user model
let User = require('../models/user');

//Import express-validator check function for middleware and business logic
const {body} = require('express-validator');
const {validationResult} = require('express-validator');

//Create middleware function for validation
module.exports.validate = (method) => {//may need to remove 'module.'
    switch (method) {
        case 'processRegister': {
            return [
                  body('firstName', 'Please enter a valid first name using only letter characters').exists().isString(),
                  body('lastName', 'Please enter a valid last name').exists().isString(),
                  body('email', 'Please enter a valid email').exists().isEmail(),
                  body('username', 'Please enter a valid username').exists(),
                  body('password', 'Please enter a valid password').exists()
                
            ]
              
        }



    }
}

//Function for converting error codes to string message
function getErrorMessage(err) {
  console.log("===> Error: " + err);
  let message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

//Export function for listing current username
module.exports.listUsers = function(req, res, next) {  
  res.render('users', { 
    title: 'Users',
    userName: req.user ? req.user.username : ''
  });
}

//Export function for rendering Signup form view
module.exports.renderSignup = function(req, res, next) {
  if (!req.user) {
    let newUser = User();

    res.render('auth/signup', {
      title: 'Sign-up Form',
      messages: req.flash('error'),
      user: newUser
    });

  } else {
    return res.redirect('/');
  }
};

//Export function for rendering Signin form view
module.exports.renderSignin = function(req, res, next) {
  if (!req.user) {
    res.render('auth/signin', {
      title: 'Sign-in Form',
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    console.log(req.user);
    return res.redirect('/');
  }
};

//Export function for posting Signup form
module.exports.signup = function(req, res, next) {
    if (!req.user && req.body.password === req.body.password_confirm) {
      console.log(req.body);
  
      let user = new User(req.body);
      user.provider = 'local';
      console.log(user);
  
      user.save((err) => {
        if (err) {
          try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  req.flash('error',errors.array());
                  return res.render('auth/signup',{
                      title: 'Sign-up form',
                      messages: req.flash('error'),
                      user:user
                  });
            }
          }
          catch(err){
            return next(err);
          }
        return res.redirect('/');
      } else {
      return res.redirect('/');
    }
  });
  }
};

//Export function for posting Signin form
module.exports.signin = function(req, res, next){
  passport.authenticate('local', {   
    successRedirect: req.session.url || '/',
    failureRedirect: '/user/signin',
    failureFlash: true
  })(req, res, next);
  delete req.session.url;
};

//Export function for performing user signout and redirect to home view
module.exports.signout = function(req, res, next) {
  req.logout();
  res.redirect('/');
};