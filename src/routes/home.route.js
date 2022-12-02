var express = require('express')
app = express();
const router = express.Router();

const homeController = require('../app/controllers/home.controller')
router.get('/population-products', homeController.getPopulationProduct);

module.exports = router;
