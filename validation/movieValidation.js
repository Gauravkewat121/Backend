const Joi = require('joi');

const movieSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(255)
    .required(),

  language: Joi.string()
    .min(2)
    .max(255)
    .required(),

  name: Joi.string()
    .min(2)
    .max(255)
    .required(),

  genre: Joi.string()
    .min(2)
    .max(255)
    .required(),

  duration_time: Joi.number()
    .integer()
    .min(1)
    .required(),

  release_date: Joi.date()
    .required(),

  description: Joi.string()
    .max(2000)
    .required()
});

module.exports = movieSchema;