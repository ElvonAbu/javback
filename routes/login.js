const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const usermode = require('../models/login.js');
require('dotenv').config();

// JWT Secret Key
const JWT_SECRET = process.env.jwtpass; // Replace with a secure key

// Middleware to parse JSON requests
router.use(express.json());
router.use(bodyParser.json());

// Route to get all users (for testing purposes, remove in production)
router.get('/', async (req, res) => {
    try {
        const allUsers = await usermode.find();
        res.status(200).send(allUsers);
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch users", error: error.message });
    }
});

// Registration Route
router.post('/register', async (req, res) => {
    try {
        const {email,password}= req.body;
       

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the new user
        const newUser = new usermode({ email, password: hashedPassword });
        const savedUser = await newUser.save();
        console.log("this is the email",email);

        res.status(201).send({ message: "User registered successfully", user: savedUser });
    } catch (error) {
        console.log("Registration Error:", error.message);
        res.status(500).send({ message: "Registration failed", error: error.message });
    }
});

// Login Route
router.post('/login',verifyToken,async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await usermode.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).send({ message: "Invalid email or password" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log("Login Error:", error.message);
        res.status(500).send({ message: "Login failed", error: error.message });
    }
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token missing or invalid' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload; // Attach user data to the request
        next();
    } catch (error) {
        console.log("Token Verification Error:", error.message);
        return res.status(403).json({ message: 'Invalid token' });
    }
}

// Protected Route Example
router.get('/protected', verifyToken, (req, res) => {
    res.status(200).send({ message: "Access granted to protected route", user: req.user });
});
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from the route parameter
        console.log(id);
        const deletedUser = await usermode.findByIdAndDelete(id); // Delete user by ID

        if (!deletedUser) {
            return res.status(404).send({ message: "User not found" }); // Handle case where user doesn't exist
        }

        res.status(200).send({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        res.status(500).send({ error: error.message }); // Handle server errors
    }
});

module.exports = router;
