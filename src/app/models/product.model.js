const { application } = require("express");

const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const product = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        sku: { type: Object },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        isActive: { type: Boolean, default: true },
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

const exp_product = mongoose.model('product', product);

module.exports = {
    exp_product
}

