const Joi = require('joi');

const theaterSchema = Joi.object({
  city_id: Joi.number()
    .integer()
    .required(),

  name: Joi.string()
    .min(3)
    .max(255)
    .required(),

  address: Joi.string()
    .min(5)
    .max(255)
    .required(),

  owner_id: Joi.number()
    .integer()
    .required(),

  opening_time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required(),

  closing_time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required(),

  holiday: Joi.string()
    .max(255)
    .optional(),

  status: Joi.string()
    .valid('active', 'inactive')
    .default('active')
});


module.exports = theaterSchema;