import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Menu.css";

const Menu = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/restaurants/${id}/menu`)
            .then((res) => setMenu(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    const addToOrder = (item) => {
        const existingItem = order.find((orderItem) => orderItem.itemId === item._id);
        if (existingItem) {
            // Increase quantity if item already in the cart
            setOrder(order.map((orderItem) =>
                orderItem.itemId === item._id
                    ? { ...orderItem, quantity: orderItem.quantity + 1 }
                    : orderItem
            ));
        } else {
            // Add new item with quantity 1
            setOrder([...order, { itemId: item._id, name: item.item, price: item.price, quantity: 1 }]);
        }
    };

    const updateQuantity = (itemId, quantity) => {
        if (quantity === 0) {
            setOrder(order.filter((orderItem) => orderItem.itemId !== itemId));
        } else {
            setOrder(order.map((orderItem) =>
                orderItem.itemId === itemId
                    ? { ...orderItem, quantity }
                    : orderItem
            ));
        }
    };

    const placeOrder = () => {
        axios.post("http://localhost:3000/orders", {
            restaurantId: id,
            items: order.map(({ itemId, quantity }) => ({ itemId, quantity }))
        }).then(() => {
            navigate("/order");
        }).catch((err) => console.error(err));
    };

    return (
        <div className="menu-container">
            <h2>Menu</h2>
            <ul>
                {menu.map((item) => {
                    const orderItem = order.find((orderItem) => orderItem.itemId === item._id);
                    return (
                        <li key={item._id}>
                            {item.item} - ₹{item.price} 
                            {orderItem ? (
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item._id, orderItem.quantity - 1)}>-</button>
                                    <span>{orderItem.quantity}</span>
                                    <button onClick={() => updateQuantity(item._id, orderItem.quantity + 1)}>+</button>
                                </div>
                            ) : (
                                <button onClick={() => addToOrder(item)}>Add</button>
                            )}
                        </li>
                    );
                })}
            </ul>
            <button className="order-btn" onClick={placeOrder} disabled={order.length === 0}>
                Place Order
            </button>
        </div>
    );
};

export default Menu;


