import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const MenuPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [menu, setMenu] = useState([]);
    const [orderItems, setOrderItems] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/restaurants/${id}/menu`)
            .then((res) => setMenu(res.data))
            .catch((err) => console.error("Error fetching menu:", err));
    }, [id]);

    const handleQuantityChange = (itemId, quantity) => {
        setOrderItems({ ...orderItems, [itemId]: quantity });
    };

    const handlePlaceOrder = () => {
        const items = Object.entries(orderItems)
            .filter(([_, quantity]) => quantity > 0)
            .map(([itemId, quantity]) => ({ itemId, quantity: parseInt(quantity) }));

        axios.post("http://localhost:3000/orders", { restaurantId: id, items })
            .then(() => navigate("/order"))
            .catch((err) => console.error("Error placing order:", err));
    };

    return (
        <div>
            <h1>Menu</h1>
            {menu.length === 0 ? (
                <p>No items found.</p>
            ) : (
                <div>
                    {menu.map((item, index) => (
                        <div key={index}>
                            <h3>{item.item}</h3>
                            <p>Price: ${item.price}</p>
                            <input
                                type="number"
                                min="0"
                                placeholder="Quantity"
                                onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                            />
                        </div>
                    ))}
                    <button onClick={handlePlaceOrder}>Place Order</button>
                </div>
            )}
        </div>
    );
};

export default MenuPage;
