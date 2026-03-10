const Joi = require('joi');

const seatSchema = Joi.object({

  silver: Joi.number().integer().positive(),
  gold: Joi.number().integer().positive(),
  platinum:Joi.number().integer().positive(),

  platinum_price:Joi.number().positive(),
  gold_price:Joi.number().positive(),
  silver_price:Joi.number().positive(),

  screen_id: Joi.number()
    .integer(),

  seat_number: Joi.string()
    .min(1)
    .max(20),

  price: Joi.number()
    .positive(),
  seat_type: Joi.string()
    .min(3)
    .max(20),
});

module.exports = seatSchema;