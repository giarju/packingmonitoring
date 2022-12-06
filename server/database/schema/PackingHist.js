const {Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../config.js').packing;

class PackingHist extends Model {
    // insert class methods if necessary
}

PackingHist.init({
  // Model attributes are defined here
  num: {
    type: DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true,
  },
  packing_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  total_bag: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type : DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type : DataTypes.DATE,
    allowNull: true
  }
}, {
  // Other model options go here
  sequelize: db, // We need to pass the connection instance
  modelName: 'PackingHist', // We need to choose the model name
  tableName: 'PackingHist'
});

module.exports = {
    PackingHist
}