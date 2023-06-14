const { Sequelize } = require('sequelize');

const { initModels } = require('../models/init-model');

const URI = process.env.DATABASE_URI_STRING || 'localhost';

const sequelize = new Sequelize('eksflorasi', 'root', '', {
  host: URI,
  dialect: 'mysql',
});

initModels(sequelize);

// sequelize.sync({ force: true });
// console.log("All models were synchronized successfully.");

module.exports = sequelize;
