const userAuth = require('../middlewares/userAuth');
const validate = require('../utils/joi');
const bookingSchema = require('../validation/bookingValidation');
const bookingControllers = require('../controllers/bookingControllers');

const router= require('express').Router();

router.post('/create',userAuth,validate(bookingSchema),bookingControllers.bookingAndPayment);

router.post('/cancel/:booking_id',userAuth,bookingControllers.cancelBooking);

module.exports = router;