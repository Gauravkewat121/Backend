const Joi = require('joi');

const pageSchema = Joi.object({
    pageno: Joi.number()
    .integer()
    .positive()
    .required(),
    limit: Joi.number()
    .integer()
    .positive()
    .required()
});

module.exports = pageSchema;