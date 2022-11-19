const productRoute= require('./product.route');
const userRoute= require('./user.route');
const cartRoute= require('./cart.route');
const categoryRoute= require('./category.route');
const orderRoute= require('./order.route');
function routes(app){
    app.use('/api/products', productRoute);
    app.use('/api/users', userRoute);
    app.use('/api/carts', cartRoute);
    app.use('/api/categories', categoryRoute);
    app.use('/api/orders', orderRoute);
    app.use('/api/upload', orderRoute);
}
module.exports = routes;
