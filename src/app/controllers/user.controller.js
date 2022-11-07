
const { request, response } = require('express');
const { restart } = require('nodemon');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const users = userModel.exp_user;
const userAddresses = userModel.exp_user_addr;

const generateToken = require('../utils/generateToken');

class UserController {
    getAllUser(req, res, next) {
        users.find()
            .then(user => {
                delete user.password;
                res.send(user);
            })
            .catch(next);
    }

    getDetailUser(req, res, next) {
        users.findById(req.params.id)
            .then(user => {
                const { password, ...orther } = user._doc;
                res.send(...orther);
            })
            .catch(next);
    }

    async login(req, res, next) {
        try {
            const user = await users.findOne({ email: [req.body.email] });
            if (!user) {
                res.status(404).send({
                    message: 'Email address is not found',
                    err_code: 1
                })
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);

            if (!validPassword) {
                res.status(404).send({
                    message: 'Password wrong',
                    err_code: 2
                })
            }
            if (user && validPassword) {
                const accessToken = generateToken.generateAccessToken(user);
                const { password, ...orther } = user._doc;
                res.status(200).send({ ...orther,accessToken });
            }

        } catch (err) {
            res.json(err)
        }
    }
    async register(req, res, next) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const newUser = new users({
                email: req.body.email,
                password: hashed
            });
            //Save user to DB
            res.status(200).json(newUser);
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

}

module.exports = new UserController;
