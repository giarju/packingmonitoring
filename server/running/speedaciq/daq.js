modbus_tcp = require(__dirname + "/modbus_tcp.js");
config = require(__dirname + "/config.json");
db_op = require(__dirname + '/db_op.js')
const packinginfo = require("../../database/schema/PackingInfo.js").PackingInfo;
const packinghist = require("../../database/schema/PackingHist.js").PackingHist;
// const rejectinfo = require("../../database/schema/RejectInfo.js").RejectInfo;
// const downtime = require(__dirname + '/schema/Downtime.js').Downtime
let count_interval = {};


module.exports = {
    initGetCount,
    readCountInterval,
    clearCountInterval,
    saveCount,
    count_interval
};


async function main () {
    // await db_op.commit();
    // await db_op.init();
    // setInterval(
    //     modbus_tcp.readData('packing4', (err,res) => {
    //         if (err) throw err;

    //         console.log(res)
    //     })
    // ,1000)
    // modbus_tcp.readDataStream('packing4', (err,res) => {
    //     if (err) throw err;

    //     console.log('out')
    //     console.log(res)
    // })

    // modbus_tcp.readDataStream('packing4')
    
    // console.log('start')
    // await initGetCount("packing4")
    // let count_interval = {};
    // count_interval["packing4"] = {};
    // await readCountInterval("packing4", count_interval);
    // await clearCountInterval("packing4", count_interval);
    // await saveCount("packing4");
    // console.log('done');
}

async function initGetCount(packing) {
    let page_name = "report"

    modbus_tcp
    .readPacking(packing,page_name)
    .then(async result => {
        try {
        result = {
            "packing4" : {
                "report" : {
                    "total_units_lifetime" : 900
                }
            }
        }
        console.log(result);
        
        let packinginfo_obj = {};

        packinginfo_obj["packing_id"] = packing;
        packinginfo_obj["total_count"] =
        result[packing]["report"]["total_units_lifetime"];

        // communicate with database       
        await packinginfo.upsert({
            packing_id : packinginfo_obj["packing_id"],
            start_time : new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
            end_time : new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
            start_count: packinginfo_obj["total_count"],
            end_count: packinginfo_obj["total_count"]
        },
        {
            silent : true
        });

        } catch (e) {
        console.log(e);
        }
    })
    .catch(error => {
        console.log(error);
    });
    }

async function readCountInterval (packing, count_interval) {
    let page_name = "report";

    count_interval[packing] = setInterval(() => {
        modbus_tcp
        .readPacking(packing,page_name)
        .then(async result => {
            try {
            result = {
                "packing4" : {
                    "report" : {
                        "total_units_lifetime" : 1000
                    }
                }
            }
            console.log(result);
            
            let packinginfo_obj = {};

            packinginfo_obj["packing_id"] = packing;
            packinginfo_obj["total_count"] =
            result[packing]["report"]["total_units_lifetime"];

            // communicate with database       
            await packinginfo.update({
                end_time : new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
                end_count: packinginfo_obj["total_count"]
            },
            {
                where: {
                    packing_id: packinginfo_obj["packing_id"]
                },
                silent : true
            });

            } catch (e) {
            console.log(e);
            }
    })
    .catch(error => {
        console.log(error);
    });

    }, 10000);
    
}

async function saveCount(packing) {
    // read from running data
    let res = await packinginfo.findAll({
        where: {
            packing_id: packing
        },
        raw: true
    })
    console.log(res[0]['packing_id']);

    // save to historical database
    await packinghist.create({
        packing_id : res[0]['packing_id'],
        start_time : res[0]['start_time'],
        end_time : res[0]['end_time'],
        start_count: res[0]['start_count'],
        end_count: res[0]['end_count'],
        total_bag: res[0]['end_count'] - res[0]['start_count']
    },
    {
        silent : true
    });

    // destroy running data
    await packinginfo.destroy({
        where: {
            packing_id: packing
        },
        raw: true
    })
}

async function clearCountInterval (packing, count_interval) {
    clearInterval(count_interval[packing]);

}

main();

// // periodically poll SpeedAC IQ for data
// setInterval(() => {
//   modbus_tcp
//     .readAllPacking()
//     .then(async result => {
//       try {
//         console.log(result);

//         let packinginfo_arr = [];
//         let rejectinfo_arr = [];

//         let packinginfo_obj = {};
//         let rejectinfo_obj = {};
//         let rejectinfo_obj2 = {};
//         let reject_index = 0;
//         let any_reject = false;

//         packing_name = config.packing_name;
//         for (let packing in packing_name) {
//           packinginfo_obj["packing_num"] = packing_name[packing];
//           packinginfo_obj["total_count"] =
//             result[packing_name[packing]]["report"]["total_units_lifetime"];
//           packinginfo_obj["total_weight"] =
//             result[packing_name[packing]]["report"]["total_weight_lifetime"];
//           packinginfo_arr[packing] = packinginfo_obj;

//           if (
//             /*result[packing_name[packing]]['report']['underweight'] > 0*/ true
//           ) {
//             rejectinfo_obj["packing_num"] = packing_name[packing];
//             rejectinfo_obj["count"] =
//               result[packing_name[packing]]["report"]["underweight"];
//             rejectinfo_obj["username"] = "auto";
//             rejectinfo_obj["reason"] = "underweight";
//             rejectinfo_arr[reject_index] = rejectinfo_obj;
//             reject_index += 1;
//             any_reject = true;
//           }

//           if (
//             /*result[packing_name[packing]]['report']['overweight'] > 0*/ true
//           ) {
//             rejectinfo_obj2["packing_num"] = packing_name[packing];
//             rejectinfo_obj2["count"] =
//               result[packing_name[packing]]["report"]["overweight"];
//             rejectinfo_obj2["username"] = "auto";
//             rejectinfo_obj2["reason"] = "overweight";
//             rejectinfo_arr[reject_index] = rejectinfo_obj2;
//             reject_index += 1;
//             any_reject = true;
//           }
//         }

//         console.log("packing");
//         console.log(packinginfo_arr);
//         console.log("reject");
//         console.log(rejectinfo_arr);

//         // communicate with database
//         let packinginfo_db_check = new Array(packinginfo_arr.length);
//         for (let packing in packinginfo_arr) {
//           packinginfo_obj = packinginfo_arr[packing];

//           packinginfo_db_check[packing] = await packinginfo.update(
//             {
//               total_count: packinginfo_obj["total_count"],
//               total_weight: packinginfo_obj["total_weight"]
//             },
//             {
//               where: {
//                 [Op.and]: [
//                   { packing_num: packinginfo_obj["packing_num"] },
//                   { accepted: 0 }
//                 ]
//               }
//             }
//           );
//         }
//         let rejectinfo_db_check = new Array(rejectinfo_arr.length);
//         for (let reject in rejectinfo_arr) {
//             rejectinfo_obj = rejectinfo_arr[reject];
  
//             rejectinfo_db_check[packing] = await rejectinfo.update(
//               {
//                 total_count: rejectinfo_obj["total_count"],
//                 total_weight: rejectinfo_obj["total_weight"]
//               },
//               {
//                 where: {
//                   [Op.and]: [
//                     { packing_num: packinginfo_obj["packing_num"] },
//                     { accepted: 0 }
//                   ]
//                 }
//               }
//             );
//           }

//         await packinginfo.bulkCreate(packinginfo_arr, { validate: true });
//         if (any_reject) {
//           await rejectinfo.bulkCreate(rejectinfo_arr, { validate: true });
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }, 10000);
