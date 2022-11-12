
const { response } = require("express");
const { restart } = require("nodemon");
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;
const Products  = require('../models/product.model');

const { data } = require("jquery");

class ProductController {

    //--------get(/product--------)//
    async index(req, res, next) {
        //---- Promise---//
        try {
            let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
            let page
            if (req.query.page)
                page = req.query.page || 1;

            // Filtering ]
            let query = {};
            if (req.query.category_id)
                query.category_id = Object.assign({}, { category_id: req.query.category_id })
            if (req.query.max_price && req.query.min_price)
                query.filterPrice = { options: { $elemMatch: { price: { $lte: req.query.max_price, $gte: req.query.min_price } } } }
            if (req.query.max_rom && req.query.min_rom)
                query.filterRom = { options: { $elemMatch: { rom: { $lte: req.query.max_rom, $gte: req.query.min_rom } } } }
            if (req.query.max_ram && query.min_ram)
                query.filterRam = { options: { $elemMatch: { ram: { $lte: req.query.max_ram, $gte: req.query.min_ram } } } }
            Products
                .find(query.filterRom) // find tất cả các data
                .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                .limit(perPage)
                .exec((err, products) => {
                    if (err) return res.status(404).json(err);
                    if (!products || products.length == 0)
                        return res.status(400).json('Product not found');
                    return res.status(200).json(products)
                })
        }
        catch (err) {
            res.status(404).json("Can not find products")
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
    // getDetailProduct(req, res, next) {
    //     const slug = req.params.slug;


    // }
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
            category_id: data.category_id,
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
                    category_id: updateProduct.category_id
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
                    { options: { _id: new ObjectID(optionId) } }
            },
            { safe: true, multi: true }, (err, obj) => {
                if (!err) {
                    res.status(200).json(obj)
                }
                else res.status(404).json(err)
            });
    }
}
module.exports = new ProductController;
