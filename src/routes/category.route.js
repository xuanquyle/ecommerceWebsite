var express = require('express');
app = express();
const router = express.Router();

const categoryRoute = require('../app/controllers/category.controller')

router.get('/:id', categoryRoute.getDetailCategory)
router.get('/', categoryRoute.index)
router.post('/', categoryRoute.createNewCategory)
router.put('/:id', categoryRoute.updateCategory)
router.delete('/:id', categoryRoute.deleteCategory)

module.exports = router
