const mongoose = require('mongoose');

//connecting mongoose  with codeial_developmet database.
mongoose.connect('mongodb://localhost/codeial_development');
//aquiring connecction
const db  = mongoose.connection;

// if we got error while connecting then we are binding in console
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


//on connection successfull
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;