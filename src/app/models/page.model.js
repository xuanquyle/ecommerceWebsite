const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SliderSchema = new Schema({
    image: { type: String, require: true },
    description: { type: String, require: true }
})
const ContactSchema = new Schema({
    facebook: { type: String},
    zalo: { type: String},
    email: { type: String},
    instagram: { type: String},
})
const Slider = mongoose.model('slider', SliderSchema)
const Contact = mongoose.model('contact', ContactSchema)
module.exports = { Slider, Contact }
