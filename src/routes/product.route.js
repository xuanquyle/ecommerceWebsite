var express = require('express');
app = express();
const router = express.Router();
const upload = require('../app/middlewares/upload.middleware')
const productRoute = require('../app/controllers/product.controller');
const authMiddleware = require('../app/middlewares/auth.middleware')
const Products = require('../app/models/product.model');

// Product

router.get('/all-product', productRoute.getAllProduct);
router.get('/', productRoute.index);
router.post('/', /*authMiddleware.verifyTokenAndAdmin, */upload.single('thumb'), productRoute.createProduct);
router.get('/:slug', productRoute.getDetailProduct);
router.put('/restore/:id'/*, authMiddleware.verifyTokenAndAdmin*/, productRoute.restoreProduct);
router.put('/:id',/* authMiddleware.verifyTokenAndAdmin, */upload.single("thumb"), productRoute.updateProduct);
router.delete('/:id',/*authMiddleware.verifyTokenAndAdmin,*/ productRoute.deleteProduct);

// Product Options

module.exports = router;
