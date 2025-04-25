const express = require('express');
const {rateLimiter} = require('../middlewares/rateLimiter');
const controller = require('../controllers/hotelController')

const router = express.Router();

router.get('/', rateLimiter, controller.searchAPI); // fetch HOTELS based off user query

router.get('/:id', rateLimiter, controller.display); // fetch details for single hotel

module.exports = router;