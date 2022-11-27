const express = require("express");
const bodyParser = require('body-parser');
const db = require("../../config/db_config");
const { QueryTypes } = require('sequelize');

const router = express.Router();
const jsonParser = bodyParser.json()

router.get("/", async (req, res) => {

  db.query(
    `SELECT * FROM setting`,
    { raw: true, type: QueryTypes.SELECT })
    .then(results => { 
      res.send(results)
    })
    .catch((err) => console.log(err));
  
});
router.put("/", jsonParser, async (req, res) => {
  req.body.data.forEach(entry => {
    db.query(`UPDATE setting SET tolerance = ${entry.tolerance}, station = ${entry.station} WHERE id=${entry.id}`, { raw: true, type: QueryTypes.UPDATE })
    .then(() => { 
        res.status(200).send()
    })
    .catch((err) => console.log(err));
  }) 
});



module.exports = router;
