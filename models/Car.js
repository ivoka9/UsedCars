// bring database
const mongoose = require('mongoose');

// create schema
const carSchema = new mongoose.Schema({
   
    name : {type: String, required: true},
    price: {type: Number, required: true},
    year: {type: Number, required: true},
    mileage: {type: Number, required: true},
    description: {type: String},
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    img: [{type:Array}],
    secondid: {type: Number}

}, {timestamps: true});

const Car = mongoose.model('Car',carSchema);
module.exports = Car;