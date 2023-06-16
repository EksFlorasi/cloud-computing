const { Sequelize } = require('sequelize');

const { initModels } = require('../models/init-model');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

initModels(sequelize);

// sequelize.sync({ force: true });
// console.log("All models were synchronized successfully.");

module.exports = sequelize;
