const userControllers = require('../controllers/userControllers');
const router = require('express').Router();
const userAuth = require('../middlewares/userAuth');


router.post('/sign-up',userControllers.signUp);

router.post('/login',userControllers.login);

router.get('/get-user',userAuth,userControllers.getUser);

module.exports = router;