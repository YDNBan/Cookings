const axios = require('axios');


exports.searchAPI = async (req, res)=> {
    try {
        const query = req.query.query;
        console.log('Request Query:', req.query); 
    console.log('Query Parameter:', req.query.query); 
        if(!query) {
            return res.status(400).json({ error: "Query parameter is required" }); 
        }
        
        // RAPID API Quote URL and options
        const apiURL = 'https://booking-com15.p.rapidapi.com/api/v1/attraction/getAttractionReviews?id=PR6K7ZswbGBs&page=1';
        const options = {
        method: 'GET',
        headers: { // API KEY WILL GO HERE!
            'x-rapidapi-key': '69150d8f56msh7db24ce8d7bf7b0p1e6bd6jsn10374c36c8b6', // Your RAPID API key
            'x-rapidapi-host': 'booking-com15.p.rapidapi.com' // Whatever API we are using from RAPID API
            }
        };

        // Fetch data from API (First time using Axios)
        const response = await axios(apiURL, options);

        // Send data back to React
        res.json(response.data);
    } catch(error) {
        console.error("Error fetching API:", error.message);
        res.status(500).json({ error: "Failed to fetch API data" });
    }

}