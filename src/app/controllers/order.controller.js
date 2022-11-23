const Orders = require('../models/order.model');
const Users = require('../models/user.model');
const Products = require('../models/product.model');
const Carts = require('../models/cart.model')
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const ErrorHandler = require('../errors/errorHandler')
class OrderController {
    async getAllOrder(req, res, next) {
        try {
            const orders = await Orders.find().populate('user').populate('orderItems.product')
            if (!orders.length) throw new ErrorHandler('Order not found');
            const allOrders = orders.map(order => {
                const { user, ...orther } = order._doc;
                const { password, ...user_orther } = user._doc;
                order = Object.assign({}, { ...orther }, { user: { ...user_orther } });
                return order;
            })
            return res.status(200).json(allOrders)
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
            const { user, ...orther } = order._doc;
            const { password, ...user_orther } = user._doc;
            const userOrder = Object.assign({}, { ...orther }, { user: { ...user_orther } });
            res.status(200).json(userOrder)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }

    }
    async createOrder(req, res, next) {
        try {
            //check user exists
            const userExist = await Users.findById(req.params.id)
            if (!userExist) throw new ErrorHandler.NotFoundError('Không tìm thấy thông tin tài khoản của bạn')
            // check product exists
            let arrProduct = [];
            req.body.orderItems.forEach(async item => {
                let product = await Products.findById(item.product);
                if (product)
                    arrProduct.push(product)
            })
            console.log(arrProduct)
            console.log(arrProduct.length, "-------->", req.body.orderItems.length)
            if (arrProduct.length !== req.body.orderItems.length) throw new ErrorHandler.NotFoundError('Một vài sản phẩm trong đơn hàng không được tìm thấy')

            // create order
            let orderItems = []
            req.body.orderItems.forEach(async item => {
                const itemAvailable = await Products.findOne({ 'options.$._id': item.option, 'options.$.qty': item.qty })
                if (!itemAvailable) throw new ErrorHandler.BadRequestError(`Sản phẩm #${item.option} không còn đủ #${qty} số lượng để đáp ứng đơn hàng`)
                orderItems.push({
                    product: item.product,
                    option: item.option,
                    qty: item.qty
                })
            })
            if (!orderItems.length) throw new ErrorHandler.BadRequestError('Không có sản phẩm nào được đặt')
            const newOder = new Orders({
                user: req.params.id,
                orderItems: orderItems,
                shippingAddress: req.body.shippingAddress,
                shippingPrice: req.body.shippingPrice,
                totalPrice: req.body.totalPrice,
                paymentMethod: req.body.paymentMethod
            })
            const createdOrder = await newOder.save()
            if (!createdOrder)
                throw new ErrorHandler.BadRequestError('Can not create your order. Please try again ')

            const cart_id = req.body.cart_id;
            await Carts.findOneAndDelete({ _id: cart_id })
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
