const express = require("express");
const bodyParser = require('body-parser');
const db = require("../../config/db_config");
const { QueryTypes } = require('sequelize');
const QRCode = require('qrcode');
const pdf = require("pdf-creator-node");
const fs = require("fs");

const router = express.Router();
const jsonParser = bodyParser.json()

async function createQR(po_code,batch_num) {
    return new Promise((resolve, reject) => {
        let batch = [];
        let url = [];
        if (batch_num > 0) {
            for (let index = 0; index < batch_num; index++) {
                url.push(QRCode.toDataURL(`${po_code};${index+1}`))
            }
            Promise.all(url)
                .then(result => {
                    result.forEach((element, index) => {
                        batch.push({  
                            po_code: po_code,
                            num: index+1,  
                            img: `${element}`  
                        })
                    });
                    resolve(batch)
                })
                .catch(err => console.log(err))
        }else
            reject("error");
    });
}

router.post("/", jsonParser, async (req, res) => {
    let batch = [];

    createQR(req.body.po_code, req.body.batch_num)
        .then(data =>{
            batch = data;
            
            let html = fs.readFileSync(__dirname + "/template.html", "utf8");
            let options = {
                height:"4.1in",
                width:"5.8in",
                orientation: "landscape",
                border: "7mm", 
            };
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            let document = {
                html: html, 
                data: {
                    batch:batch
                },
                path: `./log/${dd}_${mm}_${yyyy}_${req.body.po_code}.pdf`,
                type: "",
            };
  
            pdf.create(document, options)
                .then((path) => {
                    console.log(path);
                    res.status(200).send();
                })
                .catch((error) => { 
                    console.error(error);
                    res.status(500).send();
                }); 
        })
        .catch(err => console.log(err));
});



module.exports = router;
