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
    db.User.find({},function(error,foundUser){
        if(error){
            console.log(error);
        }else{
            const context = {user : foundUser};
            res.render('car/new', context);
        }
    })
    
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

//edit route
router.get('/:id/edit', function(req,res){
    db.Car.findById(req.params.id, function(error, foundCar){
        if(error){
            console.log(error);
        } else {
            const context = {car: foundCar};
            res.render('car/edit', context);
        }
    });
});

//update 
router.put('/:id',function(req,res){
    db.Car.findByIdAndUpdate(req.params.id,req.body,{new: true},function(error, updatedCar){
        if(error){
            console.log(error);
        } else {
            res.redirect(`/cars/${updatedCar._id}`);
        }
    });
});

module.exports = router;