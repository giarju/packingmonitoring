const db = require(__dirname + '/config.js').packing;
const packinginfo = require(__dirname + '/schema/PackingInfo.js').PackingInfo
const rejectinfo = require(__dirname + '/schema/RejectInfo.js').RejectInfo
const downtime = require(__dirname + '/schema/Downtime.js').Downtime
const summary = require(__dirname + '/schema/Summary.js').Summary


db.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error: ' + err)) 

// packinginfo.sync({alter : true});

// db.sync({ alter: true });

// async function main(){
//     const info = await packinginfo.findAll();
//     console.log(JSON.stringify(info, null, 2));
// }

// main()
