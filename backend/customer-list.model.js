const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CustomerList = new Schema({
    customer_firstName: {
        type: String
    },
    customer_lastName: {
        type: String
    },
    customer_email: {
        type: String
    }
});

module.exports = mongoose.model('CustomerList', CustomerList);