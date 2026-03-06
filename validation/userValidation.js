const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),

  email: Joi.string()
    .email()
    .required(),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),

  password: Joi.string()
    .min(6)
    .max(20)
    .required(),

  role: Joi.string()
    .valid('user', 'vendor')
    .required(),

  dateOfBirth: Joi.date()
    .less('now')
    .required()
});

module.exports = userSchema;