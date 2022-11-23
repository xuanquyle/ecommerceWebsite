const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const UserAddressSchema = new Schema({
    address: { type: String, default: null },
    town_code: { type: String, default: null },
    city_code: { type: String, default: null },
    postal_code: { type: String, default: null },
    contry: { type: String, default: null },
    customer_name: { type: String, default: null },
    customer_phone: { type: String, default: null },
    is_default: { type: Boolean, default: null, default: false },
    // emailVerificationToken: { type: String },
    // resetPasswordToken: { type: String },
    // resetPasswordTokenExpiryTime: { type: Number }
})
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    phone: { type: String, default: null },
    sex: { type: String, default: null },
    birth: { type: Date, default: null },
    addresses: [UserAddressSchema],
    isAdmin: { type: Boolean, default: false },
    verifiedAt: { type: Date, default: null }
},
    {
        timestamps:
        {
            createdAt: true,
            updatedAt: true,
        }
    })

UserSchema.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt: true, deletedBy: true });

const User = mongoose.model('user', UserSchema)

module.exports = User;
