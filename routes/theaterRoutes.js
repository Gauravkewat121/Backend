const router = require('express').Router();
const userAuth = require('../middlewares/userAuth');
const theaterController = require('../controllers/theaterControllers')
const movieTheaterRouter = require('./movieTheaterRoutes');

router.post('/create',userAuth,theaterController.createTheater);

router.put('/update/:theater_id',userAuth,theaterController.updateTheater);

router.delete('/delete/:theater_id',userAuth,theaterController.deleteTheater);

router.get('/get-theater/:theater_id',userAuth,theaterController.getTheater);

router.get('/get-all-theaters',userAuth,theaterController.getAllTheaters);

router.use('/',movieTheaterRouter);

module.exports = router;