const Joi = require('joi');

const pageSchema = Joi.object({
    pageno: Joi.number()
    .integer()
    .positive(),
    limit: Joi.number()
    .integer()
    .positive()
});

module.exports = pageSchema;