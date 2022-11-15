
const { response } = require("express");
const { restart } = require("nodemon");
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const Products = require('../models/product.model');

const { data } = require("jquery");

class ProductController {

    //--------get(/product--------)//
    async index(req, res, next) {
        //---- Promise---//
        try {
            let perPage = 5; // số lượng sản phẩm xuất hiện trên 1 page
            let page
            if (req.query.page)
                page = req.query.page || 1;

            // Filtering ]
            const categoryQuery = req.query.category;
            const priceQuery = req.query.max_price && req.query.min_price;
            const romQuery = req.query.max_rom && req.query.min_rom;
            const ramQuery = req.query.max_ram && req.query.min_ram;
            let filter = {}
            let query = {}

            categoryQuery ? query.category = req.query.category : query = query;

            priceQuery ?
                filter = Object.assign(filter, { price: { $lte: req.query.max_price, $gte: req.query.min_price } }) : filter = filter;
            romQuery ?
                filter = Object.assign(filter, { rom: { $lte: req.query.max_rom, $gte: req.query.min_rom } }) : filter = filter;
            ramQuery ?
                filter = Object.assign(filter, { ram: { $lte: req.query.max_ram, $gte: req.query.min_ram } }) : filter = filter;

            Object.keys(filter).length === 0 ? query = query : query.options = { $elemMatch: filter };
            const products = await Products
                .find(query)
                .populate('category')
                .sort(query.sort) // find tất cả các data
                .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                .limit(perPage)

            if (!products || products.length === 0)
                return res.status(400).json('Can not get products');
            return res.status(200).json(products)
        }
        catch (err) {
            res.status(404).json("Failed to get products")
        }
    }

    //     // ---callback---//
    //     // product.find({}, function (err, product) {
    //     //     if (!err) 
    //     //         res.json(product);
    //     //     else 
    //     //         res.status(400).json({err:'ERROR'});
    //     //   });
    // }

    // [GET] /product/:slug   //
    getDetailProduct(req, res, next) {
        Products.find({ slug: req.params.slug })
            .then(product => {
                return res.status(200).json({
                    success: true,
                    message: 'Get detail product successfully',
                    product
                })
            })
            .catch(err => {
                return res.status(200).json({
                    success: false,
                    message: 'Failed to get detail product ',
                    err
                })
            })
    }
    // // [POST] /product
    createProduct(req, res, next) {
        res.json(req.body)
        const data = req.body;
        let options = [];
        data.options.forEach(option => {
            options.push({
                color_opt: option.color_opt,
                rom_opt: option.rom_opt,
                ram_opt: option.ram_opt,
                price: option.price,
                qty: option.qty,
                image: option.image
            });
        }
        )
        const newProduct = new Products({
            name: data.name,
            description: data.description,
            short_description: data.short_description,
            thumb: data.thumb,
            category: data.category,
            options: options
        });
        // res.json(newProduct)
        newProduct.save()
            .then(product => res.status(200).send(product))
            .catch(next)
    }

    //[DELETE] /product/:id
    deleteProduct(req, res, next) {
        Products.delete(
            {
                _id: req.params.id
            }
        )
            .then((product) => {
                if (product) {
                    return res.status(200).send(
                        {
                            success: true,
                            message: 'Delete successfully',
                            product
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
    // [PUT] /products/:id/restore
    restoreProduct(req, res, next) {
        Products.restore(
            {
                _id: req.params.id
            }
        )
            .then((product) => {
                if (product) {
                    return res.status(200).send(
                        {
                            success: true,
                            message: 'Restore successfully',
                            product
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

    // [PUT] /product/:id
    updateProduct(req, res, next) {
        const id = req.params.id;
        const updateProduct = req.body;
        Products.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    name: updateProduct.name,
                    description: updateProduct.description,
                    short_description: updateProduct.short_description,
                    thumb: updateProduct.thumb,
                    category: updateProduct.category
                }
            }
        )
            .then((product) => {
                if (product) {
                    product.save();
                    res.status(200).redirect('back');
                }
                else
                    return res.status(400).send(
                        {
                            success: false,
                            message: 'Invalid parameters'
                        })
            })
            .catch(next);
    }

    //[PUT] /add-options/:id
    addOption(req, res, next) {
        const id = req.params.id;
        const newOptions = req.body;
        Products.findByIdAndUpdate(
            id,
            {
                $push: {
                    options: newOptions
                }
            }
        )
            .then(products => res.status(200).json(products))
            .catch(err => {
                res.status(404).json(err)
            })
    }

    // [DELETE] /delele-options/:id
    deleteOption(req, res, next) {
        const id = req.params.id;
        const optionId = req.params.optId;
        Products.findByIdAndUpdate(id,
            {
                "$pull":
                    { options: { _id: new ObjectId(optionId) } }
            },
            { safe: true, multi: true }, (err, obj) => {
                if (!err) {
                    res.status(200).json(obj)
                }
                else res.status(404).json(err)
            });
    }
    updateOption(req, res, next) {
        Products.findOneAndUpdate({
            _id: req.params.id,
            options: {
                $elemMatch: {
                    _id: req.body.id
                }
            }
        }, {
            $set: {
                'options.$.color': req.body.color,
                'options.$.rom': req.body.rom,
                'options.$.ram': req.body.ram,
                'options.$.price': req.body.price,
                'options.$.qty': req.body.qty
            }
        }
        )
            .then(updateProduct => {
                if (!updateProduct)
                    return res.status(200).json({
                        success: false,
                        message: 'Product option not found',
                    })
                return res.status(200).json({
                    success: true,
                    message: 'Update option successfully',
                    updateProduct
                })

            })
            .catch(err => {
                return res.status(404).json({
                    success: false,
                    message: 'Update option failed',
                    err
                })
            }
            )
    }
}

module.exports = new ProductController;
