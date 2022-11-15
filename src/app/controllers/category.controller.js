const Categories = require('../models/category.model');

class CategoryController {
    // [GET] /api/categories
    index(req, res, next) {
        Categories.find()
            .then(categories => res.status(200).json({
                success: true,
                message: 'Get category successfully',
                categories
            }))
            .catch(err => res.status(500).json({
                success: true,
                message: 'Get category not successful',
                err
            }))
    }

    // [GET] /api/categories/:id
    getDetailCategory(req, res, next) {
        Categories.findById(req.params.id)
            .then(category => res.status(200).json({
                success: true,
                message: 'Get category successfully',
                category
            }))
            .catch(err => res.status(500).json({
                success: true,
                message: 'Get category not successful',
                err
            }))
    }
    // [POST] /api/categories
    createNewCategory(req, res, next) {
        
    }

    //[PUT] /api/categories/:id
    updateCategory(req, res, next) {
    }

    // [DELETE] /api/categories/:id
    deleteCategory(req, res, next) {
    }
}
module.exports = new CategoryController;
