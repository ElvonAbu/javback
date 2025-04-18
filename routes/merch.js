const express = require('express');
const router=express.Router();
const app=express();
const bodyparser=require('body-parser');
const usermode=require('../models/merch.js');
app.use(express.json());
app.use(bodyparser.json());
const multer = require('multer');
const path = require('path');
const verifyToken=require('./login.js');
const ProductModel = require('../models/product');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    },
});

// Route to handle product creation with picture upload
router.post('/products', upload.single('picture'), verifyToken,async (req, res) => {
    try {
        const { name, price, description } = req.body;

        // Validate required fields
        if (!name || !price || !description || !req.file) {
            return res.status(400).send({ message: "All fields are required, including a picture" });
        }

        // Create a new product
        const newProduct = new ProductModel({
            name,
            price,
            description,
            picture: req.file.path, // Save the file path to the database
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();
        console.log('New product created:', savedProduct);

        res.status(201).send({ message: "Product created successfully", product: savedProduct });
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).send({ message: "Failed to create product", error: error.message });
    }
});
router.get('/products', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await ProductModel.find({}, 'name price description');

        
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).send({ message: "Failed to fetch products", error: error.message });
    }
});

module.exports = router;