const productModel = require('../models/product.model');
const products = productModel.exp_product;

class HomeController {
    async index(req, res, next) {
        const allProduct = await products.aggregate([
            {
                $addFields:
                {
                    product_id: { $toString: '$_id' }
                }
            },
            {
                $lookup:
                {
                    from: 'product_opts',
                    localField: 'product_id',
                    foreignField: 'product_id',
                    as: 'product_opts'
                }
            },
            {
                $project: {
                    product_id: 0
                }
            }]
        )
        res.json(allProduct)
    }
}
module.exports = new HomeController;