const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const RefreshTokenSchema = new Schema({
    user: { type: String, require: true },
    token: { type: String, require: true },
    expiredAt: { type: Date, require: true }
})
module.exports = mongoose.model('refresh_token',RefreshTokenSchema)
