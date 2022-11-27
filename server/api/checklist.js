const express = require("express");
const bodyParser = require('body-parser');
const db = require("../../config/db_config");
const { QueryTypes } = require('sequelize');

const router = express.Router();
const jsonParser = bodyParser.json()

router.get("/code", async (req, res) => { 

  db.query(`SELECT DISTINCT po_code FROM ha_order WHERE status_now = 2`, { raw: true, type: QueryTypes.SELECT })
    .then(results => { 
      res.send(results)
    })
    .catch((err) => console.log(err));
  
});

router.get("/materials", async (req, res) => {

  db.query(`SELECT * FROM ha_order WHERE status_now = 2 AND po_code=${req.query.code} AND batch=${req.query.batch}`, { raw: true, type: QueryTypes.SELECT })
    .then(results => { 
      res.send(results)
    })
    .catch((err) => console.log(err));
  
});

router.put("/materials", jsonParser, async (req, res) => {
    // req.body.data.forEach(entry => {
    //     db.query(`UPDATE ha_order SET checklist = ${entry.checklist ? 1 : 0}, status_now = 3 WHERE id=${entry.id}`, { raw: true, type: QueryTypes.UPDATE })
    //     .then(results => { 
    //         res.status(200).send()
    //     })
    //     .catch((err) => console.log(err));
    // })
    db.query(`UPDATE ha_order SET checklist = 1, status_now = 3 WHERE po_code='${req.body.data[0].po_code}' AND batch=${req.body.data[0].batch}`, { raw: true, type: QueryTypes.UPDATE })
      .then(results => { 
          res.status(200).send()
      })
      .catch((err) => console.log(err));
  
  
});

module.exports = router;
