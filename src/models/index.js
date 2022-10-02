'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL;
const Collection = require('./Collection.js');
const foodSchema = require('./food.js');

let sequelize = new Sequelize(DATABASE_URL);

const FoodModel = foodSchema(sequelize, DataTypes);

module.exports = {
  Food: new Collection(FoodModel),
  db: sequelize,
};
