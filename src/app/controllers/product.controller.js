const { response } = require("express");
const { restart } = require("nodemon");


const productModel = require('../models/product.model');
const products = productModel.exp_product;
const colorOpts = productModel.exp_colorOpt;
const ramOpts = productModel.exp_ramOpt;
const romOpts = productModel.exp_romOpt;
const sizeOpts = productModel.exp_sizeOpt;
const warrantyOpts = productModel.exp_warrantyOpt;
const category = productModel.exp_category
class ProductController {

    index(req, res, next) {

        products.aggregate([
            {
                $lookup: {
                    from: 'rom_opts',
                    localField: 'sku.rom_code',
                    foreignField: 'code',
                    as: 'rom'
                }
            },
            {
                $unwind: '$rom'
            },
            {
                $lookup: {
                    from: 'size_opts',
                    localField: 'sku.size_code',
                    foreignField: 'code',
                    as: 'size'
                }
            },
            {
                $unwind: '$size'
            },
            {
                $lookup: {
                    from: 'warranty_opts',
                    localField: 'sku.warranty_code',
                    foreignField: 'code',
                    as: 'warranty'
                }
            },
            {
                $unwind: '$warranty'
            },
            {
                $lookup: {
                    from: 'ram_opts',
                    localField: 'sku.ram_code',
                    foreignField: 'code',
                    as: 'ram'
                }
            },
            {
                $unwind: '$ram'
            },
            {
                $lookup: {
                    from: 'color_opts',
                    localField: 'sku.color_code',
                    foreignField: 'code',
                    as: 'color'
                }
            },
            {
                $unwind: '$color'
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category_id',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            }
        ])
            .then(products => res.json(products))
            .catch(next);

        //---- Promise---//
        // products.find({})
        //     .then(products => {
        //         // products=products.map(product=>product.toObject());
        //         res.status(200).json(products);
        //     })
        //     .catch()


        // ---callback---//
        // product.find({}, function (err, product) {
        //     if (!err) 
        //         res.json(product);
        //     else 
        //         res.status(400).json({err:'ERROR'});
        //   });
    }

    detail(req, res, next) {
        // products.findOne({ slug: req.params.slug })
        //     .then(product => res.json(product))
        //     .catch(next);
        products.aggregate([
            {
                $lookup: {
                    from: 'rom_opts',
                    localField: 'sku.rom_code',
                    foreignField: 'code',
                    as: 'rom'
                }
            },
            {
                $unwind: '$rom'
            },
            {
                $lookup: {
                    from: 'size_opts',
                    localField: 'sku.size_code',
                    foreignField: 'code',
                    as: 'size'
                }
            },
            {
                $unwind: '$size'
            },
            {
                $lookup: {
                    from: 'warranty_opts',
                    localField: 'sku.warranty_code',
                    foreignField: 'code',
                    as: 'warranty'
                }
            },
            {
                $unwind: '$warranty'
            },
            {
                $lookup: {
                    from: 'ram_opts',
                    localField: 'sku.ram_code',
                    foreignField: 'code',
                    as: 'ram'
                }
            },
            {
                $unwind: '$ram'
            },
            {
                $lookup: {
                    from: 'color_opts',
                    localField: 'sku.color_code',
                    foreignField: 'code',
                    as: 'color'
                }
            },
            {
                $unwind: '$color'
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category_id',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            },
            {
                $match: {'slug':req.params.slug}
            }

        ])
            .then(products => res.json(products))
            .catch(next);

    }
    create(req, res, next) {
        const data = new products(req.body);
        data.save() // create, insertMany
            .then(() => res.status(201).redirect('/product'))
            .catch(next);
    }
    delete(req, res, next) {
        products.findOne({ slug: req.params.slug })
            .then(product => {
                product.remove()
                    .then(() => res.status(200).redirect('/product'))
                    .catch(next);
            })
            .catch(next);
    }
}
module.exports = new ProductController;