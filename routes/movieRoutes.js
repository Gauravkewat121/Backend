const router = require('express').Router();
const userAuth = require('../middlewares/userAuth');
const movieControllers = require('../controllers/movieControllers');
const feedbackRouter = require('./feedbackRouter');
const movieSchema = require('../validation/movieValidation');
const validate = require('../utils/joi');
const pageSchema = require('../validation/pageValidation');

router.post('/create',userAuth,validate(movieSchema,'body'),movieControllers.createMovie);

router.put('/update/:movie_id',userAuth,validate(movieSchema,'body'),movieControllers.updateMovie);

router.get('/get-movie/:movie_id',userAuth,movieControllers.getMovie);

router.get('/get-all-movies',validate(pageSchema,'query'),movieControllers.getAllMovies);

router.delete('/delete/:movie_id',userAuth,movieControllers.deleteMovie);

router.use('/feedbacks',feedbackRouter);

module.exports = router;