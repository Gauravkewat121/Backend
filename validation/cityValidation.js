const Joi = require('joi');

const citySchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(255)
    .required(),

  state: Joi.string()
    .min(2)
    .max(255)
    .required(),

  country: Joi.string()
    .min(2)
    .max(255)
    .required()
});

module.exports = citySchema;