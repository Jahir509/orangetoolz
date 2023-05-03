const mongoose = require('mongoose');

const invalidCustomerSchema = mongoose.Schema({
    firstname: { type: String},
    lastname: { type: String},
    city: { type: String},
    state: { type: String},
    zipcode: { type: Number},
    phone: { type: Number},
    email: { type: String},
    ip: { type: String},
})

module.exports = mongoose.model('InvalidCustomer',invalidCustomerSchema);
