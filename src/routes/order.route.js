const express = require('express')
app = express()
const router = express.Router();

const orderController = require('../app/controllers/order.controller')
const authMiddleware = require('../app/middlewares/auth.middleware')

router.get('/me/:id', /*authMiddleware.verifyTokenAndUserAuthorization,*/ orderController.getUserOrder) // :id => User Id
router.get('/', /*authMiddleware.verifyTokenAndAdmin,*/ orderController.getAllOrder)
router.post('/me/:id',/*authMiddleware.verifyTokenAndUserAuthorization,*/ orderController.createOrder)
router.put('/me/:id/confirm-delivery-success/:order_id/',/*authMiddleware.verifyTokenAndUserAuthorization,*/ orderController.confirmDeleverySuccess) // :id => order id
router.put('/me/:id/cancel-order/:order_id',/*authMiddleware.verifyTokenAndUserAuthorization,*/ orderController.cancelOrder) // :id => order id
router.put('/:order_id/update-status',/*authMiddleware.verifyTokenAndAdmin,*/ orderController.updateStatusOrder) // :id => order id
router.delete('/:order_id/delete-order',/*authMiddleware.verifyTokenAndAdmin,*/ orderController.deleteOrder) // :id => order id

module.exports = router;
