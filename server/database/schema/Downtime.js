const {Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../config.js').packing;

class Downtime extends Model {
    // insert class methods if necessary
}

Downtime.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  resolve_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  packing_num: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reason : {
    type : DataTypes.STRING,
    allowNull:false
  }
}, {
  sequelize: db, 
  modelName: 'Downtime', 
  tableName: 'Downtime',
  timestamps:false
});

module.exports = {
    Downtime
}