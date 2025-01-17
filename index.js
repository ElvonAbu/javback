const express=require("express");
const app=express();
//const router=express.Router();
const userroute=require('./routes/users.js');
const workerroute=require('./routes/work.js');
const merchroute=require('./routes/merch.js');
const loginroute=require('./routes/login.js');
const localroute=require('./routes/location.js');
const port=3000;
const bodyparser=require('body-parser');
require('dotenv').config();
const url=process.env.mongooseurl;
app.use(express.json());
app.use(bodyparser.json());
app.use('/users',userroute);
app.use('/merch',merchroute);
app.use('/userss',workerroute);
app.use('/login',loginroute);
app.use('/location',localroute);
const mongoose=require('mongoose');

app.listen(port,()=>{
console.log("app running on:",port);
});
app.get('/',(req,res)=>{
    res.status(200).json({message:"welcome "});

});

const conmong=async()=>{
    try{
         await mongoose.connect("mongodb://elvonabu22:eZ6PF8xNkm2EsEFU@cluster0-shard-00-02.e7w0m.mongodb.net:27017/?ssl=true&replicaSet=atlas-136qxb-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
         )
         console.log("connected to mongodb");

    }
catch(error){
console.log('this is the error:',error.message);
};
};
conmong();