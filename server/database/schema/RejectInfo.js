const {Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../config.js').packing;

class RejectInfo extends Model {
    // insert class methods if necessary
}

RejectInfo.init({
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
  count: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull:false,
  }
}, {
  // Other model options go here
  sequelize: db, // We need to pass the connection instance
  modelName: 'RejectInfo', // We need to choose the model name
  tableName: 'RejectInfo'
});

module.exports = {
  RejectInfo
}