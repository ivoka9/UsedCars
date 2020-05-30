const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt= require('bcryptjs');

let userFlag=false , phoneFlag=false, loginFlag=false ,passwordFlag= false;

// if  based on the session it will eather show him to log in or logout
router.get('/' ,(req,res)=>{
    res.render('user/index' ,  { user: req.session } )
})

// Creating a use 
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
/// this is  fake DB feel free to delete it ! 
        let car = Math.random()*100
        if( car <10){car="toyota"}
        else if( car <20){car="Ford"}
        else if( car <30){car="Hunday"}
        else if( car <40){car="lex"}
        else if( car <50){car="ok"}
        else if( car <60){car="Z"}
        else if( car <70){car="X"}
        else if( car <80){car="M"}
        else if( car <100){car="F"}


       const creatingUser = {
           
            Username : req.body.username,
            Password : req.body.password,
            Phone : req.body.phone,
            Product : car
        }
        const newUser = await db.User.create(creatingUser)
        res.redirect('/')
    }
    catch(err){
        if(err){console.log(err)}
        res.redirect('/')
    }
})


router.get('/login', (req,res)=>{
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
        res.redirect('/')
    }
    catch(err){
        res.redirect('/login')
        console.log(err)
    }
})


router.post('/logout' , async (req,res)=>{
    await req.session.destroy();
    res.redirect('/')
})

router.get('/profile/:id' , async (req,res)=>{
try{
    
const userProfile = await db.User.findById(req.params.id)
console.log(userProfile)
  res.render("user/profile",{userProfile : userProfile})      
}
catch(err){
    console.log(err)
    res.redirect('/')
}
})


module.exports= router