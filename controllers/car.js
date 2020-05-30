const express = require('express');
const router = express.Router();
const db = require('../models');

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
router.get('/new',function(req,res){
    res.render('car/new');
})

// create route
router.post('/', function(req,res){
    db.Car.create(req.body, function(error, createdCar){
        if(error){
            console.log(error);
        } else {
            res.redirect('/cars');
        }
    });
});

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