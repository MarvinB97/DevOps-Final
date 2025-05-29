const Sequelize = require('sequelize');
const User = require('./User');
const sequelize = require('../config/sequelize');

const db = {
  sequelize,
  Sequelize,
  User,
};

module.exports = db;
