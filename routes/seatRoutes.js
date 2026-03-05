const userAuth = require('../middlewares/userAuth');
const seatControllers = require('../controllers/seatControllers');
const router = require('express').Router();

router.post('/create/:screen_id',userAuth,seatControllers.createSeat);

router.delete('/delete/:seat_id',userAuth,seatControllers.deleteSeat);

module.exports = router;