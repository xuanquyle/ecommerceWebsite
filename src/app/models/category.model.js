const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectID;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false }
})

const Category = mongoose.model('category', CategorySchema)
module.exports = Category;
