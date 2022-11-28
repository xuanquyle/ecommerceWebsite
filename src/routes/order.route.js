const express = require('express')
app = express()
const router = express.Router();

const orderRoute = require('../app/controllers/order.controller')
const authMiddleware = require('../app/middlewares/auth.middleware')

router.get('/me/:id', /*authMiddleware.verifyTokenAndUserAuthorization,*/ orderRoute.getUserOrder) // :id => User Id
router.get('/', /*authMiddleware.verifyTokenAndAdmin,*/ orderRoute.getAllOrder)
router.post('/me/:id',/*authMiddleware.verifyTokenAndUserAuthorization,*/ orderRoute.createOrder)
router.put('/:order_id/update-status',/*authMiddleware.verifyTokenAndAdmin,*/ orderRoute.updateStatusOrder) // :id => order id
router.put('/me/:id/confirm-delivery-success/:order_id/',/*authMiddleware.verifyTokenAndUserAuthorization,*/ orderRoute.confirmDeleverySuccess) // :id => order id
router.put('/me/:id/cancel-order/:order_id',/*authMiddleware.verifyTokenAndUserAuthorization,*/ orderRoute.cancelOrder) // :id => order id
router.delete('/:order_id/delete-order',/*authMiddleware.verifyTokenAndAdmin,*/ orderRoute.deleteOrder) // :id => order id

module.exports = router;
