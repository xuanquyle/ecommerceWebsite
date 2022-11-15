const productRoute= require('./product.route');
const userRoute= require('./user.route');
const cartRoute= require('./cart.route');
const categoryRoute= require('./category.route');
function routes(app){
    app.use('/api/products', productRoute);
    app.use('/api/users', userRoute);
    app.use('/api/carts', cartRoute);
    app.use('/api/categories', categoryRoute);
}
module.exports = routes;
