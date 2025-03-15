const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

// Get menu for a specific restaurant
router.get('/:restaurantId', async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const menu = await Menu.find({ restaurantId });
        res.json(menu);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
