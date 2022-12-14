const Categories = require('../models/category.model');
const ErrorHandler = require('../errors/errorHandler');
const fs = require('fs')
class CategoryController {
    // [GET] /api/categories
    async getAllCategory(req, res, next) {
        try {
            const categories = await Categories.find()
            if (!categories.length) throw new ErrorHandler.NotFoundError('Category not found')
            res.status(200).json(categories)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }

    // [GET] /api/categories/:id
    async getDetailCategory(req, res, next) {
        try {
            const category = await Categories.findById(req.params.id);
            if (!category) throw new ErrorHandler.NotFoundError('Category not found')
            res.status(200).json(category)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }
    // [POST] /api/categories
    async createNewCategory(req, res, next) {
        try {
            const data = JSON.parse(req.body.data)
            const categoryExist = await Categories.findOne({ name: data.name });
            if (categoryExist) {
                if (req.file && fs.existsSync(`src/public/images/${req.file.filename}`))
                    fs.unlink(`src/public/images/${req.file.filename}`, (err) => {
                        if (err) throw new Error(err.message);
                    });
                throw new ErrorHandler.BadRequestError('Category exist in database. Please try again')
            }
            const category = new Categories({
                name: data.name,
                description: data.description,
                image: req.file ? `public/images/${req.file.filename}` : ''
            })
            const createdCategory = await category.save();
            if (!createdCategory) {
                if (req.file && fs.existsSync(`src/public/images/${req.file.filename}`))
                    fs.unlink(`src/public/images/${req.file.filename}`, (err) => {
                        if (err) throw new Error(err.message);
                    });
                throw new ErrorHandler.BadRequestError('Can not create new Category. Please try again')
            }
            res.status(200).json(createdCategory)
        }
        catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }

    //[PUT] /api/categories/:id
    async updateCategory(req, res, next) {
        try {
            const data = JSON.parse(req.body.data)
            const updatedCate = await Categories.findByIdAndUpdate(req.params.id, {
                $set: {
                    name: data.name,
                    description: data.description,
                    image: req.file ? `public/images/${req.file.filename}` : ''
                }
            })
            if (!updatedCate) {
                if (req.file && fs.existsSync(`src/public/images/${req.file.filename}`))
                    fs.unlink(`src/public/images/${req.file.filename}`, (err) => {
                        if (err) throw new Error(err.message);
                    });
                throw new ErrorHandler.NotFoundError('Kh??ng t??m th???y ph??n lo???i n??y')
            }
            else {
                if (fs.existsSync(`src/${updatedCate.image}`))
                    fs.unlink(`src/${updatedCate.image}`, (err) => {
                        if (err) throw new Error(err.message);
                    });
            }
            res.status(200).json(updatedCate)

        } catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }

    // [DELETE] /api/categories/:id
    async deleteCategory(req, res, next) {
        try {
            const deletedCate = await Categories.findByIdAndDelete(req.params.id)
            if (!deletedCate) throw new ErrorHandler.NotFoundError('Kh??ng t??m th???y ph??n lo???i n??y')
            if (fs.existsSync(`src/${deletedCate.image}`))
                fs.unlink(`src/${deletedCate.image}`, (err) => {
                    if (err) throw new Error(err.message);
                });
            res.status(200).json(deletedCate)
        } catch (err) {
            throw new ErrorHandler.BadRequestError(err.message)
        }
    }
}
module.exports = new CategoryController;
