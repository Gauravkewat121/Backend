const Joi = require('joi');

const feedbackSchema = Joi.object({
  user_id: Joi.number()
    .integer()
    .positive(),

  movie_id: Joi.number()
    .integer()
    .positive(),

  rating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required(),

  comment: Joi.string()
    .trim()
    .max(45)
    .optional()
});

module.exports = feedbackSchema;