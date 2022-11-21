const Orders = require('../models/order.model');
const Users = require('../models/user.model');
const Products = require('../models/product.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const ErrorHandler = require('../errors/errorHandler')
class OrderController {
    async getAllOrder(req, res, next) {
        try {
            const orders = await Orders.find().populate('user').populate('orderItems.product')
            if (!orders.length) throw new ErrorHandler('Order not found');
            return res.status(200).json(orders)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }
    async getUserOrder(req, res, next) {
        try {
            let filter = {};
            req.query.hasOwnProperty('created') ? filter = { "status.receivedAt": null, "status.deliveryStartedAt": null, "status.successDeliveredAt": null } : filter = filter;
            req.query.hasOwnProperty('received') ? filter = { "status.receivedAt": { $ne: null }, "status.deliveryStartedAt": null, "status.successDeliveredAt": null } : filter = filter;
            req.query.hasOwnProperty('deliveryStarted') ? filter = { "status.deliveryStartedAt": { "$ne": null }, "status.successDeliveredAt": null } : filter = filter;
            req.query.hasOwnProperty('successDelivered') ? filter = { "status.successDeliveredAt": { "$ne": null } } : filter = filter;
            req.query.hasOwnProperty('canceled') ? filter = { "canceledAt": { "$ne": null } } : filter = filter;
            Object.assign(filter, { user: req.params.id })
            const order = await Orders.findOne(filter).populate('user').populate('orderItems.product')
            if (!order) {
                res.status(200);
                throw new ErrorHandler.NoData('No orders yet')
            }
            res.status(200).json(order)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }

    }
    async createOrder(req, res, next) {
        try {
            //check user exists
            const userExist = await Users.findById(req.params.id)
            if (!userExist) throw new ErrorHandler.NotFoundError('User not found')
            // check product exists
            let arrProduct = [];
            req.body.orderItems.forEach(item => arrProduct.push(item.product))
            const productExist = await Products.find({ _id: { "$in": arrProduct } })
            if (!productExist.length) throw new ErrorHandler.NotFoundError('Product not found')
            /// SÁNG MAI LÀM
            // else {
            //         if (productExist.qty < req.body.orderItems)
            //     }

            // create order
            let orderItems = []
            let totalPrice = 0;
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
            const createdOrder = await newOder.save()
            if (!createdOrder.length)
                throw new ErrorHandler.BadRequestError('Can not create your order. Please try again ')
            res.status(201).json(createdOrder)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }
    async updateStatusOrder(req, res, next) {
        try {
            const order = await Orders.findById(req.params.order_id)
            if (!order) throw new ErrorHandler.NotFoundError('Order not found')

            if (req.body.status == 'received')
                !order.status.receivedAt ? order.status.receivedAt = Date.now() : order.status.receivedAt;
            if (req.body.status == 'deliveryStarted')
                !order.status.receivedAt ? order.status.receivedAt = order.status.deliveryStartedAt = Date.now() : !order.status.deliveryStartedAt ? order.status.deliveryStartedAt = Date.now() : order.status.deliveryStartedAt;
            const updatedOrder = await order.save()
            if (!updatedOrder.length) throw new ErrorHandler.NotFoundError('Order not found')
            if (req.body.status == 'deliveryStarted') {
                order.orderItems.forEach(async (orderItem) => {
                    const updateProduct = await Products.findByIdAndUpdate(orderItem.product);
                    if (!updateProduct) throw new ErrorHandler.NotFoundError(`Product ${orderItem.product} not found`)
                })
            }
            res.status(200).json(updatedOrder)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }
    async confirmDeleverySuccess(req, res, next) {
        try {
            const order = await Orders.findById(req.params.order_id)
            if (!order) throw new ErrorHandler.NotFoundError('Order not found')
            !order.status.successDeliveredAt ? order.status.successDeliveredAt = Date.now() : order.status.successDeliveredAt;
            const confirmedOrder = await order.save();
            if (!confirmedOrder.length) throw new ErrorHandler.BadRequestError('Can not confirm order. Please try again')
            res.status(200).json(confirmedOrder)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }
    async deleteOrder(req, res, next) {
        try {
            const deletedOrder = await Orders.delete({ _id: req.params.order_id })
            if (!deletedOrder.length) throw new ErrorHandler.NotFoundError('Order not found')
            res.status(200).json(`Delete order #${req.params.id} successfully`)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }
    async cancelOrder(req, res, next) {
        try {
            const order = await Orders.findOne({ _id: req.params.order_id, canceledAt: null })
            if (!order.length) throw new ErrorHandler.NotFoundError('Order not found')
            if (order.status.deliveryStartedAt != null) throw new ErrorHandler.NotFoundError('The order has been delivered to the carrier, cannot be cancelled')
            order.canceledAt = Date.now();
            const canceledOrder = await order.save();
            if (!canceledOrder.length) throw new ErrorHandler.BadRequestError('Can not cancel order. Please try again')
            res.status(200).json(canceledOrder)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }
}

module.exports = new OrderController;