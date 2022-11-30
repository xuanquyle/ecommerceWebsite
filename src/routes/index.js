const ErrorMiddleware = require('../app/middlewares/err.middleware')
const productRoute = require('./product.route');
const userRoute = require('./user.route');
const cartRoute = require('./cart.route');
const categoryRoute = require('./category.route');
const orderRoute = require('./order.route');
const adminRoute = require('./admin.route');
const userController = require('../app/controllers/user.controller');
function routes(app) {
    app.use('/api/products', productRoute);
    app.use('/api/users', userRoute);
    app.use('/api/carts', cartRoute);
    app.use('/api/categories', categoryRoute);
    app.use('/api/orders', orderRoute);
    app.use('/api/admin', adminRoute);
    app.use(ErrorMiddleware)
}

module.exports = routes;
