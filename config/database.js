const { Sequelize } = require('sequelize');

const { initModels } = require('../models/init-model');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  dialectOptions: {
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
  },
});

initModels(sequelize);

// Create table using Sequelize
// sequelize.sync({ force: true });
// console.log("All models were synchronized successfully.");

module.exports = sequelize;
