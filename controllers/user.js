const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt= require('bcryptjs');

let userFlag=false , phoneFlag=false

router.get('/' ,(req,res)=>{
   
    res.render('user/index' ,  { user: req.session } )
})


router.get('/create',  async (req,res)=>{
    
    res.render('user/newAcc' , {
        userFlag : userFlag,
        phoneFlag : phoneFlag
    })
})


router.post('/create', async (req,res)=>{


    try{
       const user = await db.User.findOne({Username: req.body.username})
       phoneFlag= false;
       userFlag= false;
       
       if(user){
           userFlag = true 
           return res.redirect('/create')
        }
       const phone = await db.User.findOne({Phone: req.body.phone})
       console.log(phone)
       if(phone){
           phoneFlag= true;
           return res.redirect('/create')
       }
       
        const salt = await bcrypt.genSalt(10)
        const hash =await bcrypt.hash(req.body.password ,salt)
        req.body.password=hash

       const creatingUser = {
            Username : req.body.username,
            Password : req.body.password,
            Phone : req.body.phone
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
    console.log(req.body.username)
    try{
    
        const foundUser = await db.User.findOne({Username: req.body.username})
        if(!foundUser){return res.json("Create an Acc")}
        const pass =await  bcrypt.compare(req.body.password , foundUser.Password)
        if(!pass){return res.json("pass did not match")}
        req.session.currentUser= {
            id : foundUser._id ,
            username: foundUser.Username
        }
        res.redirect('/')
    }
    catch(err){
        res.redirect('/create')
        console.log(err)
    }
})

module.exports= router