const express = require('express');
const controller = require('../controllers/apiController')

const router = express.Router();

router.get('/', controller.searchAPI);

module.exports = router;