const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// All endpoints are public and accessible without a token
router.post('/', bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
router.patch('/:id/cancel', bookingController.cancelBooking);

module.exports = router;