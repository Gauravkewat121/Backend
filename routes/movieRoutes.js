const router = require('express').Router();
const userAuth = require('../middlewares/userAuth');
const movieControllers = require('../controllers/movieControllers');
const feedbackRouter = require('./feedbackRouter');

router.get('/get-movie/:movie_id',userAuth,movieControllers.getMovie);

router.get('/get-all-movies',movieControllers.getAllMovies);

router.post('/create',userAuth,movieControllers.createMovie);

router.delete('/delete/:movie_id',userAuth,movieControllers.deleteMovie);

router.put('/update/:movie_id',userAuth,movieControllers.updateMovie);

router.use('/feedbacks',feedbackRouter);

module.exports = router;