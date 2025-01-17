const mongoose=require('mongoose');
const workers=new mongoose.Schema({
    Name: { type: String, required: true }, // Add this field
    Size: { type: Number, required: true ,enum:['S','M','L','XL']},
    category:{type:String,require:true,enum:['CropT','CollarNeck','RoundNeck']},
    Description: { type: String, required: false }, // Add this field
    color: { type: String, required: false }, //


});

module.exports=mongoose.model("Merch",workers);

