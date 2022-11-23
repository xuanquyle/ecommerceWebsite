var express = require('express');
app = express();
const router = express.Router();

const userRoute = require('../app/controllers/user.controller');
const authMiddleware = require('../app/middlewares/auth.middleware');



// REFRESH TOKEN
router.post('/auth/refresh-token', userRoute.requestRefreshToken)

//VERIFY EMAIL
router.get('/auth/verify', userRoute.verifyEmail)

// customer route 
router.post('/auth/login', userRoute.login)
router.post('/auth/register', userRoute.register)
router.get('/me/:id', authMiddleware.verifyTokenAndUserAuthorization, userRoute.getDetailUser)
router.put('/:id', /*authMiddleware.verifyTokenAndUserAuthorization,*/ userRoute.updateUser)
router.delete('/:id', /*authMiddleware.verifyTokenAndAdmin,*/userRoute.deleteUser)
router.get('/', /*authMiddleware.verifyTokenAndAdmin,*/ userRoute.getAllUser)

// customer_address route
router.post('/address/:id/add', userRoute.createUserAddress)
router.delete('/address/:id/delete/:address_id', userRoute.deleteUserAddress)


module.exports = router;
