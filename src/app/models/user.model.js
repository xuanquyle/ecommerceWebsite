const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const user = new Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    fisrtname: { type: String, default: null},
    lastname: { type: String,default: null },
    phone: { type: String, default: null },
    sex: { type: String, default: null},
    birth: { type: Date, default: null },
    isAdmin: { type: Boolean, default: false},
    verifiedAt:{type:Date,default: null}
},
    {
        timestamps:
        {
            createdAt: true,
            updatedAt: true,
        }
    })

user.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt: true, deletedBy: true });

const userAddress = new Schema({
    user_id: { type: String, required: true },
    address: { type: String, required: true },
    town_code: { type: String, required: true },
    city_code: { type: String, required: true },
    postal_code: { type: String, required: true },
    contry: { type: String, required: true },
    user_name: { type: String, required: true },
    user_phone: { type: String, required: true },
    is_default: { type: Boolean, required: true, default: false },

})

const refreshToken = new Schema({
    user_id: {type: String, required: true},
    refreshToken: {type: String,required: true}
})

const exp_user = mongoose.model('user', user)
const exp_user_addr = mongoose.model('user_address', userAddress)

module.exports = {
    exp_user, exp_user_addr
}
