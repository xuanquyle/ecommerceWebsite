const pageModel = require('../models/page.model')
const Sliders = pageModel.Slider;
const Contact = pageModel.Contact;
const ErrorHandler = require('../errors/errorHandler')
const fs = require('fs')
class PageController {
    async getAllSlider(req, res, next) {
        try {
            const sliders = await Sliders.find();
            if (!sliders.length) res.json([])
            res.json(sliders)
        } catch (error) {
            throw new ErrorHandler.BadRequestError(error.message)
        }
    }
    async addSlider(req, res, next) {
        try {
            // const data = JSON.parse(req.body.data);
            const data = req.body;
            const countSlider = await Sliders.countDocuments();
            if (countSlider > 5) throw new ErrorHandler.BadRequestError('Chỉ cho phép lưu tối đa 6 slide')
            if (!req.file) throw new ErrorHandler.ValidationError('Không tìm thấy ảnh slider')

            const slider = new Sliders({
                image: req.file ? `public/images/${req.file.filename}` : '',
                description: data.description
            })
            const addedSlider = await slider.save();
            if (!addedSlider) {
                if (fs.existsSync(`src/public/images/${req.file.filename}`))
                    fs.unlink(`src/public/images/${req.file.filename}`, (err) => {
                        if (err) throw new Error(err.message);
                    });
                throw new ErrorHandler.BadRequestError('Có lỗi xảy ra. Please thử lại')
            }

            res.json(addedSlider)
        }
        catch (error) {
            throw new ErrorHandler.BadRequestError(error.message)
        }

    }
    async deleteSlider(req, res, next) {
        try {
            const slider = await Sliders.findByIdAndDelete(req.params.id);
            if (!slider) throw new ErrorHandler.NotFoundError('Không tìm thấy slider')
            if (fs.existsSync(`src/${slider.image}`))
                fs.unlink(`src/${slider.image}`, (err) => {
                    if (err) throw new Error(err.message);
                });
            res.json(slider)
        } catch (error) {
            throw new ErrorHandler.BadRequestError(error.message)
        }
    }

    async addContact(req, res, next) {
        try {
            const contact = new Contact({
                email: req.body.email,
                facebook: req.body.facebook,
                zalo: req.body.zalo,
                instagram: req.body.instagram
            })
            const addedContact = await contact.save()
            if (!addedContact) throw new ErrorHandler.BadRequestError('Có lỗi xảy ra. Thử lại sau')
            res.json(addedContact)
        } catch (error) {
            throw new ErrorHandler.BadRequestError(error.message)
        }
    }
    async updateContact(req, res, next) {
        try {
            const updatedContact = await Contact.findByIdAndUpdate(req.params.id,
                {
                    $set: {
                        email: req.body.email,
                        facebook: req.body.facebook,
                        zalo: req.body.zalo,
                        instagram: req.body.instagram
                    }
                }
            )
            if (!updatedContact) throw new ErrorHandler.NotFoundError('Không tìm thấy thông tin')
            res.json(updatedContact)
        } catch (error) {
            throw new ErrorHandler.BadRequestError(error.message)
        }
    }
}

module.exports = new PageController;
