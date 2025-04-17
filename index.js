const express=require("express");
const app=express();
const userroute=require('./routes/users.js');
const merchroute=require('./routes/merch.js');
const loginroute=require('./routes/login.js');
const cartroute=require('./routes/cart.js');
const checkoutroute=require('./routes/checkout.js');
// const cors=require('cors');
const port=3000;
const bodyparser=require('body-parser');
require('dotenv').config();
const mongooseurl=process.env.mongooseurl;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public')); // Serve static files (like your HTML)
app.use(bodyparser.json());
app.use('/users',userroute);
app.use('/cart',cartroute);
app.use('/checkout',checkoutroute);
app.use('/merch',merchroute);
app.use('/login',loginroute);
const mongoose=require('mongoose');

app.listen(port,()=>{
console.log("app running on:",port);
});
app.get('/',(req,res)=>{
    res.status(200).json({message:"welcome "});

});

const conmong=async()=>{
    try{
         await mongoose.connect(mongooseurl
         )
         console.log("connected to mongodb");

    }
catch(error){
console.log('this is the error:',error.message);
};
};
conmong();
