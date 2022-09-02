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
                "$lookup": {
                    "from": "user",
                    "let": { "userId": "$_id" },
                    "pipeline": [
                        { "$addFields": { "userId": { "$toObjectId": "$userId" } } },
                        { "$match": { "$expr": { "$eq": ["$userId", "$$userId"] } } }
                    ],
                    "as": "output"
                }
            },
            {
                "$lookup": {
                    "from": "user",
                    "let": { "userId": "$_id" },
                    "pipeline": [
                        { "$addFields": { "userId": { "$toObjectId": "$userId" } } },
                        { "$match": { "$expr": { "$eq": ["$userId", "$$userId"] } } }
                    ],
                    "as": "output"
                }
            },
            {
                $lookup: {
                    from: 'categorys',
                    localField: 'category_id',
                    foreignField: '_id',
                    as: 'category'
                }
            }])
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
        products.findOne({ slug: req.params.slug })
            .then(product => { res.status(200).json(product) })
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