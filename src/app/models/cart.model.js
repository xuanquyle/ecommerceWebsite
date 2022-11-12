const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CartItem = new Schema({
    product: { type: String, required: true, ref: 'products' },
    qty: { type: Number, required: true }

})

const Cart = new Schema({
    user: { type: String, required: true, ref: 'users' },
    cartItems: [CartItem]
})
