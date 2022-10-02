'use strict';


const foodSchema = (sequelize, DataTypes) => sequelize.define(
  'Food',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
);

module.exports = foodSchema;
