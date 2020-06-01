const express = require('express');
const router = express.Router();
const db = require('../models');

const authorization = require('../middlewere/auth.js')

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
router.get('/new', function(req,res,next){
   const userid = authorization(req.session.currentUser,res,next)
    res.render('car/new' ,{userid: userid});
})

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
            res.redirect(`/profile/${req.params.id}`);
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
            console.log(context);
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
            res.redirect(`/profile/${updatedCar.user}`);
        }
    });
});

//delete route
router.delete('/:id',function(req,res){

     db.Car.findByIdAndDelete(req.params.id,function(error,deletedCar){
         if(error){
             console.log(error);
         } else {
            res.redirect(`/profile/${deletedCar.user}`);
         }
     });
    });
       
        
 
module.exports = router;