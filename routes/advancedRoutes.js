const router = require('express').Router();
const userAuth = require ('../middlewares/userAuth');
const advancedControllers = require('../controllers/advancedControllers');


router.get('/dashboard-movies',userAuth,advancedControllers.dashboard_top_5_movies_ticket_based);

router.get('/plateform-revenue',userAuth,advancedControllers.monthly_total_revenue_of_plateform);

router.get('/shows-booked',userAuth,advancedControllers.shows_booked_90_or_more);

router.get('/users-bookings',userAuth,advancedControllers.users_booked_3_more_tickets);

router.get('/theater-revenue',userAuth,advancedControllers.theaters_revenue);

router.get('/most-prefered-seat',userAuth,advancedControllers.most_prefered_seat);

router.get('/average-ratings',userAuth,advancedControllers.average_rating_movie_above_4_and_100_reviews);

router.get('/peak-booking-hours',userAuth,advancedControllers.peak_booking_hours);

router.get('/users-cancelled-bookings',userAuth,advancedControllers.users_cancelled_bookings_more_than_2);

router.get('/city-revenue',userAuth,advancedControllers.city_revenue_highest_income);

module.exports = router;