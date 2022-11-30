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
            let orders = await Orders.find(filter).populate('user').populate('orderItems.product')
            if (!orders.length) {
                res.status(200);
                throw new ErrorHandler.NoData('No orders yet')
            }
            orders = orders.map(order => {
                const { user, ...orther } = order._doc;
                const { password, ...user_orther } = user._doc;
                order = Object.assign({}, { ...orther }, { user: { ...user_orther } });
                return order
            })
            res.status(200).json(orders)
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

            const arrProduct = req.body.orderItems.map(item => item.product)
            const arrOption = req.body.orderItems.map(item => item.option)
            const products = await Products.find({ options: { $elemMatch: { id: { $in: arrOption } } } })
            if (products.length !== req.body.orderItems.length) throw new ErrorHandler.NotFoundError('Một vài sản phẩm trong đơn hàng không tồn tại')
            // create order
            let err = ''
            for (let i = 0; i < req.body.orderItems.length; i++) {
                const productAvailable = await Products.findOne({
                    _id: req.body.orderItems[i].product,
                    options: {
                        $elemMatch: {
                            _id: req.body.orderItems[i].option,
                            qty: { $gte: Math.abs(req.body.orderItems[i].qty) }
                        }
                    }
                })
                if (!productAvailable) err += `< Sản phẩm #${req.body.orderItems[i].product} không đủ số lượng yêu cầu trong đơn hàng >`;
            }
            if (err != '') throw new ErrorHandler.BadRequestError(err)

            const orderItems = req.body.orderItems.map(item => ({ product: item.product, option: item.option, qty: item.qty }))
            const newOder = new Orders({
                user: req.params.id,
                orderItems: orderItems,
                shippingAddress: req.body.shippingAddress,
                shippingPrice: req.body.shippingPrice,
                totalPrice: req.body.totalPrice,
                paymentMethod: req.body.paymentMethod,
                customerName: req.body.customer_name,
                customerPhone: req.body.customer_phone
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
            if (!order) throw new ErrorHandler.NotFoundError('Không tìm thấy đơn hàng')
            if (order.canceledAt !== null) throw new ErrorHandler.BadRequestError('Đơn hàng đã bị hủy')
            if (req.body.status == 'received')
                !order.status.receivedAt ? order.status.receivedAt = Date.now() : order.status.receivedAt;
            if (req.body.status == 'deliveryStarted')
                !order.status.receivedAt ? order.status.receivedAt = order.status.deliveryStartedAt = Date.now() : !order.status.deliveryStartedAt ? order.status.deliveryStartedAt = Date.now() : order.status.deliveryStartedAt;


            let err = '';
            if (req.body.status == 'received') {
                order.orderItems.forEach(async (orderItem) => {
                    let product = await Products.findOne(
                        {
                            _id: orderItem.product,
                            options: {
                                $elemMatch: {
                                    qty: { $gte: orderItem.qty }
                                }
                            }
                        });
                    if (!product)
                        err += `Sản phẩm ${orderItem.product} không đủ số lượng theo đơn hàng >>>>`
                    product.options = product.options.map(item => {
                        if (item._id == orderItem.option)
                            item.qty -= orderItem.qty;
                        return item;
                    })
                    await product.save();
                })
            }
            const updatedOrder = await order.save()
            if (!updatedOrder) throw new ErrorHandler.BadRequestError('Không thể cập nhật đơn hàng')

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
            if (!order) throw new ErrorHandler.NotFoundError('Không tìm thấy đơn hàng')
            if (order.status.deliveryStartedAt != null) throw new ErrorHandler.NotFoundError('Đơn hàng đã được giao cho đơn vị vận chuyển. Không thể hủy đơn')
            order.canceledAt = Date.now();
            const canceledOrder = await order.save();
            if (!canceledOrder) throw new ErrorHandler.BadRequestError('Không thể hủy đơn hàng. Vui lòng thử lại sau')
            res.status(200).json(canceledOrder)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }
}

module.exports = new OrderController;
