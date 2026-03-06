const router = require('express').Router();
const validate = require('../utils/joi');
const userAuth = require('../middlewares/userAuth');
const seatSchema = require('../validation/seatValidation');
const seatControllers = require('../controllers/seatControllers');

router.post('/create/:screen_id',userAuth,validate(seatSchema),seatControllers.createSeat);

router.delete('/delete/:seat_id',userAuth,seatControllers.deleteSeat);

module.exports = router;