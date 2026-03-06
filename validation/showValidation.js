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
    .pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]) ([01]?\d|2[0-3]):[0-5]\d$/)
    .required()  // "2026-04-01 18:00"
});


const showUpdate = Joi.object({
     movie_id: Joi.number()
    .integer(),

  theater_id: Joi.number()
    .integer(),

  screen_id: Joi.number()
    .integer(),

  price: Joi.number()
    .precision(0)
    .positive(),

  start_time: Joi.string()
    .pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]) ([01]?\d|2[0-3]):[0-5]\d$/)  // "2026-04-01 18:00"
});


module.exports = {showSchema,showUpdate};