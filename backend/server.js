const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const customerlistRoutes = express.Router();
const PORT = 4000;

let CustomerList = require('./customer-list.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/customer_records', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// Deliver all available customer records
customerlistRoutes.route('/').get(function(req, res) {
    CustomerList.find(function(err, customer_records) {
        if (err) {
            console.log(err);
        } else {
            res.json(customer_records);
        }
    });
});

// Retrieve customer records by providing an ID
customerlistRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    CustomerList.findById(id, function(err, customerlist) {
        res.json(customerlist);
    });
});

// Update exisiting customer records
customerlistRoutes.route('/update/:id').post(function(req, res) {
    CustomerList.findById(req.params.id, function(err, customerlist) {
        if (!customerlist)
            res.status(404).send("data is not found");
        else
            customerlist.customer_firstName = req.body.customer_firstName;
            customerlist.customer_lastName = req.body.customer_lastName;
            customerlist.customer_email = req.body.customer_email;

            customerlist.save().then(customerlist => {
                    res.json('Customerlist updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
    });
});

// Add new customer records
customerlistRoutes.route('/add').post(function(req, res) {
    let customerlist = new CustomerList(req.body);
    customerlist.save()
        .then(customerlist => {
            res.status(200).json({'customerList': 'New customer added successfully'});
        })
        .catch(err => {
            res.status(400).send('Adding new customer failed');
        });
})

// Delete existing customer records
customerlistRoutes.route('/delete/:id').post(function(req, res) {
    let customerlist = new CustomerList(req.body);
    customerlist.save()
        .then(customerlist => {
            res.status(200).json({'customerList': 'Customer deleted successfully'});
        })
        .catch(err => {
            res.status(400).send('Deleting customer failed');
        });
})

app.use('/customer_records', customerlistRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});



