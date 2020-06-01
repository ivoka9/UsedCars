const express = require('express');
const router = express.Router();
const db = require('../models');
const autorization = require('../middlewere/auth.js')
const multer = require('multer')
const path= require('path')

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

 
// create route
router.post('/:id', function(req,res){
const secondid = Number(Date.now())
    const storage = multer.diskStorage({
        destination: `./public/${req.params.id}/${secondid}`  ,
        filename: function(req,file,cb){
            cb(null, file.fieldname+'-'+secondid+path.extname(
                file.originalname
            ));
        }
    })
    const upload = multer({
        storage:storage
    }).array('imgName' ,5)

    upload(req, res, (err)=>{
        if(err){console.log(err)}
        else{
         for(let i=0 ; i< req.files.length ; i++ ){
             arr.push(req.files[i].path)
         }

            const newCar = {
                name : req.body.name ,
                price : req.body.price ,
                year : req.body.year,
                mileage: req.body.mileage,
                description: req.body.description,
                user: req.params.id,
                img : arr,
                secondid: secondid
            }
            db.Car.create(newCar, async function(error, createdCar){
                if(error){
                    console.log(error);
                } else {
                  
                    res.redirect('/cars');
                }
            });
        }
    })

   
    
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