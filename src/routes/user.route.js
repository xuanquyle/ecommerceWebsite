var express = require('express');
app = express();
const router = express.Router();

const userRoute = require('../app/controllers/user.controller');
const authMiddleware = require('../app/middlewares/auth.middleware');



// REFRESH TOKEN
router.post('/auth/refresh-token', userRoute.requestRefreshToken)

//VERIFY EMAIL
router.get('/auth/verify', userRoute.verifyEmail, (req, res, next) => {
    res.send('<div><center><p style="margin-top:50px; font-size:30px">Xác thực tài khoản thành công. Vui lòng quay lại trang đăng nhập</p></center></div>')
})

// customer route 
router.post('/auth/login', userRoute.login)
router.post('/auth/register', userRoute.register)
router.post('/auth/forgot-password/:email', userRoute.forgotPassword)
router.get('/auth/verify-reset-password', userRoute.verifyResetPassword)
router.post('/auth/reset-password', userRoute.resetPassword)
router.post('/me/:id/change-password', /*authMiddleware.verifyTokenAndUserAuthorization,*/userRoute.changePassword)
router.get('/me/:id', authMiddleware.verifyTokenAndUserAuthorization, userRoute.getDetailUser)
router.put('/me/:id', /*authMiddleware.verifyTokenAndUserAuthorization,*/ userRoute.updateUser)
router.post('/me/:id/address', /*authMiddleware.verifyTokenAndUserAuthorization,*/ userRoute.createUserAddress)
router.delete('/me/:id/address/:address_id', /*authMiddleware.verifyTokenAndUserAuthorization,*/ userRoute.deleteUserAddress)
router.delete('/:id', /*authMiddleware.verifyTokenAndAdmin,*/userRoute.deleteUser)
router.get('/', /*authMiddleware.verifyTokenAndAdmin,*/ userRoute.getAllUser)


module.exports = router;
