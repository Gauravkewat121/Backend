const router = require('express').Router();
const userAuth = require('../middlewares/userAuth');
const movieTheaterControllers = require('../controllers/movieTheaterControllers');

router.post('/create',userAuth,movieTheaterControllers.addMovieIntoTheater);

router.get('/get-movies/:theater_id',userAuth,movieTheaterControllers.getMoviesOfTheater)

router.get('/get-movie/:movie_id/:theater_id',userAuth,movieTheaterControllers.getMovieOfTheater);

router.put('/update/:MT_id',userAuth,movieTheaterControllers.updateMovieIntoTheater);

router.delete('/delete/:MT_id',userAuth,movieTheaterControllers.deleteMovieIntoTheater);

module.exports = router;