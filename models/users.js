const mongoose=require('mongoose');
const userid=new mongoose.Schema({
    firstname:{
        type:String,
        require:true
    },
        
    number:{
        type:Number,
        require:true
    },
    Address:{
        type:String,
        require:true
    },
    occupation:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    accountDetails:{
       banknumber:{
                type:Number,
                require:true,
            
       },
       bankname:{
        type:String,
        require:true,
       }     
    }

});

module.exports=mongoose.model("usermodel",userid);

