var express = require('express');
app= express();
const router = express.Router();
const path = require('path');

const productRoute= require('../app/controllers/product.controller');

router.get('/',productRoute.index);
router.post('/',productRoute.create);
router.get('/:slug',productRoute.detail);
router.delete('/:slug',productRoute.delete);
module.exports = router;