const express = require("express");
const bodyParser = require("body-parser");
const db = require("../../config/db_config");
const { QueryTypes } = require('sequelize');

const router = express.Router();
const jsonParser = bodyParser.json();


// fetch material table
// will receive code from qr code
// search the recipe code with the matching qrcode from the database
// get the material list with the matching recipecode from database
router.get("/", async (req, res) => {
  let qrcode = req.query.qrcode;

  db.query(`SELECT ha_order.id, ha_order.order_date, ha_order.po_code, 
    ha_order.feed_code, ha_order.priority_num, ha_order.batch,  
    ha_order.material, ha_order.target_weight, ha_order.actual_weight, 
    ha_order.status_now, ha_order.checklist, 
    setting.tolerance, setting.station  
    FROM ha_order  
    LEFT JOIN setting ON setting.material = ha_order.material  
    WHERE ha_order.po_code=${qrcode}`, { raw: true, type: QueryTypes.SELECT })
    .then(results => { 
      res.send(results)
    }) 
    .catch((err) => console.log(err));
  
});

router.get("/code", async (req, res) => { 

  db.query(`SELECT DISTINCT po_code FROM ha_order WHERE status_now = 1`, { raw: true, type: QueryTypes.SELECT })
    .then(results => { 
      res.send(results)
    })
    .catch((err) => console.log(err));
  
});

router.put("/update", jsonParser, async (req, res) => {
    req.body.data.forEach(entry => {
        db.query(`UPDATE ha_order SET actual_weight = ${entry.actual_weight}, status_now = 2 WHERE id=${entry.id}`, { raw: true, type: QueryTypes.UPDATE })
        .then(() => { 
            res.status(200).send()
        })
        .catch((err) => console.log(err));
    })
  
  
});

// stream weight
 
// functions to get data from database

module.exports = router;
