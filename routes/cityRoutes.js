const router = require('express').Router();
const userAuth = require('../middlewares/userAuth');
const cityControllers = require('../controllers/cityControllers');

router.post('/add',userAuth,cityControllers.add_City);

router.get('/get-all-cities',cityControllers.getAll_City);

module.exports = router;