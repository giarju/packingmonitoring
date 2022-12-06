const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// express
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database
const db = require('./database/config').packing;
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err)) 

// routes
app.use('/api/packing', require(__dirname + '/api/packing'));

// server
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started on port ${port}`)); 

// use static folder for all of client webpage
// app.use(express.static(__dirname + '/public/'));
// Handle SPA
// app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));


