const express = require('express')
app = express()
const router = express.Router();

const orderRoute = require('../app/controllers/order.controller')
const authMiddleware = require('../app/middlewares/auth.middleware')

router.get('/:id', orderRoute.getUserOrder)
router.get('/', authMiddleware.verifyTokenAndAdmin,orderRoute.index)
router.post('/:id', orderRoute.createOrder) // :id => user id
router.put('/:order_id/update-status', orderRoute.updateStatusOrder) // :id => order id
router.put('/:order_id/confirm-delivery-success', orderRoute.confirmDeleverySuccess) // :id => order id
router.put('/:order_id/cancel-order', orderRoute.cancelOrder) // :id => order id
router.delete('/:order_id/delete-order', orderRoute.deleteOrder) // :id => order id

module.exports = router;
