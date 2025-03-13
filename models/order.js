const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true }
      }
    ],
    totalPrice: { type: Number, required: true }
  });
  

module.exports = mongoose.model('Order', OrderSchema);
