const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// POST: Create a new booking
router.post('/', bookingController.createBooking);

// GET: Retrieve all bookings
router.get('/', bookingController.getAllBookings);

// PATCH: Update status (using PATCH because we are only changing one field)
router.patch('/:id', bookingController.updateBookingStatus);

module.exports = router;