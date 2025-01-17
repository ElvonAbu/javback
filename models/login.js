const mongoose=require('mongoose');
const userid=new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
        password:{
            type:String,
            require:true
        }

});

module.exports=mongoose.model("login",userid);

