const mongoose=require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Product name
    price: { type: Number, required: true }, // Product price
    description: { type: String, required: true }, // Product description
    picture: { type: String, required: true }, // Path to the uploaded picture
    createdAt: { type: Date, default: Date.now } // Timestamp for product creation
});

module.exports = mongoose.model('Product', productSchema);


