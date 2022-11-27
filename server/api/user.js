const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require("../../config/db_config");
const { QueryTypes } = require('sequelize');

const router = express.Router();
const jsonParser = bodyParser.json()

router.post("/register", jsonParser, async (req, res) => {
  // const { user,...data } = req.body
  // console.log("hello register " + `${user}`);

  db.query(`SELECT TOP 1 * FROM user_list WHERE username='${req.body.user}' `, { raw: true, type: QueryTypes.SELECT })
    .then(results => { 
      if (results.length > 0 ){
        console.log('username sudah ada')
      }
      else {
        bcrypt.genSalt(8, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;

            db.query(
              `INSERT INTO user_list(
                username,
                job,
                pass
              )
              VALUES
                ('${req.body.user}', ${req.body.job}, '${hash}')` 
              , { raw: true, type: QueryTypes.INSERT }
            )
            .then(results => { 
              res.status(201).send();
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send()
            })
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

router.post('/login', jsonParser, (req, res) => {
  db.query(`SELECT TOP 1 * FROM user_list WHERE username='${req.body.user}' `, { raw: true, type: QueryTypes.SELECT })
    .then(results => { 
      if (results.length <= 0 ){
        // console.log('username tidak ditemukan')
        // if (err) return res.status(500).send('Error on the server.');
        res.status(404).send('username tidak ditemukan'); 
      }
      else{
        let password_valid = bcrypt.compareSync(req.body.password, results[0].pass);
        if (!password_valid){
          // console.log('not valid')
          res.status(401).send({ auth: false, token: null });
        }
        else{
          // console.log('valid')
          let token = jwt.sign({ id: req.body.user }, 'pass', {expiresIn : '1d'});
          res.status(200).send({ auth: true, token: token, job: results[0].job });
        }
      }
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router;