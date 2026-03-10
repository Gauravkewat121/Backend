const router = require('express').Router();
const validate = require('../utils/joi');
const feedbackSchema = require('../validation/feedbackValidation');
const userAuth = require('../middlewares/userAuth');
const feedbackControllers = require('../controllers/feedbackControllers');

router.post('/create/:movie_id',userAuth,validate(feedbackSchema,'body'),feedbackControllers.createFeedback);

router.delete('/delete/:feedback_id/',userAuth,feedbackControllers.deleteFeedback);

module.exports = router;
