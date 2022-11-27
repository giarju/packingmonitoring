const modbus = require("modbus-stream");
const fs = require("fs");
const config = require(__dirname + "/config.json")
const comm_param = JSON.parse(
  fs.readFileSync(__dirname + "/speedaciq_comm_param.json", "utf8")
);

// const db = require('../comm/db_comm');
// const { QueryTypes } = require('sequelize');

// module.exports = async function () {
// let fixed = {};

module.exports = {
  readData,
  writeParam,
  getPage,
  readAllPacking,
  readAllLive,
  readDataStream
};

function readData(name, callback) {
  let comm = config.comm;
  let fixed = {};
  // console.log(comm[name].port)
  // console.log(comm[name].ip)
  modbus.tcp.connect(
    comm[name].port,
    comm[name].ip,
    { debug: name },
    (err, connection) => {
      if (err) throw err;

      connection.readHoldingRegisters(
        { address: 0, quantity: 64 },
        (err, res) => {
          if (err) throw err;

          let speedac_resp = res.response.data;

          let page_num = speedac_resp[
            comm_param["live_info"]["command"]["offset"]
          ].readInt16BE();
          page_param = speedac_resp[
            comm_param["live_info"]["parameter"]["offset"]
          ].readInt16BE();
          let page_name = "";

          for (let info in comm_param["cmd"]) {
            // console.log(comm_param["cmd"][info]["number"]);
            // console.log(comm_param["cmd"][info]["param"]);
            if (
              comm_param["cmd"][info]["number"] === page_num &&
              comm_param["cmd"][info]["param"] === page_param
            ) {
              page_name = info;
            }
          }

          for (let page in comm_param) {
            for (let info in comm_param[page]) {
              // if page is not live info or equals to page_num and page_param, skip
              if (page !== page_name && page !== "live_info") break;

              let key = comm_param[page][info];
              // console.log(key)
              if (key["type"] === "int16") {
                fixed[info] = speedac_resp[key["offset"]].readInt16BE();
              } else if (key["type"] === "float32") {
                fixed[info] = Buffer.concat([
                  speedac_resp[key["offset"]],
                  speedac_resp[key["offset"] + 1]
                ]).readFloatBE();
              } else if (key["type"] === "str16") {
                fixed[info] = speedac_resp[key["offset"]].toString();
              }

              // ***WARNING*** check each bit is not implemented
              if (key["states"] !== undefined) {
                fixed[info] = key["states"][fixed[info]];
              }
            }
          }

          // console.log("final");
          // console.log(fixed)

          // PLACEHOLDER FOR ERROR HANDLING (WILL BE CREATED IN THE FUTURE)
          err = null;
          if (err != null) {
            fixed = null;
          }
          callback(err, fixed);
        }
      );
    }
  );
}

function readHoldingWrapper(connection, comm_param){
  console.time('test')
  connection.readHoldingRegisters(
    { address: 0, quantity: 64 },
    (err, res) => {
      if (err) throw err;

      let fixed = {};
      let speedac_resp = res.response.data;

      let page_num = speedac_resp[
        comm_param["live_info"]["command"]["offset"]
      ].readInt16BE();
      page_param = speedac_resp[
        comm_param["live_info"]["parameter"]["offset"]
      ].readInt16BE();
      let page_name = "";

      for (let info in comm_param["cmd"]) {
        // console.log(comm_param["cmd"][info]["number"]);
        // console.log(comm_param["cmd"][info]["param"]);
        if (
          comm_param["cmd"][info]["number"] === page_num &&
          comm_param["cmd"][info]["param"] === page_param
        ) {
          page_name = info;
        }
      }

      for (let page in comm_param) {
        for (let info in comm_param[page]) {
          // if page is not live info or equals to page_num and page_param, skip
          if (page !== page_name && page !== "live_info") break;

          let key = comm_param[page][info];
          // console.log(key)
          if (key["type"] === "int16") {
            fixed[info] = speedac_resp[key["offset"]].readInt16BE();
          } else if (key["type"] === "float32") {
            fixed[info] = Buffer.concat([
              speedac_resp[key["offset"]],
              speedac_resp[key["offset"] + 1]
            ]).readFloatBE();
          } else if (key["type"] === "str16") {
            fixed[info] = speedac_resp[key["offset"]].toString();
          }

          // ***WARNING*** check each bit is not implemented
          if (key["states"] !== undefined) {
            fixed[info] = key["states"][fixed[info]];
          }
        }
      }

      // console.log("final");
      console.log(fixed)
      console.timeEnd('test');

      // PLACEHOLDER FOR ERROR HANDLING (WILL BE CREATED IN THE FUTURE)
      // err = null;
      // if (err != null) {
      //   fixed = null;
      // }
      // callback(err, fixed);
    }
  )
}

