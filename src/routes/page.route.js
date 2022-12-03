const express = require('express')
app = express();
const pageController = require('../app/controllers/page.controller')
const authMiddleware = require('../app/middlewares/auth.middleware')
const upload = require('../app/middlewares/upload.middleware')
const router = express.Router();

router.get('/sliders/',/*authMiddleware.verifyTokenAndAdmin,*/ pageController.getAllSlider)
router.post('/sliders/',/*authMiddleware.verifyTokenAndAdmin,*/upload.single("image"),  pageController.addSlider)
router.delete('/sliders/:id',/*authMiddleware.verifyTokenAndAdmin,*/upload.single("image"),  pageController.deleteSlider)
router.get('/contact/',/*authMiddleware.verifyTokenAndAdmin,*/upload.single("image"),  pageController.getContact)
router.post('/contact/',/*authMiddleware.verifyTokenAndAdmin,*/upload.single("image"),  pageController.addContact)
router.put('/contact/:id',/*authMiddleware.verifyTokenAndAdmin,*/upload.single("image"),  pageController.updateContact)

module.exports = router;
