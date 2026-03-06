const Joi = require('joi');

const seatSchema = Joi.object({
  screen_id: Joi.number()
    .integer()
    .required(),

  seat_number: Joi.string()
    .min(1)
    .max(20)
    .required(),

  price: Joi.number()
    .positive()
    .required(),

  seat_type: Joi.string()
    .min(3)
    .max(20)
    .required()
});

module.exports = seatSchema;