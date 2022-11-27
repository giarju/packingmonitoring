const {Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../config.js').packing;

class Summary extends Model {
    // insert class methods if necessary
}

Summary.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true,
  },
  packing_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
}, {
  // Other model options go here
  sequelize: db, // We need to pass the connection instance
  modelName: 'Summary', // We need to choose the model name
  tableName: 'Summary'
});

module.exports = {
    Summary
}