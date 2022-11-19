const { application } = require("express");

const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Option = new Schema({
    color: { type: String},
    rom: { type: Number },
    ram: { type: Number },
    price: { type: Number },
    qty: { type: Number },
    image: { type: String }
})

const Product = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        short_description: { type: String },
        thumb: { type: String },
        category: { type: String, required: true, ref: 'category'},
        slug: {
            type: String, slug: 'name', unique: true
        },
        options: [Option]
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
Product.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt: true, deletedBy: true });
const productModel = mongoose.model('product', Product);

module.exports = productModel

