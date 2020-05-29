const express = require('express');
const router = express.Router();
const db = require('../models');

// root routes /cars

router.get('/',function(req,res){
    res.render('car/index');

});
router.get('/new',function(req,res){
    res.render('car/new');
})

router.post('/', function(req,res){
    db.Car.create(req.body, function(error, createdCar){
        if(error){
            console.log(error);
        } else {
            res.redirect('/cars');
        }
    })
})

module.exports = router;