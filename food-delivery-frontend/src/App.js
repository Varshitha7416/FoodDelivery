import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import Order from "./components/Order";
import OrderPage from "./pages/OrderPage";
import OrderForm from "./components/OrderForm";  // Import OrderForm
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu/:id" element={<Menu />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/order" element={<Order />} />
                <Route path="/place-order" element={<OrderForm />} /> {/* Add Order Form Route */}
            </Routes>
        </Router>
    );
};

export default App;
