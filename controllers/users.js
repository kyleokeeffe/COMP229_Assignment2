//copied directly from Week 6 - Authentication example project


let User = require('../models/user');
let passport = require('passport');

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



module.exports.displayLogin = function(req, res, next) {
  if (!req.user) {
    res.render('auth/login', {
      title: 'Login',
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    console.log(req.user);
    return res.redirect('/');
  }
};

module.exports.processLogin = function(req, res, next){
    passport.authenticate('local', {   
      successRedirect: req.session.url || '/',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
    delete req.session.url;
  }

  module.exports.displayLogout = function(req, res, next) {
    req.logout();
    res.redirect('/');
  };