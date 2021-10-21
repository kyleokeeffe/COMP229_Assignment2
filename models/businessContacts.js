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
