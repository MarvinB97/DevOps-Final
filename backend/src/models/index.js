const Sequelize = require('sequelize');
const Pokemon = require('./Pokemon');
const User = require('./User');
const sequelize = require('../config/sequelize');

const db = {
  sequelize,
  Sequelize,
  User,
  Pokemon,
};

module.exports = db;
