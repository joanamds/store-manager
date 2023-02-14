const express = require('express');
// const { route } = require('express/lib/router');
const { salesController } = require('../controllers');

const router = express.Router();

router.post('/', salesController.createSales);

module.exports = router;