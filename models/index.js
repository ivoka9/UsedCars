const mongoose = require('mongoose');
require('dotenv').config();
let connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(function(){
    console.log("MongoDb Connection Successful..");
}).catch(function(err) 
{   
    console.log('working')
     connectionString = process.env.MONGODB_URI ;
     mongoose.connect(connectionString, 
        {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
     
        })
    });

    module.exports = {
        Car : require('./Car'),
        User : require('./User'),
        Massage : require('./Massage')
    };