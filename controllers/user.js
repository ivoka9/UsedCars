const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt= require('bcryptjs');

router.get('/' ,(req,res)=>{
   
    res.render('user/index' ,  { user: req.session } )
})


router.get('/create',  async (req,res)=>{
    userdata = await db.User.find({})
    res.render('user/newAcc' , {userdata : userdata})
})


router.post('/create', async (req,res)=>{
    try{
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
    }
})


router.get('/login', (req,res)=>{
    res.render('user/login')
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