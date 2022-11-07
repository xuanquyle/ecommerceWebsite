const productRoute= require('./product.route');
const optionRoute= require('./product.route');
const homeRoute= require('./home.route');
const userRoute= require('./user.route');

function routes(app){
    
    app.use('/api/products', productRoute);
    // app.use('/product', (req, res, next) => {res.send("hello world")});
    app.use('/api/options', optionRoute);
    app.use('/api/homes', homeRoute);
    app.use('/api/users', userRoute);
}
module.exports = routes;