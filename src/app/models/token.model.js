const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TokenSchema = new Schema({
    user: { type: String, require: true },
    refreshToken: { type: String, require: true },
    expiredAt: { type: Date, require: true }
})

const Token = mongoose.model('token', TokenSchema)
module.exports = Token
