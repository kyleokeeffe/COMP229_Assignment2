// Filename:     controllers/businessContacts.js
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 23, 2021 


// Import database model for businessContacts collection
let BusinessContacts = require('../models/businessContacts');

//Export function for listing all contents of businessContacts database collection
module.exports.list = function(req, res, next) {
    BusinessContacts.find(
        (err, businessContactsList)=>{
          if(err){
            return console.error(err);
          }else{
              res.render('businessContacts/list', { title: 'Business Contacts',
              BusinessContactsList: businessContactsList,
              userName: req.user ? req.user.username : '' });
          }
        }
    );
}

//Export function for rendering edit businessContact add_edit form view
module.exports.displayEdit = function(req,res,next){
    let id = req.params.id;

    BusinessContacts.findById(id, (err,businessContactToEdit) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.render('businessContacts/add_edit', {
                title: "Edit Business Contact",
                BusinessContact: businessContactToEdit,
                userName: req.user ? req.user.username : ''
            })
        }
    });
}

//Export function for posting edit businessContact add_edit form
module.exports.processEdit = function(req,res,next){
    let id = req.params.id;
    let updatedBusinessContact = BusinessContacts({
        _id:req.body.id,
        name: req.body.name,
        telephone: req.body.telephone,
        email: req.body.email

    });
    BusinessContacts.updateOne({_id: id}, updatedBusinessContact, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/businessContacts/list');
        }
    });
}

//Export function for rendering add businessContact add_edit form view
module.exports.displayAdd = function(req,res,next){
    let newBusinessContact = BusinessContacts();

    res.render('businessContacts/add_edit',{
        title: 'Add new Business Contact',
        BusinessContact: newBusinessContact,
        userName: req.user ? req.user.username : ''
})
}

//Export function for posting edit businessContact add_edit form
module.exports.processAdd = function(req,res,next){
    let newBusinessContact = BusinessContacts({
        _id:req.body.id,
        name: req.body.name,
        telephone: req.body.telephone,
        email: req.body.email
    });
    BusinessContacts.create(newBusinessContact, (err, createdContact) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            console.log(createdContact);
            res.redirect('/businessContacts/list');
        }
    });
}

//Export function for removing a single businessContact collection entry
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    BusinessContacts.remove({_id: id}, (err) => {
        if(err){

        }else{
            res.redirect('/businessContacts/list');
        }
    });
}