function readDataStream(name) {
  let comm = config.comm;
  // let fixed = {};
  // console.log(comm[name].port)
  // console.log(comm[name].ip)
  modbus.tcp.connect(
    comm[name].port,
    comm[name].ip,
    { debug: name },
    (err, connection) => {
      if (err) throw err;

      setInterval(
        readHoldingWrapper
      ,500, connection, comm_param)
    }
  );
}

function writeParam(name, page, callback) {
  let comm = config.comm
  modbus.tcp.connect(
    comm[name].port,
    comm[name].ip,
    { debug: name },
    (err, connection) => {
      if (err) throw err;

      //  write command number
      const cmd = Buffer.allocUnsafe(8);
      cmd.writeFloatBE(comm_param["cmd"][page]["number"], 0);
      cmd.writeFloatBE(comm_param["cmd"][page]["param"], 4);

      let cmdsub = [cmd.subarray(0,2),cmd.subarray(2,4),cmd.subarray(4,6),cmd.subarray(6,8)]

      // console.log(cmdsub)
      // callback(err,cmdsub)

      // cmdsub[0].copy()
      connection.writeMultipleRegisters(
        { address: 0, values: cmdsub },
        (err, res) => {
          if (err) throw err;

          callback(err, res);
        }
      );
    }
  );
}

function getPage (name,page,callback){
  writeParam(name, page, (err,res) =>{
    if (err) throw err;

    // console.log(res)
    readData(name,(err,res) => {
        if (err) throw err;
        
        // console.log(res)
        callback(err,res);
    })
  })
}

function recursePacking(err, res, packing, page_name, i, callback){
  // '/0' is the breaking condition for recursion
  if (packing !== '/0' && page_name[i] !== '/0'){
      getPage(packing, page_name[i],(err, result) => {
          if (err) {
              res[packing][page_name[i]] = 'Error : cannot get page';
          }
          else {
              console.log(`=================== ${packing}_${page_name[i]}  ====================`)
              // console.log(result) 
              res[packing][page_name[i]] = result    
              
              i+=1;
              callback(err,res,packing,page_name,i,callback)
          }
      })
  }
  else {
      // or throw error
      // console.log('done recursion')
  }
}

function readAllPacking(){
  
  // let packing_name = ['packing4']
  // let page_name = ['auto_data', 'report', 'batch', '/0']
  let res = {};
  let packing_name = config.packing_name;
  let page_name = config.page_name
  // let i = 0;
  let j = 0;

  for (let packing in packing_name) {
      res[packing_name[packing]] = {};
  }

  for (let packing in packing_name) {
      console.log(packing_name[packing])
      recursePacking(null,res,packing_name[packing],page_name,j,recursePacking);
      j += 1;
  }

  return new Promise((resolve, reject) => {
      let count = 0;
      let check_interval = setInterval(() => {

          // let packing_check = new Array(packing_name.length).fill(false);
          let done = true;
          for (let packing in packing_name) {
              for (let page in page_name) {
                  if (page_name[page] !== '/0'){
                      if (res[packing_name[packing]][page_name[page]] === undefined){
                          done = false;
                      }
                  } 
              }  
          }

          if (done && count < 10){
              resolve(res);
              clearInterval(check_interval);
          } 
          else if (count > 10){
              reject('Error : Timout Reached');
              clearInterval(check_interval);
          }
          
      }, 1000);
  });
}

function readAllLive(){
  
  // let packing_name = ['packing4']
  // let page_name = ['auto_data', 'report', 'batch', '/0']
  let res = {};
  let packing_name = config.packing_name;
  let page_name = ['report','/0']
  // let i = 0;
  let j = 0;

  for (let packing in packing_name) {
      res[packing_name[packing]] = {};
  }

  for (let packing in packing_name) {
      console.log(packing_name[packing])
      recursePacking(null,res,packing_name[packing],page_name,j,recursePacking);
      j += 1;
  }

  return new Promise((resolve, reject) => {
      let count = 0;
      let check_interval = setInterval(() => {

          // let packing_check = new Array(packing_name.length).fill(false);
          let done = true;
          for (let packing in packing_name) {
              for (let page in page_name) {
                  if (page_name[page] !== '/0'){
                      if (res[packing_name[packing]][page_name[page]] === undefined){
                          done = false;
                      }
                  } 
              }  
          }

          if (done && count < 10){
              resolve(res);
              clearInterval(check_interval);
          } 
          else if (count > 10){
              reject('Error : Timout Reached');
              clearInterval(check_interval);
          }
          
      }, 1000);
  });
}


