const { exec } = require("child_process");
const path = require("path");
const axios = require('axios');

exports.searchAPI = (req, res) => {
    const inputData = req.query.query;
    console.log(inputData);

    const inputJson = JSON.stringify({ query: inputData });
    const escapedJson = inputJson.replace(/"/g, '\\"');  // Escape inner double quotes

    const scriptPath = path.join(__dirname, "..", "models", "APISearch.py");

    // Use double quotes outside, and escaped inner quotes
    const command = `python "${scriptPath}" "${escapedJson}"`;
    console.log("Running command:", command);  // Optional debug log

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({ error: "Error executing Python script" });
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }

        try {
            const result = JSON.parse(stdout);
            console.log(result);
            return res.json({ result });
        } catch (parseError) {
            console.error("Error parsing Python output:", parseError);
            return res.status(500).json({ error: "Error parsing Python output" });
        }
    });
};

exports.display = (req, res) => {
    const hotel_id = req.params.id; // grab hotel id from request
    const arrival = 0;
    const departure = 0;
    

    console.log(hotel_id);

    axios.get(`https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails?hotel_id=${hotel_id}&arrival_date=2025-04-30&departure_date=2025-05-04&adults=2&room_qty=1&units=metric&temperature_unit=c&languagecode=en-us&currency_code=USD`,
    { 
        headers: {
            'x-rapidapi-key': '69150d8f56msh7db24ce8d7bf7b0p1e6bd6jsn10374c36c8b6',
            'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
        }
    })
    .then(response => {
        res.status(200).json(response.data); // this line is what actually sends back the data to client
    })
    .catch(error => {
        console.error('API error:', error.message);
        res.status(500).json({ error: 'Failed to fetch hotel details '});
    });

};