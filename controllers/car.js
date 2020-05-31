const express = require('express');
const router = express.Router();
const db = require('../models');
const autorization = require('../middlewere/auth.js')

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
<<<<<<< HEAD
router.get('/new',function(req,res){
    db.User.find({},function(error,foundUser){
        if(error){
            console.log(error);
        }else{
            const context = {user : foundUser};
            res.render('car/new', context);
        }
    })
    
=======
router.get('/new', async function(req,res,next){
   const userid = autorization(req.session.currentUser,res,next)
    res.render('car/new' ,{userid: userid});
>>>>>>> submaster
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
router.post('/:id', function(req,res){
    const newCar = {
        name : req.body.name ,
        price : req.body.price ,
        year : req.body.year,
        mileage: req.body.mileage,
        description: req.body.description,
        user: req.params.id
    }
    db.Car.create(newCar, function(error, createdCar){
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