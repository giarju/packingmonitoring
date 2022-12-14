const express = require("express");
// const bodyParser = require('body-parser');
const packinginfo = require('../database/schema/PackingInfo.js').PackingInfo
const packinghist = require('../database/schema/PackingHist.js').PackingHist
const summary = require('../database/schema/Summary.js').Summary
// const rejectinfo = require('../database/schema/RejectInfo.js').RejectInfo
// const downtime = require('../database/schema/Downtime.js').Downtime
const speedac_modbus = require('../running/speedaciq/modbus_tcp.js')
const config = require("../running/speedaciq/config.json")
const packingdb_op = require("../running/speedaciq/db_op.js")
const { Op } = require("sequelize");
let packing_daq = require('./../running/speedaciq/daq.js')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()



const router = express.Router();
// const jsonParser = bodyParser.json()

router.post("/start_packing", jsonParser, async (req, res) => {
  // call a function to set interval and start logging

  packing_daq.count_interval[req.body.packing_name] = {};

  await packing_daq.initGetCount(req.body.packing_name)
  await packing_daq.readCountInterval(req.body.packing_name, packing_daq.count_interval);
  res.status(201).send();
});


router.post("/stop_packing", async (req, res) => {
  // call function to clear interval and stop logging data a specific packing

  await packing_daq.clearCountInterval(req.body.packing_name, packing_daq.count_interval);
  await packing_daq.saveCount(req.body.packing_name);
  res.status(201).send();
});

router.get("/test", async (req,res) => {
  res.status(201).send();
})

/*
router.get("/report", async (req, res) => {
  // console.log(req)
  const summ = await summary.findAll({
    where: {
      createdAt: {
        [Op.between]: [req.query.date[0], req.query.date[1]]
      }
    },
    order : [
      ['createdAt', 'DESC']
    ]
  });
  // console.log(JSON.stringify(summ, null, 2));

  res.status(200).send({ 
    success: true,
    items: JSON.stringify(summ, null, 2),
    table_options: ["Weight Report"],
    num_options: [
      { text: "1", value: 'packing1' },
      { text: "2", value: 'packing2' },
      { text: "3", value: 'packing3' },
      { text: "4", value: 'packing4' }
    ],
    code: 20000
  })
});

router.get("/uncommited", async (req, res) => {
  const info = await packinginfo.findAll({
    attributes: [
      'packing_name',
      'total_count',
      'total_weight',
    ],
    where: {
      status : 0
    },
    order:[
      ['packing_name','ASC']
    ],
    raw : true
  });

  speedac_modbus.readAllPacking()
  .then((result) => {
    packing_name = ['packing4'];
    curr_data = [];
    data_obj = {}
    // curr_units = {};
    // curr_weight = {};
    for (packing in packing_name){
      // console.log(result[packing_name[packing]]['report']['total_units_lifetime'])
      data_obj['id'] = Number(packing)+1;
      data_obj['packing_name'] = packing_name[packing];
      data_obj['units'] = 
        result[packing_name[packing]]['report']['total_units_lifetime'] - info[packing]['total_count'];
      data_obj['weight'] = 
        result[packing_name[packing]]['report']['total_weight_lifetime'] - info[packing]['total_weight']; 
      curr_data[packing] = data_obj;
    }

    console.log(curr_data)
    
    res.status(200).send({ 
      success: true,
      items: curr_data,
      code: 20000
    })  
  })
  .catch((err)=>{
    console.log(err)
    res.status(400).send({ 
      success: false,
      code: 40000
    })  
  })
});

router.get("/commit", async (req, res) => {
  packingdb_op.commit()
  .then(() =>{
    res.status(200).send({ 
      success: true,
      code: 20000
    }) 
  })
  .catch(() => {
    res.status(400).send({ 
      success: false,
      code: 40000
    }) 
  })
})

// router.get("/reject", async (req, res) => {
//   const packing_info = await rejectinfo.findAll();
//   // console.log(JSON.stringify(packing_info, null, 2));
//   // ctx.body = { // ????????????
//   //   success: true,
//   //   data: JSON.stringify(packing_info, null, 2),
//   //   code: 20000 // ??????20000???????????????
//   // }
//   res.status(200).send({ // ????????????
//     success: true,
//     data: JSON.stringify(packing_info, null, 2),
//     code: 20000 // ??????20000???????????????
//   })
// });

router.get("/live", async (req, res) => {
  speedac_modbus.readAllLive()
  .then((result) => {
    res.status(200).send({ 
      success: true,
      packing_name : config.packing_name,
      seriesdata: JSON.stringify(result, null, 2),
      code: 20000
    })  
  })
  .catch((err)=>{
    console.log(err)
    res.status(400).send({ 
      success: false,
      code: 40000
    })  
  })
  // console.log(JSON.stringify(packing_info, null, 2)); 
});
*/
module.exports = router;
