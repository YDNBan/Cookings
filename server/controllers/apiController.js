const axios = require('axios');

exports.searchAPI = (req, res) => {
  axios.get('http://localhost:5000/searchAPI', { params: req.query })
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};
