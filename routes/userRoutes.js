const userControllers = require('../controllers/userControllers');
const router = require('express').Router();
const userAuth = require('../middlewares/userAuth');
const validate = require('../utils/joi');
const {userSchema,userUpdate} = require('../validation/userValidation');

router.post('/sign-up',validate(userSchema,'body'),userControllers.signUp);

router.post('/login',userControllers.login);

router.get('/get-user/:id',userAuth,userControllers.getUser);

router.put('/update',userAuth,validate(userUpdate,'body'),userControllers.userUpdate);

module.exports = router;