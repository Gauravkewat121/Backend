const router = require('express').Router();
const userAuth = require('../middlewares/userAuth');
const theaterController = require('../controllers/theaterControllers')
const movieTheaterRouter = require('./movieTheaterRoutes');
const validate = require('../utils/joi');
const theaterSchema = require('../validation/theaterValidation');

router.post('/create',userAuth,validate(theaterSchema),theaterController.createTheater);

router.put('/update/:theater_id',userAuth,validate(theaterSchema),theaterController.updateTheater);

router.delete('/delete/:theater_id',userAuth,theaterController.deleteTheater);

router.get('/get-theater/:theater_id',userAuth,theaterController.getTheater);

router.get('/get-all-theaters',userAuth,theaterController.getAllTheaters);

router.use('/shows',movieTheaterRouter);

module.exports = router;