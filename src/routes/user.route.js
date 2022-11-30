var express = require('express');
app = express();
const router = express.Router();

const userController = require('../app/controllers/user.controller');
const authMiddleware = require('../app/middlewares/auth.middleware');



// REFRESH TOKEN
router.post('/auth/refresh-token', userController.requestRefreshToken)

//VERIFY EMAIL
router.get('/auth/verify', userController.verifyEmail,(notify, req, res, next) => {
    res.render('signup_notify', { notify: notify })
} )

// customer route 
router.post('/auth/login', userController.login)
router.post('/auth/register', userController.register)
router.post('/auth/forgot-password/:email', userController.forgotPassword)
router.get('/auth/verify-reset-password', userController.verifyResetPassword)
router.post('/auth/reset-password', userController.resetPassword)
router.post('/me/:id/change-password', /*authMiddleware.verifyTokenAndUserAuthorization,*/userController.changePassword)
router.get('/me/:id', authMiddleware.verifyTokenAndUserAuthorization, userController.getDetailUser)
router.put('/me/:id', /*authMiddleware.verifyTokenAndUserAuthorization,*/ userController.updateUser)
router.post('/me/:id/address', /*authMiddleware.verifyTokenAndUserAuthorization,*/ userController.createUserAddress)
router.delete('/me/:id/address/:address_id', /*authMiddleware.verifyTokenAndUserAuthorization,*/ userController.deleteUserAddress)
router.delete('/:id', /*authMiddleware.verifyTokenAndAdmin,*/userController.deleteUser)
router.get('/', /*authMiddleware.verifyTokenAndAdmin,*/ userController.getAllUser)


module.exports = router;
