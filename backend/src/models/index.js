const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const db = {
  sequelize,
  Sequelize,
};

module.exports = db;
