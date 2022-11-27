const {Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../config.js').packing;

module.exports = {
    UserLogin
}

class UserLogin extends Model {
    // insert class methods if necessary
}

UserLogin.init({
  username: {
    type: DataTypes.STRING,
    primaryKey : true,
  },
  pwd: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db, 
  modelName: 'UserLogin', 
  tableName: 'UserLogin',
  timestamps:false
});