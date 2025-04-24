const express = require('express');
const controller = require('../controllers/hotelController')

const router = express.Router();

router.get('/', controller.searchAPI); // fetch HOTELS based off user query

router.get('/:id', controller.display)

module.exports = router;