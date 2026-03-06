const router = require('express').Router();
const seatRouter = require('./seatRoutes');
const validate = require('../utils/joi');
const userAuth = require('../middlewares/userAuth');
const screenSchema = require('../validation/screenValidation');
const screenControllers = require('../controllers/screenControllers');

router.post('/create/:theater_id',userAuth,validate(screenSchema),screenControllers.addScreens);

router.put('/update/:screen_id',userAuth,validate(screenSchema),screenControllers.updateScreens);

router.delete('/delete/:screen_id',userAuth,screenControllers.deleteScreen);

router.use('/seats',seatRouter);

module.exports = router;