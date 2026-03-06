const router = require('express').Router();
const validate =require('../utils/joi.js');
const showSchema = require('../validation/showValidation');
const userAuth = require('../middlewares/userAuth');

const movieTheaterControllers = require('../controllers/movieTheaterControllers');

router.post('/create',userAuth,validate(showSchema),movieTheaterControllers.addMovieIntoTheater);

router.get('/get-movies/:theater_id',userAuth,movieTheaterControllers.getMoviesOfTheater)

router.get('/get-movie/:movie_id/:theater_id',userAuth,movieTheaterControllers.getMovieOfTheater);

router.put('/update/:MT_id',userAuth,validate(showSchema),movieTheaterControllers.updateMovieIntoTheater);

router.delete('/delete/:MT_id',userAuth,movieTheaterControllers.deleteMovieIntoTheater);

module.exports = router;