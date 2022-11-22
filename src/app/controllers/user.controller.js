
const { request, response } = require('express');
const { restart } = require('nodemon');
const bcrypt = require('bcrypt');
const Users = require('../models/user.model');
const validate = require('email-validator');
const jwt = require('jsonwebtoken');
const mailer = require('../utils/nodemailer');
const dotenv = require('dotenv');
dotenv.config();
// let refreshTokens = [];
const generateToken = require('../utils/generateToken');
const ErrorHandler = require('../errors/errorHandler')

class UserController {
    deletePassword(user) {
        const { password, ...orther } = user._doc;
        return { ...orther }
    }
    async getAllUser(req, res, next) {
        try {
            const users = await Users.find()
            if (!users.length) throw new ErrorHandler.NotFoundError('User not found')
            const allUser = users.map(user => {
                const { password, ...orther } = user._doc;
                user = { ...orther };
                return user
            })
            res.status(200).json(allUser)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }

    getDetailUser(req, res, next) {
        try {
            const user = Users.findById(req.params.id);
            if (!user) throw new ErrorHandler.NotFoundError('Không tìm thấy thông tin người dùng');
            const { password, ...orther } = user._doc;
            res.status(200).json({ ...orther });
        }
        catch {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }

    async login(req, res, next) {
        try {
            const user = await Users.findOne({ email: req.body.email });
            if (!user) throw new ErrorHandler.NotFoundError('Không tìm thấy email người dùng')
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) throw new ErrorHandler.ForbiddenError('Sai mật khẩu. Vui lòng đăng nhập lại');
            if (user.verifiedAt === null) throw new ErrorHandler.ForbiddenError('Tài khoản chưa được xác thực. Vui lòng kiểm tra email');
            if (user && validPassword && user.verifiedAt) {
                const accessToken = generateToken.generateAccessToken(user);
                const refreshToken = generateToken.generateRefreshToken(user);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                const { password, ...orther } = user._doc;
                return res.status(200).json({ ...orther, accessToken });
            }

        } catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }
    async register(req, res, next) {
        let err;
        if (!validate.validate(req.body.email))
            err += 'Email không đúng.'
        if (req.body.password.length < 6)
            err += 'Password phải nhiều hơn 6 ký tự.';
        if (!Boolean(req.body.password.match(/[A-Z]/)))
            err += 'Password phải chứa ít nhất 1 ký tự viết hoa.'
        if (!Boolean(req.body.password.match(/[!#$%&?@"]/)))
            err += 'Password phải chứa ít nhất 1 ký tự đặc biệt.'

        if (err) {
            throw new ErrorHandler.ValidationError(`${err} Vui lòng thử lại`)
        } try {
            const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUND));
            const hashed = await bcrypt.hash(req.body.password, salt);

            const email = await Users.findOneWithDeleted({ email: req.body.email })
            if (email) throw new ErrorHandler.BadRequestError("Tài khoản email đã đăng ký trước đó. Vui lòng đăng nhập")
            const newUser = new Users({
                email: req.body.email,
                password: hashed,
            });
            // Save user to DB
            const user = await newUser.save();
            if (!user) throw new ErrorHandler.ServerError('Không thể đăng ký. Vui lòng kiểm tra lại')

            const hashedEmail = await bcrypt.hash(user.email, parseInt(process.env.BCRYPT_SALT_ROUND))
            if (!hashedEmail) throw new ErrorHandler.ServerError('Không thể đăng ký ngay lúc này. Vui lòng kiểm tra lại')
            const url = `${process.env.APP_URl}:${process.env.PORT}/api/users/verify?email=${user.email}&token=${hashedEmail}`;
            const html = `<a><b>Verify your acccount</b></a>`;
            mailer.sendMail(user.email, html, url)
            res.status(200).json("Vui lòng kiểm tra email để xác thực tài khoản")
        } catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }
    async updateUser(req, res, next) {
        try {
            const updatedUser = await Users.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        fisrtname: req.body.fisrtname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        phone: req.body.phone,
                        sex: req.body.sex,
                        birth: new Date(req.body.birth)
                    }
                }
            )
            if (!updatedUser) throw ErrorHandler.NotFoundError('User not found')
            const { password, ...orther } = updatedUser._doc;
            res.status(200).json({ ...orther })
        } catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const deletedUser = await Users.delete({ _id: req.params.id, })
            if (!deletedUser) throw new ErrorHandler.NotFoundError('User not found')
            res.status(200).json(`Xóa người dùng ${deletedUser} thành công`)
        } catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }

    }

    // USER_ADDRESS controller
    // [GET] /users/address/:id
    async getUserAddress(req, res, next) {
        try {
            const userAddresses = await UserAddresses.find();
            if (!userAddresses.length) throw new ErrorHandler.NotFoundError('')
        } catch (err) {

        }
    }

    // [POST] /users/address/:id
    async createUserAddress(req, res, next) {
        try {
            const addressItem = {
                address: req.body.address,
                town_code: req.body.town_code,
                city_code: req.body.city_code,
                postal_code: req.body.postal_code,
                contry: req.body.contry,
                customer_name: req.body.customer_name,
                customer_phone: req.body.customer_phone,
                is_default: req.body.is_default,
            }
            let user = await Users.findById(req.params.id);
            if (!user) throw new ErrorHandler('User not found')
            if (user.addresses.length >= 5) throw new ErrorHandler.BadRequestError('Chỉ cho phép thêm tối đa 5 địa chỉ. Vui lòng kiểm tra lại')
            if (addressItem.is_default === true) {
                user.addresses = user.addresses.map(address => {
                    address.is_default = false;
                    return address;
                })
            }
            user.addresses.push(addressItem)
            const createdAddress = await user.save();
            if (!createdAddress) throw new ErrorHandler.BadRequestError('Không thể tìm thấy người dùng này, vui lòng thử lại')
            res.status(200).json(createdAddress)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }

    // [DELETE] /users/:id/address/:address_id
    async deleteUserAddress(req, res, next) {
        try {
            const user = await Users.findById(req.params.id);
            if (!user) throw new ErrorHandler.NotFoundError('Không tìm thấy thông tin người dùng');
            user.addresses = user.addresses.filter(address => address._id != req.params.address_id)
            const deletedAddress = await user.save();
            if (!deletedAddress) throw new ErrorHandler.BadRequestError('Không thể xóa địa chỉ. VUi lòng kiểm tra lại')
            res.status(200).json('Đã xóa địa chỉ thành công')
        } catch (error) {
            throw new ErrorHandler.BadRequestError(error.message)
        }
    }
    //[GET] /users/address/:id/:address_id
    async getDetailAddress(req, res, next) {
        try {
            const user = await Users.findById(req.params.id);
            if (!user) throw new ErrorHandler.NotFoundError('Không tìm thấy thông tin người dùng')
            const address = user.addresses.filter(address => address._id == req.params.address_id)
            if (!address.length) throw new ErrorHandler.NotFoundError('Không tìm thấy địa chỉ')
            res.status(200).json(address)
        } catch (error) {
            throw new ErrorHandler.BadRequestError(error.message)
        }
    }


    // REQUEST REFRESH TOKEN
    requestRefreshToken(req, res, next) {
        const refreshToken = req.cookies.refreshToken;

        //Send error if token is not valid
        if (!refreshToken) return res.status(401).json("You're not authenticated");
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                res.json(err);
            }
            // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            //create new access token, refresh token and send to user
            const newAccessToken = generateToken.generateAccessToken(user);
            const newRefreshToken = generateToken.generateRefreshToken(user);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        });
    }


    // Email verification
    verifyEmail(req, res, next) {
        try {
            bcrypt.compare(req.query.email, req.query.token, async (err, result) => {
                if (result == false) throw new ErrorHandler.ForbiddenError('Không thể xác thực tài khoản. Vui lòng thử lại')
                {
                    const user = await Users.findOne({ email: req.query.email });
                    if (!user) throw new ErrorHandler.NotFoundError('User not found')
                    user.verifiedAt = Date.now()
                    const registeredUser = await user.save()
                    if (!registeredUser) throw new ErrorHandler.ServerError('Có lỗi, vui lòng thử lại sau')
                    res.status(200).json(`Xác thực thành công tài khoản email ${req.query.email}`)
                }
            })
        }
        catch (err) {
            throw ErrorHandler.BadRequestError(err.message)
        }
    }
}


module.exports = new UserController;
