
const { request, response } = require('express');
const { restart } = require('nodemon');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const users = userModel.exp_user;
const userAddresses = userModel.exp_user_addr;

const jwt = require('jsonwebtoken');

let refreshTokens = [];
const generateToken = require('../utils/generateToken');
const authMiddleware = require('../middlewares/auth.middleware');

class UserController {
    getAllUser(req, res, next) {
        users.find()
            .then(user => {
                delete user.password;
                res.json(user);
            })
            .catch(next);
    }

    getDetailUser(req, res, next) {
        try {
            users.findById(req.params.id)
                .then(user => {
                    const { password, ...orther } = user._doc;
                    res.json({ ...orther });
                })
                .catch(next);
        }
        catch {
            res.json("User is not found")
        }
    }

    async login(req, res, next) {
        try {
            const user = await users.findOne({ email: [req.body.email] });
            if (!user) {
                res.status(404).json({
                    message: 'Email address is not found',
                    err_code: 1
                })
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);

            if (!validPassword) {
                res.status(404).json({
                    message: 'Password wrong',
                    err_code: 2
                })
            }
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
                res.status(200).json({ ...orther, accessToken });
            }

        } catch (err) {
            res.json(err)
        }
    }
    async register(req, res, next) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const emailExisted = await users.findOne({ email: req.body.email })
            if (emailExisted) {
                res.json({
                    err_code: 1,
                    message: "Email account is registered before"
                })
            }
            const newUser = new users({
                email: req.body.email,
                password: hashed,
                verifiedAt: new Date(Date.now())
            });
            //Save user to DB
            res.json(newUser)
            const user = await newUser.save();
        } catch (err) {
            res.status(500).json(err);
        }
    }
    updateUser(req, res, next) {
        const id = req.params.id;
        users.findOneAndUpdate(
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
        users.delete(
            { id: req.params.id }
        )
            .then((user) => {
                if (user) {
                    return res.status(200).send(
                        {
                            success: true,
                            message: 'Delete successfully',
                            user
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
            .then((newAddress) => res.send({
                message: 'created user address successfully',
                newAddress
            }))
            .catch(next);
    }
    userAddress(req, res, next) {
        users.findById(req.params.id)
            .then(async user => {
                const userAddesses = await userAddresses.find({ user_id: user.id });
                res.send({
                    user,
                    userAddesses
                })

            })
            .catch(next);

    }
    // REQUEST REFRESH TOKEN
    requestRefreshToken(req, res, next) {
        const refreshToken = req.cookies.refreshToken;
        
        //Send error if token is not valid
        if (!refreshToken) return res.status(401).json("You're not authenticated");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                res.json(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            //create new access token, refresh token and send to user
            const newAccessToken = generateToken.generateAccessToken(user);
            const newRefreshToken = generateToken.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
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
}


module.exports = new UserController;
