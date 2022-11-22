
const { request, response } = require('express');
const { restart } = require('nodemon');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const Users = userModel;
const validate = require('email-validator');
const jwt = require('jsonwebtoken');
const mailer = require('../utils/nodemailer');
const dotenv = require('dotenv');
dotenv.config();
// let refreshTokens = [];
const generateToken = require('../utils/generateToken');
const ErrorHandler = require('../errors/errorHandler')

class UserController {
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

            if (!validPassword) throw new ErrorHandler.ForbiddenError('Sai mật khẩu. Vui lòng đăng nhập lại')
            if (user && validPassword) {
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
        let err = '';
        if (!validate.validate(req.body.email))
            err += 'Email không đúng. Vui lòng thử lại'
        if (req.body.password.length < 6) {
            err += 'Password phải nhiều hơn 6 ký tự. Vui lòng thử lại';
            if (!Boolean(str.match(/[A-Z]/)))
                err += 'Password phải chứa ít nhất 1 ký tự viết hoa. Vui lòng thử lại'
        }
        if (re)

            throw new ErrorHandler.ValidationError('')

        try {
            const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUND));
            const hashed = await bcrypt.hash(req.body.password, salt);

            const email = await Users.findOne({ email: req.body.email })
            if (email) {
                return res.status(400).json({
                    success: false,
                    message: "Email account is registered before. Please Login with your email"
                })
            }
            const newUser = new Users({
                email: req.body.email,
                password: hashed,
            });
            // Save user to DB
            const user = await newUser.save();
            if (!user)
                return res.status(res.status(500).json({
                    success: false,
                    message: "Registration failed. Please try again",
                    err: err
                }))
            bcrypt.hash(user.email, parseInt(process.env.BCRYPT_SALT_ROUND))
                .then((hashedEmail) => {
                    const url = `${process.env.APP_URl}:${process.env.PORT}/api/users/verify?email=${user.email}&token=${hashedEmail}`;
                    const html = `<a><b>Verify your acccount</b></a>`;
                    // console.log(`${process.env.APP_URL}/api/users/verify?email=${user.email}&token=${hashedEmail}`);
                    mailer.sendMail(user.email, html, url)
                })
                .catch()
            res.status(200).json({
                success: true,
                message: "Registration successfully",
                user
            })
            // res.redirect('/login');
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Registration failed",
                err: err
            });
        }
    }
    updateUser(req, res, next) {
        const id = req.params.id;
        Users.findOneAndUpdate(
            { _id: id },
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
            .then((user) => {
                if (user) {
                    user.save();
                    res.send('success'); // !!!! Update late
                }
                else
                    return res.send(
                        {
                            success: false,
                            message: 'Invalid parameters' // !!!! Update late
                        })
            })
            .catch(next);
    }

    deleteUser(req, res, next) {
        // res.json('delete successful')
        Users.delete(
            {
                _id: req.params.id,
            }
        )
            .then((user) => {
                if (user) {
                    return res.status(200).send(
                        {
                            success: true,
                            message: 'Delete successfully',
                        }
                    )
                }
                return res.status(400).send(
                    {
                        success: false,
                        message: 'Invalid parameters'
                    })
            })
            .catch(next);
    }

    // USER_ADDRESS controller

    createUserAddress(req, res, next) {
        const newAddress = new userAddresses({
            user_id: req.params.id,
            address: req.body.address,
            town_code: req.body.town_code,
            city_code: req.body.city_code,
            postal_code: req.body.postal_code,
            contry: req.body.contry,
            user_name: req.body.user_name,
            user_phone: req.body.user_phone,
            is_default: req.body.is_default,
        })
        if (newAddress.is_default == true) {
            userAddresses.updateMany(
                { user_id: req.params.id },
                {
                    $set: {
                        is_default: false
                    }
                }
            )
                .then()
                .catch()
        }
        newAddress.save()
            .then((newAddress) => res.status(200).json({
                success: true,
                message: 'Created user address successfully',
                newAddress
            }))
            .catch(err => {
                res.status(404).json({
                    success: false,
                    message: 'Created user address not successful',
                    err
                })

            })
    }
    async createUserAddress(req, res, next) {
        try {
            const userAddesses = await userAddresses.find({ user_id: req.params.id });
            res.status(200).json({
                success: true,
                message: 'Created user address successfully',
                userAddesses
            });
        }
        catch (err) {
            res.status(404).json({
                success: true,
                message: 'Created user address not successful',
                err
            })
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
        res.json(Date.now())
    }
}


module.exports = new UserController;
