const Sequelize = require('sequelize');

const packing = new Sequelize('packing', 'sa', '123456', {
    host: 'localhost',
    dialect: 'mssql',  
     
    pool: {
      max: 5, 
      min: 0,
      acquire: 30000,  
      idle: 10000    
    },
});

module.exports = {
  packing
};

