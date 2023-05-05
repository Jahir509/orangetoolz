const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    firstname: { type: String},
    lastname: { type: String},
    city: { type: String},
    state: { type: String},
    zipcode: { type: Number},
    phone: { type: String},
    email: { type: String},
    ip: { type: String},
})

// firstname,lastname,city,state,zipcode,phone,email,ip

module.exports = mongoose.model("Customer",customerSchema)
