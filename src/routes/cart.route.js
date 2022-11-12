var express = require('express');
app = express();
const router = express.Router();

const cartRoute = require('../app/controllers/cart.controller');

router.get('/',cartRoute.index);
