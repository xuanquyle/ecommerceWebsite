const productRoute= require('./product.route');

function routes(app){
    
    app.use('/product', productRoute);
    // app.use('/product', (req, res, next) => {res.send("hello world")});
    
}
module.exports = routes;