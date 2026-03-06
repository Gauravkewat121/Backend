const Joi = require('joi');

const screenSchema = Joi.object({
  theater_id: Joi.number()
    .integer()
    .required(),

  screen_no: Joi.number()
    .integer()
    .min(1)
    .max(10)
    .required(),

  total_seats: Joi.number()
    .integer()
    .min(10)
    .max(300)
    .required(),

  screen_type: Joi.string()
    .min(2)
    .max(25)
    .required()
});

module.exports = screenSchema;