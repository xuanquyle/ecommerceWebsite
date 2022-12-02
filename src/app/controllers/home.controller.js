const Products = require('../models/product.model')
const Orders = require('../models/order.model')
class HomeController {
    async getPopulationProduct(req, res, next) {
        const orders = await Orders.find();
        const products = await Products.find();
        let populations = {};
        if (!orders.length) if (products.length) res.json(products);
        orders.map(itemOrder => {
            itemOrder.orderItems.map(itemProduct => {
                if (!populations.hasOwnProperty(itemProduct.product)) populations = Object.assign(populations, { [itemProduct.product]: 0 });
                populations[itemProduct.product] += 1;
            })
        })

        const sortPopulation = Object.fromEntries(
            Object.entries(populations).sort(([, a], [, b]) => b - a)
        );
        populations = Object.fromEntries(
            Object.entries(sortPopulation).slice(0, 9))


        res.json(populations)
    }
}
module.exports = new HomeController
