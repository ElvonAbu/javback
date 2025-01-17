const express = require('express');
const router=express.Router();
const app=express();
const bodyparser=require('body-parser');
const workermode=require('../models/work.js');
app.use(express.json());
app.use(bodyparser.json());

router.get('/',async(req,res)=>{
    const alluse=await workermode.find();
    res.status(201).json({message:"elvon"});

})
router.post('/',async(req,res)=>{
    console.log('this is the request body',req.body);
    try{ 
        const{firstname,number,Address,occupation}=req.body;
        const newus= new workermode({firstname,number,Address,occupation});
         const tt=await newus.save();
         console.log('new account',tt);
         res.status(201).send({message:"account created succesfully"});
    }
    catch(error){
        console.log("this is the error",error.message);
    }
   
})

module.exports=router;