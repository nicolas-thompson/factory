const express = require('express');

const bakeryController = require('../controllers/bakery');

const router = express.Router();

// GET /bakery/cakes
router.get('/cakes', bakeryController.getCakes);

// POST /bakery/cake
router.post('/cake', bakeryController.createCake);

module.exports = router;