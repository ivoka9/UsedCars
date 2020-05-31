const express = require('express');
const router = express.Router();
const db = require('../models');
const autorization = require('../middlewere/auth.js')
const multer = require('multer')
const path = require('path')


let arr=[]




// root routes /cars

router.get('/',function(req,res){
    db.Car.find({}, function(error, allCars){
        if(error){
            console.log(error);
        } else {
            const context = {cars: allCars};
            res.render('car/index', context);
        }
    });
    

});
// new route
router.get('/new', async function(req,res,next){
   const userid = autorization(req.session.currentUser,res,next)
    res.render('car/new' ,{userid: userid});
})
/*
 name : {type: String, required: true},
    price: {type: Number, required: true},
    year: {type: Number, required: true},
    mileage: {type: Number, required: true},
    description: {type: String},
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'*/ 
// create route
router.post('/:id',  function(req,res){
    
        const newCar = {
            name : req.body.name ,
            price : req.body.price ,
            year : req.body.year,
            mileage: req.body.mileage,
            description: req.body.description,
            user: req.params.id,
            img : arr
        }
        db.Car.create(newCar, function(error, createdCar){
            if(error){
                console.log(error); 
            } else {
                res.redirect('/cars');
            }
        });
   
})
// show route
router.get('/:id', function(req,res){
    db.Car.findById(req.params.id, function(error, foundCar){
        if(error){
            console.log(error);
        } else {
            const context = {car: foundCar};
            res.render('car/show', context);
        }
    });
});
module.exports = router;