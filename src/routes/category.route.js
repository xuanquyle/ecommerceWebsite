var express = require('express');
app = express();
const router = express.Router();
const upload = require('../app/middlewares/upload.middleware')
const categoryRoute = require('../app/controllers/category.controller')

router.get('/:id', categoryRoute.getDetailCategory)
router.get('/', categoryRoute.index)
router.post('/',upload.single("image"), categoryRoute.createNewCategory)
router.put('/:id', upload.single("image"),categoryRoute.updateCategory)
router.delete('/:id', categoryRoute.deleteCategory)

module.exports = router
