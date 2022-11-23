var express = require('express');
app = express();
const router = express.Router();
const authMiddleware =require('../app/middlewares/auth.middleware')
const cartRoute = require('../app/controllers/cart.controller');

router.get('/me/:id',authMiddleware.verifyTokenAndUserAuthorization,cartRoute.getUserCart);
router.post('/me/:id',authMiddleware.verifyTokenAndUserAuthorization,cartRoute.addToCart);
router.put('/me/:id',/*authMiddleware.verifyTokenAndUserAuthorization,*/cartRoute.updateCart);
router.delete('/me/:id',/*authMiddleware.verifyTokenAndUserAuthorization,*/cartRoute.deleteCart);

module.exports = router;
