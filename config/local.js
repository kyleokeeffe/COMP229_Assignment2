// Filename:     local.js
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 23, 2021 

//Import modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//Export function for searching user database based on user input, returning user or displaying error message 
module.exports = function() {
    passport.use(new LocalStrategy((username, password, done)=>{
        User.findOne({username: username}, (err, user)=>{
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            return done(null, user);
        });
    }));
};