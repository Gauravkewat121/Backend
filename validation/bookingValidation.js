const Joi = require('joi');

const bookingSchema = Joi.object({
  user_id: Joi.number()
    .integer()
    .positive()
    .required(),

  seat_id: Joi.number()
    .integer()
    .positive()
    .required(),

  MT_id: Joi.number()
    .integer()
    .positive()
    .required(),

  total_amount: Joi.number()
    .precision(2)
    .positive()
    .required(),

  booking_time: Joi.date()
    .required(),

  status: Joi.string()
    .valid('booked', 'wait-list', 'cancelled')
    .required()
});

module.exports = bookingSchema;