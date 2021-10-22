

module.exports.displayHome = function(req, res, next) {
    res.render('index', { 
    title: 'Home',
    userName: req.user ? req.user.username : '' });
  };

module.exports.displayAbout = function(req, res, next) {
    res.render('index', { 
    title: 'About Me',
    userName: req.user ? req.user.username : '' });
  };

module.exports.displayProjects = function(req, res, next) {
    res.render('index', { 
    title: 'Projects',
    userName: req.user ? req.user.username : '' });
  };

module.exports.displayServices = function(req, res, next) {
    res.render('index', { 
    title: 'Services',
    userName: req.user ? req.user.username : '' });
  };