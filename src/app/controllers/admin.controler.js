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
            const countCategory = await Categories.countDocuments();

            let dashboard = {};
            countProduct ? dashboard.countProduct = countProduct : dashboard.countProduct = 0;
            countUser ? dashboard.countUser = countUser : dashboard.countUser = 0;
            countOrder ? dashboard.countOrder = countOrder : dashboard.countOrder = 0;
            countCategory ? dashboard.countCategory = countCategory : dashboard.countCategory = 0;

            const yearNow = new Date().getFullYear()
            const orderEachMonth = {
                '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0,
            };
            const orders = await Orders.findWithDeleted()

            if (orders)
                orders.map(order => {
                    if (order.createdAt.getFullYear() == yearNow) {
                        orderEachMonth[order.createdAt.getMonth()] += 1
                    }
                })
            dashboard = Object.assign(dashboard, { orderEachMonth })
            res.status(200).json(dashboard)
        }
        catch (err) { throw new Error(err.message) }
    }
}
module.exports = new AdminController;
