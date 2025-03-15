import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Order.css";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/orders")
            .then((res) => setOrders(res.data))
            .catch((err) => console.error(err));
    }, []);

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    return (
        <div className="order-summary">
            <h2>Order Summary</h2>
            {orders.length === 0 ? (
                <p>No orders placed yet.</p>
            ) : (
                orders.map((order, index) => (
                    <div className="order-card" key={index}>
                        <h3>Restaurant: {order.restaurantName}</h3>
                        <ul>
                            {order.items.map((item) => (
                                <li key={item.itemId}>
                                    {item.name} - ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                                </li>
                            ))}
                        </ul>
                        <h4>Total: ₹{calculateTotal(order.items)}</h4>
                    </div>
                ))
            )}
            <button className="home-btn" onClick={() => navigate("/")}>Back to Home</button>
        </div>
    );
};

export default Order;
