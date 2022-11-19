var express = require('express');
app = express();
const router = express.Router();
const multer = require('multer');
const upload = require('../app/middlewares/upload.middleware')

const productRoute = require('../app/controllers/product.controller');
const authMiddleware = require('../app/middlewares/auth.middleware')
// Product
router.get('/', productRoute.index);
router.get('/all-product', productRoute.index);
router.post('/', upload.fields({name:'option_image', maxCount:10}),/*authMiddleware.verifyTokenAndAdmin, */ productRoute.createProduct);
router.get('/:slug', productRoute.getDetailProduct);
router.put('/update/:id/restore'/*, authMiddleware.verifyTokenAndAdmin*/, productRoute.restoreProduct);
router.put('/update/:id/add-options',/* authMiddleware.verifyTokenAndAdmin, */ productRoute.addOption);
router.put('/update/:id/update-options/:option_id',/*authMiddleware.verifyTokenAndAdmin, */ productRoute.updateOption);
router.put('/:id',/* authMiddleware.verifyTokenAndAdmin, */ productRoute.updateProduct);
router.delete('/update/:id/delete-options/:option_id'/*,authMiddleware.verifyTokenAndAdmin*/, productRoute.deleteOption);
router.delete('/:id',/*authMiddleware.verifyTokenAndAdmin,*/ productRoute.deleteProduct);

// Product Options

module.exports = router;
