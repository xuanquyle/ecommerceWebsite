const { application } = require("express");

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const product = new Schema({
    name: {type: String, required: true},
    slug: {type: String, required: true},
    description: {type: String},
    sku: {type: String},
    price: {type: Number,required: true},
    quantity: {type: Number,required: true},
    createdAt: {type: Date, default: Date.now()},
    isActive: {type: Boolean, required: true},
    short_description: {type: String},
    thumb: {type: String},
    category_id: {type: String, required: true},
});

const colorOpt = new Schema({
    code: {type: String},
    name: {type: String},
});
const ramOpt = new Schema({
    code: {type: String},
    name: {type: String},
});
const romOpt = new Schema({
    code: {type: String},
    name: {type: String},
});
const sizeOpt = new Schema({
    code: {type: String},
    name: {type: String},
});
const warrantyOpt = new Schema({
    code: {type: String},
    name: {type: String},
});

const category = new Schema({
    name: {type: String},
});
// let colorOpt,ramOpt,romOpt,sizeOpt,warrantyOpt = opt;

const exp_product=mongoose.model('product', product);
const exp_colorOpt=mongoose.model('color_opt',colorOpt );
const exp_ramOpt=mongoose.model('ram_opt', ramOpt);
const exp_romOpt=mongoose.model('rom_opt', romOpt);
const exp_sizeOpt=mongoose.model('size_opt', sizeOpt);
const exp_warrantyOpt=mongoose.model('warranty_opt', warrantyOpt);
const exp_category=mongoose.model('category', category);

module.exports= {
    exp_product,exp_colorOpt,exp_ramOpt,exp_romOpt,exp_sizeOpt,exp_warrantyOpt,exp_category
}

