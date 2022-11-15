var express = require('express');
app = express();
const router = express.Router();

const cartRoute = require('../app/controllers/cart.controller');

router.get('/:id',cartRoute.index);
router.post('/:id',cartRoute.addToCart);
router.put('/:id',cartRoute.updateCart);
router.delete('/:id',cartRoute.deleteCart);

module.exports = router;
