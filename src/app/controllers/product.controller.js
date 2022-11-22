
const { response } = require("express");
const { restart } = require("nodemon");
const mongodb = require('mongodb');
const Products = require('../models/product.model');
const ErrorHandler = require('../errors/errorHandler');
const fs = require('fs');

class ProductController {

    //--------get(/product--------)//
    async index(req, res, next) {
        //---- Promise---//
        try {
            let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
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
            if (!products.length)
                throw new ErrorHandler.NotFoundError('Can not get products');
            return res.status(200).json(products)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError('err.message');
        }
    }
    async getAllProduct(req, res, next) {
        try {
            const products = await Products.find();
            if (!products.length) throw new ErrorHandler.NotFoundError('Product not found');
            return res.status(200).json(products)
        }
        catch (err) {
            throw new ErrorHandler.NotFoundError(err.message);
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
    async getDetailProduct(req, res, next) {
        try {
            const product = await Products.findOne({ slug: req.params.slug });
            if (!product) throw new ErrorHandler.NotFoundError('Product not found');
            return res.status(200).json(product)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message);
        }
    }
    // // [POST] /product
    async createProduct(req, res, next) {
        try {
            let err = [];
            req.body.name ? err : err.push({ name: 'Product name is required' });
            req.body.description ? err : err.push({ description: 'Product description is required' });
            req.body.short_description ? err : err.push({ short_description: 'Product short_description is required' });
            req.body.category ? err : err.push({ category: 'Product category is required' });
            const data = req.body.data;
            const productExist = await Products.findOne({ name: data.name });
            const productDeleted = await Products.findOneDeleted({ name: data.name });
            if (productExist) {
                if (req.file && fs.existsSync(`src/public/images/${req.file.filename}`))
                    fs.unlink(`src/public/images/${req.file.filename}`, (err) => {
                        if (err) throw new Error(err.message);
                    });
                throw new ErrorHandler.BadRequestError('Sản phẩm đã tồn tại. Vui lòng thử lai')
            }
            if (productDeleted) {
                if (req.file && fs.existsSync(`src/public/images/${req.file.filename}`))
                    fs.unlink(`src/public/images/${req.file.filename}`, (err) => {
                        if (err) throw new Error(err.message);
                    });
                throw new ErrorHandler.BadRequestError('Sản phẩm đã bị xóa gần đây. Vui lòng thử lai')
            }
            let options = [];
            if (data.options)
                data.options.forEach(option => {
                    option = {
                        color: option.color,
                        rom: option.rom,
                        ram: option.ram,
                        price: option.price,
                        qty: option.qty,
                        image: option.image
                    }
                    if (!options.filter(value =>
                        value.color == option.color
                        && value.rom == option.rom
                        && value.ram == option.ram).length > 0) {
                        options.push(option)
                    }
                    else {
                        console.log('Một số lựa chọn đã có sẵn')
                    }
                })
            const newProduct = new Products({
                name: data.name,
                description: data.description,
                short_description: data.short_description,
                thumb: req.file ? `public/images/${req.file.filename}` : '',
                category: data.category,
                options: options
            });
            const productCreated = await newProduct.save()
            if (!productCreated) {
                if (req.file && fs.existsSync(`src/ public / images / ${req.file.filename}`))
                    fs.unlink(`src / public / images / ${req.file.filename}`, (err) => {
                        if (err) throw new Error(err.message);
                    });
                throw new ErrorHandler.BadRequestError('Can not create product')
            }
            res.status(200).json(newProduct)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }

    //[DELETE] /product/:id
    async deleteProduct(req, res, next) {
        try {
            const product = await Products.delete({ _id: req.params.id })
            if (!product)
                throw new ErrorHandler.NotFoundError('Product not found')
            res.json('Delete product successfully')
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }

    hardDeleteProduct(req, res, next) {

    }
    // [PUT] /products/:id/restore
    async restoreProduct(req, res, next) {
        try {
            const productRestore = await Products.restore({ _id: req.params.id })
            if (!productRestore) throw new ErrorHandler.NotFoundError('Product not found')
            res.json(productRestore)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }

    // [PUT] /product/:id
    async updateProduct(req, res, next) {
        try {
            const updateProduct = await Products.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        name: req.body.name,
                        description: req.body.description,
                        short_description: req.body.short_description,
                        thumb: req.file.filename,
                        category: req.body.category,
                        options: req.body.options
                    }
                }
            )
            if (!updateProduct) throw new ErrorHandler.NotFoundError('Product not found')
            if (fs.existsSync(`src / public / images / ${updateProduct.thumb}`))
                fs.unlink(`src / public / images / ${updateProduct.thumb}`, (err) => {
                    if (err) throw new Error(err.message);
                });

            res.status(200).json(`Update product ${updateProduct._id} successfully`)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }
}
module.exports = new ProductController;
