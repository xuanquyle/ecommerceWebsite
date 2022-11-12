var express = require('express');
app = express();
const router = express.Router();

const productRoute = require('../app/controllers/product.controller');
const authMiddleware = require('../app/middlewares/auth.middleware')
// Product
router.get('/', productRoute.index);
router.post('/' /*,authMiddleware.verifyTokenAndAdmin*/, productRoute.createProduct);
router.get('/:slug', productRoute.index);
router.put('/update/:id/restore',/*authMiddleware.verifyTokenAndAdmin,*/ productRoute.restoreProduct);
router.put('/update/:id/add-options',authMiddleware.verifyTokenAndAdmin, productRoute.addOption);
router.put('/:id',authMiddleware.verifyTokenAndAdmin, productRoute.updateProduct);
router.delete('/update/:id/delete-options/:optId'/*,authMiddleware.verifyTokenAndAdmin*/, productRoute.deleteOption);
router.delete('/:id',/*authMiddleware.verifyTokenAndAdmin,*/ productRoute.deleteProduct);

// Product Options

module.exports = router;
