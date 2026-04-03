const Joi = require('joi');

const paymentSchema = Joi.object({
  payment_method: Joi.string().valid('UPI',"Netbanking",'Bhim-UPI').required()
});

module.exports = paymentSchema;

