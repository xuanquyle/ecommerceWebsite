const Orders = require('../models/order.model');
const Users = require('../models/user.model');
const Products = require('../models/product.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
class OrderController {
    index(req, res, next) {
        Orders.find()
            .then(order => {
                res.status(200).json({
                    success: true,
                    message: 'Get order successfully',
                    order
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    message: err
                })
            }
            )
    }
    getUserOrder(req, res, next) {
        let filter;
        req.query.hasOwnProperty('created') ? filter = { "status.receivedAt": null, "status.deliveryStartedAt": null, "status.successDeliveredAt": null } : filter;
        req.query.hasOwnProperty('received') ? filter = { "status.receivedAt": { $ne: null }, "status.deliveryStartedAt": null, "status.successDeliveredAt": null } : filter;
        req.query.hasOwnProperty('deliveryStarted') ? filter = { "status.deliveryStartedAt": { "$ne": null }, "status.successDeliveredAt": null } : filter;
        req.query.hasOwnProperty('successDelivered') ? filter = { "status.successDeliveredAt": { "$ne": null } } : filter;
        filter = Object.assign(filter, { user: req.params.id })
        Orders.findOne(filter)
            .then(order => {
                if (!order || order.length === 0)
                    return res.status(404).json({
                        success: false,
                        message: 'Order not found'
                    })
                return res.status(200).json({
                    success: true,
                    message: `Get order successfully`,
                    order
                })
            })
            .catch(err => res.status(404).json({
                success: false,
                message: 'Order not found',
                err
            }))
    }
    createOrder(req, res, next) {
        Users.findById(req.params.id)
            .then(user => {
                if (!user || user.length === 0)
                    return res.status(404).json({
                        success: false,
                        message: 'User not found'
                    })
                let arrProduct = [];
                req.body.orderItems.forEach(item => arrProduct.push(item.product))
                Products.find({
                    _id: {
                        "$in": arrProduct
                    }
                })
                    .then(product => {
                        if (!product || product.length === 0 || product.length != arrProduct.length)
                            return res.status(404).json({
                                success: false,
                                message: 'Some product not found'
                            })
                        let orderItems = []
                        req.body.orderItems.forEach(item => {
                            orderItems.push({
                                product: item.product,
                                qty: item.qty
                            })
                        })
                        const newOder = new Orders({
                            user: req.params.id,
                            orderItems: orderItems,
                            shippingAddress: req.body.shippingAddress,
                            shippingPrice: req.body.shippingPrice,
                            totalPrice: req.body.totalPrice,
                            paymentMethod: req.body.paymentMethod
                        })
                        newOder.save()
                            .then(newOder => {
                                return res.status(200).json({
                                    success: true,
                                    message: 'Order created successfully',
                                    newOder
                                })
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    success: false,
                                    message: err
                                })
                            })
                    })
                    .catch(err => res.status(404).json({
                        success: false,
                        message: err
                    }))
            })
            .catch(err => res.status(404).json({
                success: false,
                message: err
            }))
    }
    updateStatusOrder(req, res, next) {
        Orders.findById(req.params.order_id)
            .then(order => {
                if (!order || order.length === 0)
                    return res.status(404).json({
                        success: false,
                        message: "Order not found"
                    })
                if (req.body.status == 'received')
                    !order.status.receivedAt ? order.status.receivedAt = Date.now() : order.status.receivedAt;
                if (req.body.status == 'deliveryStarted')
                    !order.status.receivedAt ? order.status.receivedAt = order.status.deliveryStartedAt = Date.now() : !order.status.deliveryStartedAt ? order.status.deliveryStartedAt = Date.now() : order.status.deliveryStartedAt;
                order.save()
                    .then(order => {
                        res.status(200).json({
                            success: true,
                            message: 'Update status of order successfully',
                            order
                        })
                    })
                    .catch(err => res.status(404).json({
                        success: false,
                        message: 'Update status of order not successful',
                        err
                    })
                    )
            })
            .catch(err => res.status(404).json({
                success: false,
                message: 'Update status of order not successful',
                err
            }))
    }
    confirmDeleverySuccess(req, res, next) {
        Orders.findById(req.params.order_id)
            .then(order => {
                if (!order || order.length === 0)
                    return res.status(404).json({
                        success: false,
                        message: "Order not found"
                    })
                !order.status.successDeliveredAt ? order.status.successDeliveredAt = Date.now() : order.status.successDeliveredAt;
                order.save()
                    .then(order => {
                        res.status(200).json({
                            success: true,
                            message: "Delivery completed successfully",
                            order
                        })
                    })
                    .catch(err => res.status(404).json({
                        success: false,
                        message: "Failed to confirm deliver order",
                        err
                    }))
            })
            .catch(err => res.status(404).json({
                success: false,
                message: "Failed to confirm deliver order",
                err
            }))
    }
    deleteOrder(req, res, next) {
        Orders.delete({ _id: req.params.order_id })
            .then(order => {
                if (!order || order.length === 0)
                    return res.status(404).json({
                        success: false,
                        message: 'Order not found',
                    })
                return res.status(200).json({
                    success: true,
                    message: `Order #${req.params.order_id} deleted successfully`
                })
            })
            .catch(err => res.status(404).json({
                success: false,
                message: err
            }))
    }
    cancelOrder(req, res, next) {
        Orders.findOne({ _id: req.params.order_id, canceledAt: null })
            .then(order => {
                if (!order || order.length === 0)
                    return res.status(404).json({
                        success: false,
                        message: 'Order not found',
                    })
                if (order.status.deliveryStartedAt != null)
                    return res.status(404).json({
                        success: false,
                        message: 'The order has been delivered to the carrier, cannot be cancelled'
                    })
                else {
                    order.deliveryStartedAt = Date.now();
                    order.save()
                        .then(order => res.status(200).json({
                            success: false,
                            message: 'Cancel order successfully',
                            order
                        }))
                        .catch(err => res.status(500).json({
                            success: false,
                            message: err
                        }))
                }
                return res.status(200).json({
                    success: true,
                    message: 'Cancel order successfully'
                })
            })
            .catch(err => res.status(404).json({
                success: false,
                message: err
            }))
    }
}

module.exports = new OrderController;
