// Connect the 
let express = require('express')
let router = express.Router();

let mongoose = require('mongoose');
let passport = require('passport');

let userModel = require('../models/user');

let User = userModel.User;

module.exports.displayHome = (req, res, next) => {
    res.render('index', { title: 'Home' });
  };

module.exports.displayAbout = (req, res, next) => {
    res.render('index', { title: 'About Me' });
  };


module.exports.displayProjects = (req, res, next) => {
    res.render('index', { title: 'Projects' });
  };

module.exports.displayServices = (req, res, next) => {
    res.render('index', { title: 'Services' });
  };
  
module.exports.displayContact = (req, res, next) => {
    res.render('index', { title: 'Services' });
  };

module.exports.displayLogin = (req,res,next) =>{
    //if user is not logged in
    if(!req.user){
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ' '

        })
    }
    else{
        return res.redirect('/');
    }
}

module.exports.processLogin = (req,res,next) => {
    passport.authenticate('local',
    (err,user,info) => {
        if(err){
            return next(err);
        }
        if(!user){
            req.flash('loginMessage','Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if(err){
                return next(err);
            }
            return res.redirect('/businessContacts');
        });
    })(req,res,next);
}

module.exports.displayLogout = (req,res,next)=>{

}

module.exports