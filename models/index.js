const sequelize = require('../config/db.js');

const initModels = require('./init-models.js');

const models = initModels(sequelize);

module.exports = {models,sequelize};