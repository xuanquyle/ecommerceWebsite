const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderItemSchema = new Schema({
    product:    { type: String, required: true, ref: 'product' },
    option:     { type: String, require: true },
    qty:        { type: Number, required: true }
})

const OrderSchema = new Schema({
    user:               { type: String, required: true, ref: 'user' },
    orderItems:         [OrderItemSchema],
    shippingAddress:    { type: String,require:true},
    customerName:       { type: String,require:true},
    customerPhone:      { type: String,require:true},
    shippingPrice:      { type: Number, required: true },
    totalPrice:         { type: Number, required: true },
    paymentMethod:      { type: String, required: true, default: 'Cash' },
    canceledAt:         { type: Date, default: null },
    status: {
        createdAt:      { type: Date, default: Date.now() },
        receivedAt:     { type: Date, default: null },
        deliveryStartedAt: { type: Date, default: null },
        deliveredAt:    { type: Date, default: null },
    }
}, {    timestamps:
    {       createdAt: true,
            updatedAt: true
    }})
const mongoose_delete = require('mongoose-delete');
OrderSchema.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt: true, deletedBy: true });
const Order = mongoose.model('order', OrderSchema);
module.exports = Order;
