const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Allow frontend requests

// MongoDB Connection
const mongoURI = 'mongodb+srv://varshitha:25100529@backend.v6w0e.mongodb.net/?retryWrites=true&w=majority&appName=BackendTest';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/restaurants', require('./routes/restaurantRoutes'));
app.use('/orders', require('./routes/orderRoutes'));
app.use('/menus', require('./routes/menuRoutes'));  // Added menu route

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Food Delivery API!');
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
