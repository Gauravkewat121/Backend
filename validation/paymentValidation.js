const Joi = require('joi');

const paymentSchema = Joi.object({
  payment_method: Joi.string().valid('UPI',"Netbanking",'Bhim-UPI').required(),
  payment_status: Joi.string().valid('success','failed','pending').required()
});

module.exports = paymentSchema;

