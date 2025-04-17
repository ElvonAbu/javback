const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const axios = require('axios'); //

const Cart = require('../models/cart.js');
const Checkout = require('../models/checkout');
const Merch = require('../models/merch.js');
const paysta=require('./paystackvery.js');
const verifyToken=require('./login.js');

router.post('/place-order', verifyToken,async (req, res) => {
    const { userId, shippingAddress, totalAmount, email } = req.body;

    try {
        // Step 1: Get user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty or not found' });
        }

        // Step 2: Initialize Paystack payment
        const paystackResponse = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                email,
                amount: totalAmount * 100, // Convert to kobo (Paystack uses the smallest currency unit)
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.pay}`, // Use your Paystack secret key
                },
            }
        );

        if (!paystackResponse.data.status) {
            return res.status(400).json({ message: 'Failed to initialize payment' });
        }

        const paymentUrl = paystackResponse.data.data.authorization_url;
        window.location.href=paymentUrl;

        // Step 3: Create a new checkout/order with payment status as 'pending'
        const newOrder = new Checkout({
            userId,
            items: cart.items,
            totalAmount,
            shippingAddress,
            paymentStatus: 'pending', // Will be updated after payment verification
        });

        await newOrder.save();

        // Step 4: Clear the user's cart
        cart.items = [];
        await cart.save();

        // Step 5: Respond with the payment URL
        res.status(201).json({
            message: 'Order placed successfully. Complete payment to confirm.',
            order: newOrder,
            paymentUrl,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to place order' });
    }
});

module.exports = router;