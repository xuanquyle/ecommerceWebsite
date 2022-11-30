var express = require('express');
app = express();
const router = express.Router();
const upload = require('../app/middlewares/upload.middleware')
const productController = require('../app/controllers/product.controller');
const authMiddleware = require('../app/middlewares/auth.middleware')

// Product

router.get('/all-product', productController.getAllProduct);
router.get('/', productController.index);
router.post('/', /*authMiddleware.verifyTokenAndAdmin, */upload.single('thumb'), productController.createProduct);
router.get('/:slug', productController.getDetailProduct);
router.put('/restore/:id'/*, authMiddleware.verifyTokenAndAdmin*/, productController.restoreProduct);
router.put('/:id',/* authMiddleware.verifyTokenAndAdmin, */upload.single("thumb"), productController.updateProduct);
router.delete('/:id',/*authMiddleware.verifyTokenAndAdmin,*/ productController.deleteProduct);

// Product Options

module.exports = router;
