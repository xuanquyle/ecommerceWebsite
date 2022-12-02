const Users = require('../models/user.model')
const Products = require('../models/product.model')
const Orders = require('../models/order.model')
const Categories = require('../models/category.model')

class AdminController {
    async dashboard(req, res, next) {
        try {
            const countProduct = await Products.countDocuments();
            const countUser = await Users.countDocumentsWithDeleted();
            const countOrder = await Orders.countDocumentsWithDeleted();
            const categories = await Categories.find();
            let productWithCate = {};

            if (categories.length) {
                categories.map(async item => {
                    const product = await Products.find({ category: item._id })
                    if (!productWithCate.hasOwnProperty(item.name)) productWithCate = Object.assign(productWithCate, { [item.name]: [] })
                    productWithCate[item.name] = product;
                })
            }

            let dashboard = {};
            countProduct ? dashboard.countProduct = countProduct : dashboard.countProduct = 0;
            countUser ? dashboard.countUser = countUser : dashboard.countUser = 0;
            countOrder ? dashboard.countOrder = countOrder : dashboard.countOrder = 0;

            const yearNow = new Date().getFullYear()
            const salesEachMonth = {
                '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0,
            };
            const orders = await Orders.findWithDeleted()

            if (orders)
                orders.map(order => {
                    if (order.createdAt.getFullYear() == yearNow && order.status.deliveredAt !== null) {
                        salesEachMonth[order.createdAt.getMonth() + 1] += order.totalPrice;
                    }
                })
            dashboard = Object.assign(dashboard, { salesEachMonth }, { categoryProduct: productWithCate })
            res.status(200).json(dashboard)
        }
        catch (err) { throw new Error(err.message) }
    }
}
module.exports = new AdminController;
