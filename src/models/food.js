'use strict';

const foodSchema = (sequelize, DataTypes) => sequelize.define(
  'Food',
  {
    foodName: {
      type: DataTypes.STRING,
    },
  },
);

module.exports = foodSchema;
