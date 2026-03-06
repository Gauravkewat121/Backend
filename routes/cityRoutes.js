const router = require('express').Router();
const userAuth = require('../middlewares/userAuth');
const validate = require('../utils/joi');
const citySchema = require('../validation/cityValidation') ;
const cityControllers = require('../controllers/cityControllers');

router.post('/add',userAuth,validate(citySchema),cityControllers.add_City);

router.get('/get-all-cities',cityControllers.getAll_City);

module.exports = router;