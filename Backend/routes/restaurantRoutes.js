const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');  // Import the Menu model

// Get All Restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add a New Restaurant
router.post('/', async (req, res) => {
    try {
        const newRestaurant = new Restaurant(req.body);
        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get Menu by Restaurant ID
router.get('/:id/menu', async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await Menu.find({ restaurantId: id });
        res.json(menu);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
