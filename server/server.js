const express = require('express');
const cors = require('cors');
const hotelRoutes = require('./routes/hotelRoutes')

// Create the Express App
const app = express();

// Configure the Express Application
const host = 'localhost';
const port = 5000;

// Allow requests from other origins
app.use(cors());

// Start the server
app.listen(port, host, ()=> {
    console.log('The server is now running on port', port)
})

// Routes
app.use('/hotels', hotelRoutes)