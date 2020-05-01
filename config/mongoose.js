
//Library Required
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

//Acquire Connection (To check Server running or not)
const db = mongoose.connection;

//Error
db.on('error',console.error.bind(console, 'Error connecting to db'));

// Server Running Successfully
db.once('open',function(){
    console.log('Successfully connected to database');
});

