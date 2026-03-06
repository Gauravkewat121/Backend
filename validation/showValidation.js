const Joi = require('joi');

const showSchema = Joi.object({
  movie_id: Joi.number()
    .integer()
    .required(),

  theater_id: Joi.number()
    .integer()
    .required(),

  screen_id: Joi.number()
    .integer()
    .required(),

  price: Joi.number()
    .precision(0)
    .positive()
    .required(),

  start_time: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
    .required()  // "2026-04-01 18:00:00"
});

module.exports = showSchema;