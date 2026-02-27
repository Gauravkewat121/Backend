const router = require('express').Router();
const movieControllers = require('../controllers/movieControllers');
const userAuth = require('../middlewares/userAuth');

router.get('/get-movie/:movie_id',userAuth,movieControllers.getMovie);

router.get('/get-all-movies',userAuth,movieControllers.getAllMovies);

router.post('/create',userAuth,movieControllers.createMovie);

router.delete('/delete',userAuth,movieControllers.deleteMovie);

router.put('/update/:movie_id',userAuth,movieControllers.updateMovie);

module.exports = router;