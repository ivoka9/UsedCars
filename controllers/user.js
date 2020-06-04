const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt= require('bcryptjs');
const fs= require('fs')

let userFlag=false , phoneFlag=false, loginFlag=false ,passwordFlag= false;

// based on the session it will either show him to log in or logout
router.get('/' ,(req,res)=>{
    res.render('user/index' ,  { user: req.session } )
})

// Creating a user 
router.get('/create',  async (req,res)=>{
    
    res.render('user/newAcc' , {
        userFlag : userFlag,
        phoneFlag : phoneFlag,
        passwordFlag : passwordFlag
    })
})

// it Checks the DB  if it meets the requirements to Create a user
// if it does then the user is created else it gives him a specific err 
router.post('/create', async (req,res)=>{


    try{
       const user = await db.User.findOne({Username: req.body.username})
       phoneFlag= false;
       userFlag= false;
       passwordFlag= false
       
       if(user){
           userFlag = true 
           return res.redirect('/create')
        }
       const phone = await db.User.findOne({Phone: req.body.phone})
       if(phone || req.body.phone.length <10 || req.body.phone.length>11){
           phoneFlag= true;
           return res.redirect('/create')
       }
       
       if(req.body.password.length<3){
        passwordFlag= true;
        return res.redirect('/create')
       }
        const salt = await bcrypt.genSalt(10)
        const hash =await bcrypt.hash(req.body.password ,salt)
        req.body.password=hash



       const creatingUser = {
           
            Username : req.body.username,
            Password : req.body.password,
            Phone : req.body.phone,
            
        }
        const newUser = await db.User.create(creatingUser)
        res.redirect('/cars/1')
    }
    catch(err){
        if(err){console.log(err)}
        res.redirect('/cars/1')
    }
})


router.get('/login', (req,res)=>{
    const flag = false
    res.render('user/login',{loginFlag : loginFlag})
})


router.post('/login', async (req,res)=>{
    try{

        loginFlag= false
        const foundUser = await db.User.findOne({Username: req.body.username})
        if(!foundUser){
                    loginFlag=true;
                    

            return res.redirect('/login')}
        const pass =await  bcrypt.compare(req.body.password , foundUser.Password)
        if(!pass){
            loginFlag=true;
            return res.redirect('/login')}           
        req.session.currentUser= {
            id : foundUser._id ,
            username: foundUser.Username
        }
        res.redirect(`/profile/${foundUser._id}`);
    }
    catch(err){
        res.redirect('/login')
        console.log(err)
    }
})


router.get('/logout' , async (req,res)=>{
    await req.session.destroy();
    res.redirect('/cars/1')
})

router.get('/profile/:id' , async (req,res)=>{
try{
    let chaturl=[]
    let who=[]
const userProfile = await db.User.findById(req.params.id)
const chat = await db.Massage.find({reciver:userProfile.Username })
const foundCars = await db.Car.find({user: req.params.id})
try{
   
  flag =(req.session.currentUser.username==userProfile.Username);
  try{
  for(let i=0 ; i<chat.length ; i++){
   chaturl.push(`/massage/${chat[i].sender}/${userProfile._id}`)
   who.push(chat[i].sender) 
  }
    }catch{}  
}
catch{
    flag = false
}
console.log(chaturl)
res.render("user/profile",{userProfile : userProfile, 
                             cars: foundCars,
                             flag:flag,user: req.session,
                            chat :chaturl,
                            who:who }); 
}   

catch(err){
    console.log(err)
    res.redirect('/profile')
}
});

router.delete('/delacc/:id', async (req,res)=>{
  await  req.session.destroy()
  let deletedCar
    try {
        const delUser= await db.User.findByIdAndDelete(req.params.id)
        const delCars= await db.Car.find({user : req.params.id})
       
        for(let i=0 ; i<delCars.length; i++){
            console.log(delCars[i]._id)
            deletedCar = await db.Car.findByIdAndDelete(delCars[i]._id)               
            for(let i=0 ; i<deletedCar.img.length ;i++) {
                fs.unlink(`./public/${deletedCar.img[i][0]}`,function(){})
            }        
            fs.rmdir(`./public/users/${deletedCar.user}/${deletedCar.secondid}`,function(){})
                     
        }
        fs.rmdir(`./public/users/${deletedCar.secondid}`,function(){}) 
        res.redirect('/cars/1')
     }
    catch(err){
        res.json(err)
        console.log(err)
    }
})

router.get('/*', function(req,res){
    res.render('user/error',{user: req.session});
})


module.exports= router