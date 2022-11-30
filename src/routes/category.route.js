var express = require('express');
app = express();
const router = express.Router();
const upload = require('../app/middlewares/upload.middleware')
const categoryController = require('../app/controllers/category.controller')
const authMiddleware = require('../app/middlewares/auth.middleware')
router.get('/:id', categoryController.getDetailCategory)
router.get('/', categoryController.getAllCategory)
router.post('/', upload.single("image"), /*authMiddleware.verifyTokenAndAdmin,*/ categoryController.createNewCategory)
router.put('/:id', upload.single("image"), /*authMiddleware.verifyTokenAndAdmin,*/ categoryController.updateCategory)
router.delete('/:id', /*authMiddleware.verifyTokenAndAdmin,*/ categoryController.deleteCategory)

module.exports = router
