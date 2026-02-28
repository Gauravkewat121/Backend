const router = require('express').Router();
const userAuth = require('../middlewares/userAuth');
const screenControllers = require('../controllers/screenControllers');

router.post('/create/:theater_id',userAuth,screenControllers.addScreens);

router.put('/update/:screen_id',userAuth,screenControllers.updateScreens);


module.exports = router;