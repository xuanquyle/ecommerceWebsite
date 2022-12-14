const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
var cookieParser = require('cookie-parser')
require('express-async-errors');

app.use(cookieParser())
const dotenv = require('dotenv');
dotenv.config();



var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

//------Method override
var methodOverride = require('method-override')
app.use(methodOverride('_method'));

//--------view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/app/views'))

//------ static folder
app.use("/public", express.static(__dirname + '/src/public'));


//----------bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ------------------

app.use(morgan('combined'));

//call connect db
var db = require('./src/config/db');
db.connect();

//--------call route
const routes = require('./src/routes');
routes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
