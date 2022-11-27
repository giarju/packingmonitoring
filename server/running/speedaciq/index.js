modbus_tcp = require(__dirname + "/modbus_tcp.js");
config = require(__dirname + "/config.json");
db_op = require(__dirname + '/db_op.js')
// const packinginfo = require("../../database/schema/PackingInfo.js").PackingInfo;
// const rejectinfo = require("../../database/schema/RejectInfo.js").RejectInfo;
// const downtime = require(__dirname + '/schema/Downtime.js').Downtime

// console.log("index in");
// console.log();

// // function timeoutPromise(interval) {
// //     return new Promise((resolve, reject) => {
// //         setTimeout(function(){
// //         resolve("done");
// //         }, interval);
// //     });
// // };

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
    modbus_tcp.readDataStream('packing4')
    console.log('done')
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
