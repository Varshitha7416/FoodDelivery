const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Restaurant = require('../models/Restaurant');


//Place an Order
router.post('/', async (req, res) => {
    const { restaurantId, items } = req.body;
    
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) return res.status(404).send('Restaurant not found');
        
        const newOrder = new Order({ restaurantId, items });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//Get All Orders

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('restaurantId', 'name');
        res.json(orders);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
