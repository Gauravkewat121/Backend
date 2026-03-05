const router = require('express').Router();
const userAuth = require('../middlewares/userAuth');
const screenControllers = require('../controllers/screenControllers');
const seatRouter = require('./seatRoutes');

router.post('/create/:theater_id',userAuth,screenControllers.addScreens);

router.put('/update/:screen_id',userAuth,screenControllers.updateScreens);

router.delete('/delete/:screen_id',userAuth,screenControllers.deleteScreen);

router.use('/seats',seatRouter);

module.exports = router;