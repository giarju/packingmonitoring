modbus_tcp = require(__dirname + "/modbus_tcp.js");
config = require(__dirname + "/config.json");
const packinginfo = require("../../database/schema/PackingInfo.js").PackingInfo;
const summary = require("../../database/schema/Summary.js").Summary;
// const rejectinfo = require("../../database/schema/RejectInfo.js").RejectInfo;
// const downtime = require(__dirname + '/schema/Downtime.js').Downtime

module.exports = {
  commit,
  init
};

async function commit() {
  return new Promise((resolve, reject) => {
    modbus_tcp
      .readAllPacking()
      .then(async result => {
        try {
          // console.log(result);

        //   get prev data
          previnfo = await packinginfo.findAll({
            where: {
              status: 0
            },
            order: [["packing_name", "ASC"]]
          });

          // change prev reference to status 1
          await packinginfo.update(
            { status: 1 },
            {
              where: {
                status: 0
              }
            }
          );

          let packinginfo_arr = [];
          let packinginfo_obj = {};
          let summary_arr = [];
          let summary_obj = {};

          packing_name = config.packing_name;
          for (let packing in packing_name) {
            packinginfo_obj["packing_name"] = packing_name[packing];
            packinginfo_obj["status"] = 0;
            packinginfo_obj["total_count"] =
              result[packing_name[packing]]["report"]["total_units_lifetime"];
            packinginfo_obj["total_weight"] =
              result[packing_name[packing]]["report"]["total_weight_lifetime"];
            packinginfo_arr[packing] = packinginfo_obj;

            summary_obj["packing_name"] = packing_name[packing];
            summary_obj["count"] =
              packinginfo_obj["total_count"] - previnfo[packing]["total_count"];
            summary_obj["weight"] =
              packinginfo_obj["total_weight"] -
              previnfo[packing]["total_weight"];
            summary_arr[packing] = summary_obj;
          }

          console.log("packing");
          console.log(packinginfo_arr);
          console.log(summary_arr);

          // communicate with database
          await packinginfo.bulkCreate(packinginfo_arr, { validate: true });
          await summary.bulkCreate(summary_arr, { validate: true });

          resolve('success');

        } catch (e) {
          console.log(e);
          reject(e)
        }
      })
      .catch(error => {
        console.log(error);
        reject(error)
      });
  });
}

async function init() {
    return new Promise((resolve, reject) => {
      modbus_tcp
        .readAllPacking()
        .then(async result => {
          try {
            // console.log(result);
  
            let packinginfo_arr = [];
            let packinginfo_obj = {};
  
            packing_name = config.packing_name;
            for (let packing in packing_name) {
              packinginfo_obj["packing_name"] = packing_name[packing];
              packinginfo_obj["status"] = 0;
              packinginfo_obj["total_count"] =
                result[packing_name[packing]]["report"]["total_units_lifetime"];
              packinginfo_obj["total_weight"] =
                result[packing_name[packing]]["report"]["total_weight_lifetime"];
              packinginfo_arr[packing] = packinginfo_obj;
            }
  
            console.log("packing");
            console.log(packinginfo_arr);
  
            // communicate with database
            await packinginfo.bulkCreate(packinginfo_arr, { validate: true });
  
            resolve('success');
  
          } catch (e) {
            console.log(e);
            reject(e)
          }
        })
        .catch(error => {
          console.log(error);
          reject(error)
        });
    });
  }