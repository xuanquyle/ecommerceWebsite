var express = require('express');
app = express();
const router = express.Router();
const authMiddleware =require('../app/middlewares/auth.middleware')
const cartController = require('../app/controllers/cart.controller');

router.get('/me/:id',authMiddleware.verifyTokenAndUserAuthorization,cartController.getUserCart);
router.post('/me/:id',/*authMiddleware.verifyTokenAndUserAuthorization,*/cartController.addToCart);
router.put('/me/:id',/*authMiddleware.verifyTokenAndUserAuthorization,*/cartController.updateCart);
router.delete('/me/:id',/*authMiddleware.verifyTokenAndUserAuthorization,*/cartController.deleteCart);

module.exports = router;
