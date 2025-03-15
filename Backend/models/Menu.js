const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    restaurantId: { type: String, required: true },
    item: { type: String, required: true },
    price: { type: Number, required: true }
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
