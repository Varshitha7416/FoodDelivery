const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    items: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    orderDate: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Order', OrderSchema);
