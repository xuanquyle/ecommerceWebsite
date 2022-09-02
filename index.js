const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');

var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(morgan('combined'));


var db= require('./src/config/db');
db.connect();



const routes = require('./src/routes');
routes(app);
  

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  });