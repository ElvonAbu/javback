const mongoose=require('mongoose');
const workers=new mongoose.Schema({
    firstname: { type: String, required: true }, // Add this field
    number: { type: Number, required: true },
    Address: { type: String, required: false }, // Add this field
    occupation: { type: String, required: false }, //

});

module.exports=mongoose.model("Workersid",workers);

