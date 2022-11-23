const Carts = require('../models/cart.model')
const Products = require('../models/product.model')
const Users = require('../models/user.model')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId;
const ErrorHandler = require('../errors/errorHandler')
class CartController {
    async getUserCart(req, res, next) {
        try {
            const cart = await Carts.find({ user: req.params.id }).populate('cartItems.product');
            if (!cart.length || cart.cartItems.length !== 0) res.status(200).json('Chưa có sản phẩm nào trong giỏ hàng')
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

            const productInCart = await Carts.find({ user: req.params.id, cartItems: { $elemMatch: { product: req.body.product} } })
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
                            _id: req.body.id
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
                if (req.body.qty === 0) {
                    const updatedCart = await Products.findByIdAndUpdate(req.params.id,
                        {
                            "$pull":
                            {
                                options: {
                                    $elemMatch:
                                        { _id: new ObjectId(req.body.option_id) }
                                }
                            }
                        },
                        { safe: true, multi: true }, (err, product) => {
                            if (!err) {
                                res.status(200).json(updatedCart)
                            }
                            else throw new ErrorHandler.BadRequestError(err.message)
                        });
                }
            }
            throw new ErrorHandler.BadRequestError('Không thể cập nhật giỏ hàng')
        }
        catch (error) {
            throw new ErrorHandler.BadRequestError(error.message)
        }
    }
    deleteCart(req, res, next) {
        try {
            const deletedCart = Carts.findOneAndUpdate(
                {
                    user: req.params.id,
                    cartItems: {
                        $elemMatch: {
                            _id: req.body.id
                        }
                    }
                },
                {
                    "$pull":
                        { cartItems: { _id: req.body.id } }
                },
                { safe: true, multi: true })
            if (!deletedCart) throw new ErrorHandler.NotFoundError('Không tìm thấy sản phẩm trong giỏ hàng')
            res.status(200).json(`Xóa sản phẩm #${deletedCart._id} khỏi giỏ hàng thành công`)
        } catch (error) {
            throw new ErrorHandler.BadRequestError(error.message)
        }
    }
}
module.exports = new CartController;
