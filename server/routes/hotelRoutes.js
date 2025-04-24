const express = require('express');
const controller = require('../controllers/hotelController')

const router = express.Router();

router.get('/', controller.searchAPI);

router.get('/:id')

module.exports = router;