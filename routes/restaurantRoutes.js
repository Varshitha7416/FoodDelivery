const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// Get All Restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get Menu for a Restaurant
router.get('/:id/menu', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).send('Restaurant not found');
        res.json(restaurant.menu);
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
module.exports = router;
