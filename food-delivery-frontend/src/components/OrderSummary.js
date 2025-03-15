import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/OrderSummary.css";

const OrderSummary = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/orders")
            .then((res) => setOrders(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="order-summary">
            <h2>Order Summary</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order._id}>
                        <strong>Restaurant:</strong> {order.restaurantId.name}
                        <ul>
                            {order.items.map((item, index) => (
                                <li key={index}>{item.itemId} - Qty: {item.quantity}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderSummary;
