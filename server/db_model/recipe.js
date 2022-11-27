const Sequelize = require('sequelize');
const db = require('../config/db_config');

const recipe = db.define('recipe', { 
    recipe_code: {
      type: Sequelize.STRING
    },
    materialA: {
      type: Sequelize.FLOAT
    },
    materialB: {
      type: Sequelize.FLOAT
    },
    materialC: {
      type: Sequelize.FLOAT
    },
    materialD: {
      type: Sequelize.FLOAT
    },
    materialE: {
      type: Sequelize.FLOAT
    },
});

recipe.sync().then(() => {
    console.log('table created');
  });
  
module.exports = recipe;