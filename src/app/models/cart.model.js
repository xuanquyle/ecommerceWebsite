const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CartItemSchema = new Schema({
    product: { type: String, required: true, ref: 'product' },
    option: { type: String, require: true },
    qty: { type: Number, required: true }
})

const CartSchema = new Schema({
    user: { type: String, required: true, ref: 'user' },
    cartItems: [CartItemSchema]
})

const cartModel = mongoose.model('cart', CartSchema)
module.exports = cartModel;
