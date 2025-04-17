const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const verifyToken=require('./login.js')

const cart = require('../models/cart.js');


router.use(express.json());
router.use(bodyParser.json());



// Add item to cart
router.post('/add',verifyToken,async (req, res) => {
    const { userId, merchId, quantity } = req.body;
  
    try {
      // Check if the item is already in the user's cart
      let cart = await cart.findOne({ userId });
  
      if (!cart) {
        // Create new cart if it doesn't exist
        cart = new cart({
          userId,
          items: [{ merchId, quantity }]
        });
      } else {
        const existingItemIndex = cart.items.findIndex(
          (item) => item.merchId.toString() === merchId
        );
  
        if (existingItemIndex !== -1) {
          // If item exists, update quantity
          cart.items[existingItemIndex].quantity += quantity;
        } else {
          // Else add new item
          cart.items.push({ merchId, quantity });
        }
      }
  
      await cart.save();
      res.status(200).json(cart);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add item to cart' });
    }
  });
  
  // Get cart items for a user
  router.get('/:userId', verifyToken,async (req, res) => {
    const { userId } = req.params;
  
    try {
      const cart = await cart.findOne({ userId }).populate('items.merchId');
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.json(cart);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving cart' });
    }
  });
  
  // Remove an item from cart
  router.delete('/:userId/remove/:merchId', async (req, res) => {
    const { userId, merchId } = req.params;
  
    try {
      const cart = await cart.findOne({ userId });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      cart.items = cart.items.filter(
        (item) => item.merchId.toString() !== merchId
      );
  
      await cart.save();
      res.json({ message: 'Item removed', cart });
  
    } catch (err) {
      res.status(500).json({ message: 'Error removing item' });
    }
  });
  
  module.exports = router;