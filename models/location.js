const mongoose=require('mongoose');
const workers=new mongoose.Schema({
    longitude: { type: Number, required: true }, // Add this field
    latitude: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
     //

});

module.exports=mongoose.model("location",workers);

