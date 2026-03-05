const userAuth = require('../middlewares/userAuth');
const bookingControllers = require('../controllers/bookingControllers');

const router= require('express').Router();

router.post('/create',userAuth,bookingControllers.bookingAndPayment);

router.post('/cancel/:booking_id',userAuth,bookingControllers.cancelBooking);

module.exports = router;