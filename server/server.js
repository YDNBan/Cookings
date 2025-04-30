require('dotenv').config();
const express = require('express');
const cors = require('cors');
const hotelRoutes = require('./routes/hotelRoutes');

// Create the Express App
const app = express();

// Allow requests from other origins
app.use(cors());

// Routes
app.use('/hotels', hotelRoutes);

// Use environment variables for port and host
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // Must be 0.0.0.0 for Render to detect the open port

// Start the server
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

