const mongoose=require('mongoose');
const workers=new mongoose.Schema({
    Name: { type: String, required: true }, // Add this field
    Size: { type: Number, required: true ,enum:['S','M','L','XL']},
    category:{type:String,require:true,enum:['CropT','CollarNeck','RoundNeck']},
    Description: { type: String, required: false }, // Add this field
    color: { type: String, required: false }, //


});
// const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Product name
    price: { type: Number, required: true }, // Product price
    description: { type: String, required: true }, // Product description
    picture: { type: String, required: true }, // Path to the uploaded picture
    createdAt: { type: Date, default: Date.now } // Timestamp for product creation
});

module.exports = mongoose.model('Product', productSchema);

module.exports=mongoose.model("Merch",workers);

