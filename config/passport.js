// Filename:     passport.js
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 23, 2021 

//Import module
const passport = require('passport');

//Export function for serializing database entries into User object and deserializing User object into database entries 
module.exports = function() {
  const User = require('../models/user');
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      _id: id
    }, '-password -salt', (err, user) => {
      done(err, user);
    });
  });

  require('./local')();
};