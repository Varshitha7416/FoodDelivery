import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/restaurants")
            .then((res) => setRestaurants(res.data))
            .catch((err) => console.error("Error fetching restaurants:", err));
    }, []);

    return (
        <div>
            <h2>Restaurants</h2>
            {restaurants.map((restaurant) => (
                <div key={restaurant._id}>
                    <h3>{restaurant.name}</h3>
                    <Link to={`/menu/${restaurant._id}`}>
                        <button>View Menu</button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default RestaurantList;


