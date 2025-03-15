import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2>Food Delivery</h2>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/order">Orders</Link>
            </div>
        </nav>
    );
};

export default Navbar;
