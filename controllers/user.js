// Filename:     controllers/user.js
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 23, 2021 


//Import module
let passport = require('passport');

//Import user model
let User = require('../models/user');



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
        let message = getErrorMessage(err);

        req.flash('error', message);
        return res.render('auth/signup', {
          title: 'Sign-up Form',
          messages: req.flash('error'),
          user: user
        });
      }
      return res.redirect('/');
      // req.login(user, (err) => {
      //   if (err) return next(err);
      //   return res.redirect('/');
      // });
    });
  } else {
    return res.redirect('/');
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