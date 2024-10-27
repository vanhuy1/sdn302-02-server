const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingControllers');

router.route('/')
    .post(bookingController.bookingRoom)

router.route('/:bookingID')
    .put(bookingController.editBookingRoom)
    .delete(bookingController.deleteBooking)


router.route('/:username')
    .get(bookingController.viewBookingRoom)

router.route('/user/:bookingID')
    .get(bookingController.viewBookingById)

module.exports = router;