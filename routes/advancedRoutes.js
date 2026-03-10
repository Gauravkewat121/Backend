const router = require('express').Router();
const userAuth = require ('../middlewares/userAuth');
const pageSchema = require('../validation/pageValidation');
const validate = require('../utils/joi');
const advancedControllers = require('../controllers/advancedControllers');


router.get('/dashboard-movies',userAuth,advancedControllers.dashboard_top_5_movies_ticket_based);

router.get('/plateform-revenue',userAuth,validate(pageSchema,'query'),advancedControllers.monthly_total_revenue_of_plateform);

router.get('/shows-booked',userAuth,validate(pageSchema,'query'),advancedControllers.shows_booked_90_or_more);

router.get('/users-bookings',userAuth,validate(pageSchema,'query'),advancedControllers.users_booked_3_more_tickets);

router.get('/theater-revenue',userAuth,validate(pageSchema,'query'),advancedControllers.theaters_revenue);

router.get('/most-prefered-seat',userAuth,advancedControllers.most_prefered_seat);

router.get('/average-ratings',userAuth,validate(pageSchema,'query'),advancedControllers.average_rating_movie_above_4_and_100_reviews);

router.get('/peak-booking-hours',userAuth,advancedControllers.peak_booking_hours);

router.get('/users-cancelled-bookings',userAuth,validate(pageSchema,'query'),advancedControllers.users_cancelled_bookings_more_than_2);

router.get('/city-revenue',userAuth,validate(pageSchema,'query'),advancedControllers.city_revenue_highest_income);

module.exports = router;