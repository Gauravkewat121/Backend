const Joi = require('joi');

const paymentSchema = Joi.object({
  payment_method: Joi.string().required(),
  transaction_id: Joi.string().required(),
  amount: Joi.number().positive().optional(),
  payment_status: Joi.string().valid('success','failed','pending').required()
});

module.exports = paymentSchema;

