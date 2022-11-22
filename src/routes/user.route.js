var express = require('express');
app = express();
const router = express.Router();

const userRoute = require('../app/controllers/user.controller');
const authMiddleware = require('../app/middlewares/auth.middleware');



// REFRESH TOKEN
router.post('/refresh-token', userRoute.requestRefreshToken)

//VERIFY EMAIL
router.get('/verify', userRoute.verifyEmail)

// customer route 
router.post('/login', userRoute.login)
router.post('/register', userRoute.register)
router.get('/:id', /*authMiddleware.verifyTokenAndUserAuthorization,*/ userRoute.getDetailUser)
router.put('/:id', /*authMiddleware.verifyTokenAndUserAuthorization,*/ userRoute.updateUser)
router.delete('/:id', /*authMiddleware.verifyTokenAndAdmin,*/userRoute.deleteUser)
router.get('/', /*authMiddleware.verifyTokenAndAdmin,*/ userRoute.getAllUser)

// customer_address route
router.post('/address/:id/add', userRoute.createUserAddress)
router.delete('/address/:id/delete/:address_id', userRoute.deleteUserAddress)
router.get('/address/:id/detail/:address_id', userRoute.getDetailAddress)


module.exports = router;
