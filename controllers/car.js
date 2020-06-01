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
// new route //
router.get('/new', async function(req,res,next){
   const userid = autorization(req.session.currentUser,res,next)
    res.render('car/new' ,{userid: userid});
})

 
// create route
router.post('/:id', function(req,res){
let secondid = Number(Date.now())
    const storage = multer.diskStorage({
        destination: `./public/users/${req.params.id}/${secondid}`  ,
        filename: function(req,file,cb){
            cb(null, file.fieldname+'-'+Date.now()+path.extname(
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
            arr=[]
         for(let i=0 ; i< req.files.length ; i++ ){
             const img =req.files[i].path.replace("public",'')
             arr.push(img)
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