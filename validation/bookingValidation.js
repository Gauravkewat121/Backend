const Joi = require('joi');
const paymentSchema = require('./paymentValidation');
const bookingSchema = Joi.object({

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

  status: Joi.string()
    .valid('booked', 'wait-list', 'cancelled')
    ,
    paymentDetails: paymentSchema
});

module.exports = bookingSchema;