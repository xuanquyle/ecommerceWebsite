const { application } = require("express");

const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const product = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        short_description: { type: String },
        thumb: { type: String },
        category_id: { type: ObjectId, required: true },
        slug: {
            type: String, slug: 'name', unique: true
        }
    },
    {
        timestamps:
        {
            createdAt: true,
            updatedAt: true,
        }
    },
    { versionKey: false });


mongoose.plugin(slug);
product.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt: true, deletedBy: true });


const productOption = new Schema({
    product_id: { type: String },
    color_opt: { type: String },
    rom_opt: { type: String },
    ram_opt: { type: String },
    price: { type: Number },
    qty: { type: Number }
})
const exp_product = mongoose.model('product', product);
const exp_productOpt = mongoose.model('product_opts', productOption);

module.exports = {
    exp_product, exp_productOpt
}

