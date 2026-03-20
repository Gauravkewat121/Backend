
const router = require('express').Router();
const cityRouter = require('./cityRoutes');
const userRouter = require('./userRoutes');
const movieRouter = require('./movieRoutes');
const theaterRouter = require('./theaterRoutes');
const screenRouter = require('./screenRoutes');
const advancedRouter = require('./advancedRoutes');
const bookingRouter = require('./bookingRoutes');


router.use('/api/city',cityRouter);
router.use('/api/user',userRouter);
router.use('/api/movie',movieRouter);
router.use('/api/theater',theaterRouter);
router.use('/api/screen',screenRouter);
router.use('/api/advanced',advancedRouter);
router.use('/booking',bookingRouter);

module.exports = router;