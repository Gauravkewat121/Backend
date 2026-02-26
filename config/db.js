const {Sequelize} = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const connectionUrl = require('./config')[env];

const sequelize = new Sequelize(connectionUrl);

module.exports = sequelize;