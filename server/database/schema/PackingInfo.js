const {Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../config.js').packing;

class PackingInfo extends Model {
    // insert class methods if necessary
}

PackingInfo.init({
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
  status:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_count: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_weight: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize: db, // We need to pass the connection instance
  modelName: 'PackingInfo', // We need to choose the model name
  tableName: 'PackingInfo'
});

module.exports = {
    PackingInfo
}