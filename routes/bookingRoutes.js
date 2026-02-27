// const express = require('express');
// const router = express.Router();
// const bookingController = require('../controllers/bookingController');

// // Debug: Add this line to see what is actually being imported
// console.log("Booking Controller Methods:", bookingController);

// // POST: Create a new booking
// router.post('/', bookingController.createBooking);

// // GET: Retrieve all bookings
// router.get('/', bookingController.getAllBookings);

// // GET: Retrieve a specific booking by ID
// router.get('/:id', bookingController.getBookingById);

// // PATCH: Update status (using PATCH because we are only changing one field)
// router.patch('/:id', bookingController.updateStatus);

// module.exports = router;

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// All endpoints are public and accessible without a token
router.post('/', bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
router.patch('/:id/cancel', bookingController.cancelBooking);

module.exports = router;