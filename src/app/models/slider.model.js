const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SliderSchema = new Schema({
    title: { type: String, require: true },
    image: { type: String, require: true },
    href: { type: String, require: true }
})
module.exports = mongoose.model('sliders', SliderSchema)
