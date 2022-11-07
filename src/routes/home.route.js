var express = require('express');
app= express();
const router = express.Router();

const homeRoute= require('../app/controllers/home.controller');

router.get('/', homeRoute.index);

module.exports = router;