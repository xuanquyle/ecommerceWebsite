var express = require('express');
app = express();
const router = express.Router();
const upload = require('../app/middlewares/upload.middleware')
const categoryRoute = require('../app/controllers/category.controller')
const authMiddleware = require('../app/middlewares/auth.middleware')
router.get('/:id', categoryRoute.getDetailCategory)
router.get('/', categoryRoute.getAllCategory)
router.post('/', upload.single("image"), /*authMiddleware.verifyTokenAndAdmin,*/ categoryRoute.createNewCategory)
router.put('/:id', upload.single("image"), /*authMiddleware.verifyTokenAndAdmin,*/ categoryRoute.updateCategory)
router.delete('/:id', /*authMiddleware.verifyTokenAndAdmin,*/ categoryRoute.deleteCategory)

module.exports = router
