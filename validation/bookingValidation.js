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

    paymentDetails: paymentSchema
});

module.exports = bookingSchema;