const Products = require('../models/product.model')
const Orders = require('../models/order.model')
class HomeController {
    async getPopulationProduct(req, res, next) {
        const orders = await Orders.find();
        let populations = {};
        if (!orders.length) res.json([]);
        orders.map(itemOrder => {
            itemOrder.orderItems.map(itemProduct => {
                if (!populations.hasOwnProperty(itemProduct.product)) populations = Object.assign(populations, { [itemProduct.product]: 0 });
                populations[itemProduct.product] += 1;
            })
        })

        const sortPopulation = Object.fromEntries(
            Object.entries(populations).sort(([, a], [, b]) => b - a)
        );
        let populationProduct = [];

        populations = Object.keys(sortPopulation)
        console.log(populations)
        for (let i in populations) {
            const product = await Products.findById(populations[i])
            if (product)
                populationProduct.push(product)
        }
        res.json(populationProduct)
    }
}
module.exports = new HomeController
