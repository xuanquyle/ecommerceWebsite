const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SliderSchema = new Schema({
    image1: { type: String, require: true },
    image2: { type: String, require: true },
    image3: { type: String, require: true },
    image4: { type: String, require: true },
    image5: { type: String, require: true }
})
module.exports = mongoose.model('sliders', SliderSchema)
