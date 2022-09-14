const { response } = require("express");
const { restart } = require("nodemon");


const productModel = require('../models/product.model');
const products = productModel.exp_product;
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
            },
            {
                $match: { isActive: true }
            }
        ])
            .then(products => res.status(200).json(
                {
                    success: true,
                    products: products,
                }))
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

        const slug = req.params.slug;
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
                $match: { $and: [{ isActive: true }, { slug: slug }] }

            }

        ])
            .then(products => res.status(200).json(
                {
                    success: true,
                    products
                }))
            .catch(next);

    }
    create(req, res, next) {
        const data = new products(req.body);
        data.save() // create, insertMany
            .then(() => res.status(201).json(
                {
                    success: true,
                    message: 'Create successfully'
                }
            ))
            .catch(next);
    }
    delete(req, res, next) {
        const slug = req.params.slug;
        products.findByIdAndUpdate(
            { slug: slug },
            { $set: { isActive: 0 } },
        )
            .then((product) => {
                if (product)
                    return res.status(200).json(
                        {
                            success: true,
                            message: 'Delete successfully',
                            product
                        }
                    )
                return res.status(500).json(
                    {
                        success: false,
                        message: 'Invalid parameters'
                    })
            })
            .catch(next);
    }
    update(req, res, next) {
        const slug = req.params.slug;
        const updateProduct = req.body;
        products.findOneAndUpdate(
            { slug: slug },
            { $set: updateProduct }
        )
            .then((product) => {
                if (product)
                    return res.status(200).json(
                        {
                            success: true,
                            message: 'Update successfully',
                            product
                        }
                    )
                return res.status(500).json(
                    {
                        success: false,
                        message: 'Invalid parameters'
                    })
            })

            .catch(next);
    }
}
module.exports = new ProductController;