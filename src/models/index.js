'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory:';
const foodSchema = require('./food.js');

let herokuOptions = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

let sequelize = new Sequelize(DATABASE_URL, process.env === 'production' ? herokuOptions : {});

let FoodModel = foodSchema(sequelize, DataTypes);

module.exports = {
  Food: FoodModel,
  db: sequelize,
};
