var express = require('express');
app = express();
const router = express.Router();

const productRoute = require('../app/controllers/product.controller');

// Product
router.get('/', productRoute.index);
router.post('/', productRoute.create);
router.get('/:slug', productRoute.detail);
router.put('/:id', productRoute.update);
router.delete('/:id', productRoute.delete);
router.get('/:id/edit', productRoute.edit_product);

// Product Options
router.get('/product-opts/:id/stored', productRoute.storedProductOpt);
router.post('/product-opts/:id', productRoute.createProductOpt);
router.get('/product-opts/:id', productRoute.editProductOpt);
router.put('/product-opts/:id', productRoute.updateProductOpt);
module.exports = router;