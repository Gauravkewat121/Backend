const Joi = require('joi');

const seatSchema = Joi.object({

 silver: Joi.number(),
 gold: Joi.number(),
  platinum:Joi.number(),
  platinum_price:Joi.number(),
  silver_price:Joi.number(),

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