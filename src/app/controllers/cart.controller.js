const Carts = require('../models/cart.model')
const Products = require('../models/product.model')
const Users = require('../models/user.model')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const ErrorHandler = require('../errors/errorHandler')
class CartController {
    async getUserCart(req, res, next) {
        try {
            const cart = await Carts.find({ user: req.params.id }).populate('cartItems.product');
            res.status(200).json(cart)
        } catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }
    async addToCart(req, res, next) {
        try {
            const userExist = await Users.findById(req.params.id);
            if (!userExist) throw new ErrorHandler.NotFoundError('Không tìm thấy tài khoản của bạn')
            const productExist = await Products.findById(req.body.product)
            if (!productExist) throw new ErrorHandler.NotFoundError('Không tìm thấy sản phẩm')

            const productInCart = await Carts.find({ user: req.params.id, cartItems: { $elemMatch: { product: req.body.product, option: req.body.option } } })
            if (productInCart.length) throw new ErrorHandler.BadRequestError('Sản phẩm đã có trong giỏ hàng')

            const newCartItem = {
                product: req.body.product,
                option: req.body.option,
                qty: req.body.qty
            }
            const cartExist = await Carts.findOne({ user: req.params.id })
            if (!cartExist) {
                const newCart = new Carts({
                    user: req.params.id,
                    cartItems: [newCartItem]
                })
                const addedCart = await newCart.save()
                if (!addedCart) throw new ErrorHandler.BadRequestError('Không thể thêm vào giò hàng. Vui lòng kiểm tra lại')
                res.status(200).json(addedCart)
            }
            else {
                const addedCart = await Carts.findOneAndUpdate({ user: req.params.id }, {
                    $push: {
                        cartItems: newCartItem
                    }
                })
                if (!addedCart) throw new ErrorHandler.BadRequestError('Không thể thêm vào giỏ hàng. Vui lòng kiểm tra lại')
                res.status(200).json(addedCart)
            }
        } catch (error) {
            throw new ErrorHandler.BadRequestError(error.message)
        }
    }
    async updateCart(req, res, next) {
        try {

            if (req.body.qty && req.body.qty > 0) {
                const updatedCart = await Carts.findOneAndUpdate({
                    user: req.params.id,
                    cartItems: {
                        $elemMatch: {
                            _id: req.body._id
                        }
                    }
                }, {
                    $set: {
                        'cartItems.$.qty': req.body.qty
                    }
                })
                if (!updatedCart) throw new ErrorHandler.NotFoundError('Không tìm thấy sản phẩm trong giỏ hàng')
                res.status(200).json(updatedCart)
            }
            else {
                if (req.body.qty == 0) {
                    let cart = await Carts.findOne({ user: req.params.id })
                    if (!cart) throw new ErrorHandler.NotFoundError("Không tìm thấy sản phẩm trong giỏ hàng")
                    cart.cartItems = cart.cartItems.filter(item => item._id != req.body._id)
                    const updatedCart = cart.save();
                    if (!updatedCart) throw new ErrorHandler.BadRequestError('Không thể update')
                    res.status(200).json('Đã cập nhật giỏ hàng')
                }
            }
            throw new ErrorHandler.BadRequestError('Không thể cập nhật giỏ hàng')
        }
        catch (error) {
            throw new ErrorHandler.BadRequestError(error.message)
        }
    }
    async deleteCart(req, res, next) {
        try {
            let cart = await Carts.findOne({ user: req.params.id })
            if (!cart) throw new ErrorHandler.NotFoundError('Không tìm thấy sản phẩm')
            cart.cartItems = cart.cartItems.filter(item => item._id != req.body._id)
            const newCart = await cart.save();
            if (!newCart) throw new ErrorHandler.BadRequestError('Không thể xóa sản phẩm')
            res.status(200).json(`Xóa sản phẩm #${req.body._id} khỏi giỏ hàng thành công`)
        } catch (error) {
            throw new ErrorHandler.BadRequestError(error.message)
        }
    }
}
module.exports = new CartController;
