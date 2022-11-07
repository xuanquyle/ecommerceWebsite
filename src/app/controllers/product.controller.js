const { response } = require("express");
const { restart } = require("nodemon");
const productModel = require('../models/product.model');

const productOptModel = require('../models/option.model');
const { data } = require("jquery");
const products = productModel.exp_product;
const product_opts = productModel.exp_productOpt;
const color_options = productOptModel.exp_color;
const rom_options = productOptModel.exp_rom;
const ram_options = productOptModel.exp_ram;

class ProductController {

    //--------get(/product--------)//
    index(req, res, next) {

        //---- Promise---//
        products.find({})
            .then(products => {
                // products=products.map(product=>product.toObject());
                res.status(200).send(products);
            })
            .catch()

        // ---callback---//
        // product.find({}, function (err, product) {
        //     if (!err) 
        //         res.json(product);
        //     else 
        //         res.status(400).json({err:'ERROR'});
        //   });
    }

    // [GET] /product/:slug   //
    detail(req, res, next) {
        const slug = req.params.slug;
        products.aggregate([
            {
                $addFields: {
                    product_options: 'product_options'
                }
            },
            {
                $lookup: {
                    from: 'product_opts',
                    localField: '_id',
                    foreignField: 'product_id',
                    as: 'product_options'
                }
            },
            {
                $match: { slug: slug }
            }
        ])
            .then(products => res.send(products))
            .catch(next)

    }
    // [POST] /product
    create(req, res, next) {
        const data = new products(req.body);
        data.save()
            .then(product => res.status(200).send(product))
            .catch(next)
    }
    //[DELETE] /product/:id
    delete(req, res, next) {
        products.delete(
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

    //  [GET] /product/:id/edit
    edit_product(req, res, next) {
        const id = req.params.id;

        products.findById(id)
            .then((product) => {
                product_opts.find({ product_id: id })
                    .then(product_opts => {
                        res.status(200).send({
                            product,
                            product_opts
                        })
                    })
                    .catch(next)
            })
            .catch(next);
    }
    // [PUT] /product/:id
    update(req, res, next) {
        const id = req.params.id;
        const updateProduct = req.body;
        products.findOneAndUpdate(
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


    // [GET] /product/product_opt/:id/add
    // Các input để thêm data + bảng hiển thị các option đã có của product
    getProductOpt(req, res, next) {
        const id = req.params.id;
        product_opts.find({ product_id: id })
            .then(async product_opt => {
                const color_opts = await color_options.find({})
                const rom_opts = await rom_options.find({}).sort({ code: 1 })
                const ram_opts = await ram_options.find({}).sort({ code: 1 })
                res.status(200).send({
                    product_opt,
                    options: {
                        color_opts,
                        rom_opts,
                        ram_opts
                    }
                })
            })
            .catch(next);
    }

    //[POST] /product/option
    // Chọn trong list sản phẩm đã được thêm vào db -> load lên bảng option đã có
    storedProductOpt(req, res, next) {
        products.findById(req.params.id)
            .then(async product => {
                const productOpts = await product_opts.find({ product_id: req.params.id });
                const color_opts = await color_options.find({})
                const rom_opts = await rom_options.find({}).sort({ code: 1 })
                const ram_opts = await ram_options.find({}).sort({ code: 1 })
                res.status(200).render('create_product_option', {
                    product,
                    productOpts,
                    color_opts,
                    rom_opts,
                    ram_opts
                })
            })

    }
    createProductOpt(req, res, next) {
        const product_id = req.params.id;
        const productOptions = req.body;
        let arrProductOpt = [];
        for (let i = 0; i < productOptions.color_opt.length; i++) {
            const color = productOptions.color_opt[i];
            const rom = productOptions.rom_opt[i];
            const ram = productOptions.ram_opt[i];
            const price = productOptions.price[i];
            const qty = productOptions.qty[i];
            const productOpt = {
                product_id: product_id,
                color_opt: color,
                rom_opt: rom,
                ram_opt: ram,
                price: price,
                qty: qty,
            };
            arrProductOpt.push(productOpt);
        }
        product_opts.insertMany(arrProductOpt)
            .then(productOpt => res.status(200).json(productOpt))
            .catch();
    }
    //GET /product/option/:id

    editProductOpt(req, res, next) {
        const id = req.params.id;
        product_opts.findById({ _id: id })
            .then(async product_opt => {
                const all_productOpt = await product_opts.find({ product_id: product_opt.product_id })
                const color_opts = await color_options.find({})
                const rom_opts = await rom_options.find({}).sort({ code: 1 })
                const ram_opts = await ram_options.find({}).sort({ code: 1 })
                res.status(200).send({
                    product_opt,
                    options: {
                        color_opts,
                        rom_opts,
                        ram_opts
                    },
                    all_productOpt
                })
            })
            .catch(next);
    }
    //PUT /product/option/:id
    updateProductOpt(req, res, next) {
        const id = req.params.id;
        const updateOption = req.body;
        product_opts.findByIdAndUpdate({ _id: id }, {
            rom_opt: updateOption.rom_opt,
            ram_opt: updateOption.ram_opt,
            color_opt: updateOption.color_opt,
        }).exec()
            .then(option => {
                if (option) {
                    return res.status(200).send(option);
                }
            }).then(null, err => {
                console.error(err);
                res.status(400).json(err);
            });
    }
}
module.exports = new ProductController;