const express = require('express');
const router=express.Router();
const app=express();
const bodyparser=require('body-parser');
const usermode=require('../models/users.js');
app.use(express.json());
app.use(bodyparser.json());

router.get('/',async(req,res)=>{
    const alluse=await usermode.find();
    res.status(201).send(alluse);

})
router.post('/',async(req,res)=>{
    console.log('this is the request body',req.body);
    try{ 
        const{firstname,number,Address,occupation}=req.body;
        const newus= new usermode({firstname,number,Address,occupation});
        const tt=await newus.save();
         console.log('new account',tt);
         res.status(201).send({message:"account created succesfully"});
    }
    catch(error){
        console.log("this is the error",error.message);
    }
   
})
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from the route parameter
        console.log(id);
        const deletedUser = await usermode.findByIdAndDelete(id); // Delete user by ID

        if (!deletedUser) {
            return res.status(404).send({ message: "User not found" }); // Handle case where user doesn't exist
        }

        res.status(200).send({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        res.status(500).send({ error: error.message }); // Handle server errors
    }
});
router.put('/:id',async(req,res)=>{
   try{
    const id=req.params.id;
    console.log("this is the id",id);
    const updbo=req.body;
    const updatedbody= await usermode.findByIdAndUpdate(id,updbo);
    if(!updatedbody){
        res.status(400).send({message:"bad request"});
    }
    else{
        console.log("this is the new body:",updatedbody);
        res.status(200).send(updatedbody);
    }

   }catch (error){
    res.status(500).send({error:error.message});
   }
})


module.exports=router;