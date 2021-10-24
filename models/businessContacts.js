// Filename:     models/businessContacts.js
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 23, 2021 

let mongoose = require('mongoose');

let businessContactsModel = mongoose.Schema(
    {
        name: String,
        telephone: Number,
        email: String,
    },
    {
        collection: "businessContacts"
    }
);

module.exports = mongoose.model('BusinessContacts', businessContactsModel);
