const {Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../config.js').packing;

class PackingInfo extends Model {
    // insert class methods if necessary
}

PackingInfo.init({
  // Model attributes are defined here
  packing_id: {
    type: DataTypes.INTEGER,
    primaryKey : true,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  start_count: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  end_count: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type : DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type : DataTypes.DATE,
    allowNull: true
  },
}, {
  // Other model options go here
  sequelize: db, // We need to pass the connection instance
  modelName: 'PackingInfo', // We need to choose the model name
  tableName: 'PackingInfo'
});

module.exports = {
    PackingInfo
}