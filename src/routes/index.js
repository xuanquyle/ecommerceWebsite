const productRoute= require('./product.route');
const userRoute= require('./user.route');

function routes(app){
    app.use('/api/products', productRoute);
    app.use('/api/users', userRoute);
}
module.exports = routes;
