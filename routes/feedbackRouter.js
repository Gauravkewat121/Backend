const userAuth = require('../middlewares/userAuth');
const feedbackControllers = require('../controllers/feedbackControllers');
const router = require('express').Router();

router.post('/create/:movie_id',userAuth,feedbackControllers.createFeedback);

router.delete('/delete/:feedback_id/',userAuth,feedbackControllers.deleteFeedback);

module.exports = router;
