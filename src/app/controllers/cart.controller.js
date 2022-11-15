const Carts = require('../models/cart.model')
const Products = require('../models/product.model')
const Users = require('../models/user.model')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId;
class CartController {
    async index(req, res, next) {
        try {
            const cart = await Carts.find({ user: req.params.id }).populate('cartItems.product');
            if (!cart || cart.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: 'Cart is empty',
                    cart: []
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'Get cart successfully',
                    cart: cart
                });
            }
        } catch (err) {
            res.status(404).json({
                success: false,
                message: 'Failed to get cart'
            });
        }
    }
    async addToCart(req, res, next) {
        Users.findById(req.params.id)
            .then((user) => {
                if (!user || user.length === 0)
                    return res.status(404).json({
                        success: false,
                        message: 'User not found'
                    })
                Products.findById(req.body.product_id)
                    .then(async product => {
                        if (!product || product.length === 0)
                            return res.status(404).json({
                                success: false,
                                message: 'Product not found',
                            })
                        const productExist = await Carts.find({ user: req.params.id, cartItems: { $elemMatch: { product: req.body.product_id } } })
                        if (productExist.length != 0) {
                            return res.status(404).json({
                                success: false,
                                message: 'Product already exists in your cart'
                            })
                        }
                        else {
                            const newCartItem = {
                                product: req.body.product_id,
                                qty: req.body.qty
                            }
                            const cartExist = await Carts.findOne({ user: req.params.id })
                            if (!cartExist || cartExist.length === 0) {
                                const newCart = new Carts({
                                    user: req.params.id,
                                    cartItems: [newCartItem]
                                })
                                newCart.save()
                                    .then(newCart => {
                                        return res.status(200).json({
                                            success: true,
                                            message: 'Cart added successfully',
                                            newCart
                                        })
                                    })
                                    .catch(err => {
                                        return res.status(404).json({
                                            success: false,
                                            message: 'Add item to cart failed',
                                            err
                                        })
                                    })
                            }
                            else {
                                Carts.findOneAndUpdate({ user: req.params.id }, {
                                    $push: {
                                        cartItems: newCartItem
                                    }
                                })
                                    .then(newCart =>
                                        res.status(200).json({
                                            success: true,
                                            message: 'Cart added successfully',
                                            newCart
                                        })
                                    )
                                    .catch(err => res.status(404).json({
                                        success: true,
                                        message: 'Cart added successfully',
                                        err
                                    }))
                            }
                        }
                    })
                    .catch(err => {
                        return res.status(404).json({
                            success: false,
                            message: 'Product not found',
                            err
                        })
                    })
            })
            .catch(err => {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    err
                })
            })
    }
    async updateCart(req, res, next) {
        if (req.body.qty && req.body.qty > 0) {
            Carts.findOneAndUpdate({
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
            }
            )
                .then(updateCart => {
                    if (!updateCart)
                        return res.status(404).json({
                            success: false,
                            message: 'Cart item not found in cart',
                        })
                    return res.status(200).json({
                        success: true,
                        message: 'Update cart itemm successfully',
                        updateCart
                    })
                })
                .catch(err => {
                    return res.status(404).json({
                        success: false,
                        message: 'Update cart item failed',
                        err
                    })
                }
                )
        }
        else {
            if (req.body.qty === 0) {
                Products.findByIdAndUpdate(req.params.id,
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
                            res.status(200).json({
                                success: true,
                                message: 'The product has been removed from the cart',
                                product
                            })
                        }
                        else res.status(404).json({
                            success: true,
                            message: err
                        })
                    });
            }
        }
        res.status(404).json({
            success: false,
            message: 'Update cart item failed',
        })
    }
    deleteCart(req, res, next) {
        Carts.findOneAndUpdate(
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
            .then(cart => {
                if (!cart)
                    res.status(200).json({
                        success: true,
                        message: 'Cart item not found',
                    })
                res.status(200).json({
                    success: true,
                    message: 'Delete cart item successfully',
                    cart
                })
            })
            .catch(err => res.status(404).json({
                success: false,
                message: 'Delete cart item failed', err
            })
            )

    }
}
module.exports = new CartController;
