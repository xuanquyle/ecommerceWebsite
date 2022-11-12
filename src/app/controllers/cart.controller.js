const Cart = require('../app/controllers/cart.controller')
const Products = require('../app/controllers/product.controller')
class CartController {
    async index(req, res, next) {
        try {
            const cart = await Cart.find({ user_id: req.params.id }).populate('cartItems.product');
            if (cart) {
                res.status(200).json(cart.cartItems);
            } else {
                res.status(200).json([]);
            }
        } catch (err) {
            res.status(404).json([]);
        }
    }
    addToCart(req, res, next) {
        try {
            

            } catch (error) {

            }
        }
}
module.exports = CartController;
