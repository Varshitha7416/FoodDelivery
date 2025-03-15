// src/components/OrderForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/OrderForm.css";
 // Add styles if needed

function OrderForm() {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    
    // Fetch restaurants
    useEffect(() => {
        axios.get('http://localhost:3000/restaurants')
            .then((res) => setRestaurants(res.data))
            .catch((err) => console.error('Error fetching restaurants:', err));
    }, []);

    // Fetch menu when restaurant changes
    useEffect(() => {
        if (selectedRestaurant) {
            axios.get(`http://localhost:3000/restaurants/${selectedRestaurant}/menu`)
                .then((res) => setItems(res.data))
                .catch((err) => console.error('Error fetching menu:', err));
        }
    }, [selectedRestaurant]);

    // Handle item quantity changes
    const handleItemChange = (itemId, quantity) => {
        setSelectedItems({
            ...selectedItems,
            [itemId]: quantity
        });
    };

    // Submit order
    const handleOrder = () => {
        const orderItems = Object.entries(selectedItems)
            .filter(([_, quantity]) => quantity > 0)
            .map(([itemId, quantity]) => ({ itemId, quantity: parseInt(quantity) }));

        const orderData = {
            restaurantId: selectedRestaurant,
            items: orderItems
        };

        axios.post('http://localhost:3000/orders', orderData)
            .then((res) => alert('Order placed successfully!'))
            .catch((err) => console.error('Error placing order:', err));
    };

    return (
        <div className="order-form">
            <h1>Place Your Order</h1>

            {/* Restaurant Selection */}
            <div>
                <label>Select Restaurant:</label>
                <select value={selectedRestaurant} onChange={(e) => setSelectedRestaurant(e.target.value)}>
                    <option value="">Choose...</option>
                    {restaurants.map((restaurant) => (
                        <option key={restaurant._id} value={restaurant._id}>
                            {restaurant.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Menu Items */}
            {items.length > 0 && (
                <div>
                    <h2>Menu</h2>
                    {items.map((item) => (
                        <div key={item._id}>
                            <span>{item.item}</span> - ₹{item.price}
                            <input
                                type="number"
                                min="0"
                                value={selectedItems[item._id] || 0}
                                onChange={(e) => handleItemChange(item._id, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Order Button */}
            <button onClick={handleOrder} disabled={!selectedRestaurant || !Object.values(selectedItems).some(q => q > 0)}>
                Place Order
            </button>
        </div>
    );
}

export default OrderForm;
