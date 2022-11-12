var express = require('express');
app = express();
const router= express.Router();

const userRoute = require('../app/controllers/user.controller');
const authMiddleware = require('../app/middlewares/auth.middleware');





// customer route 
router.post('/login', userRoute.login)
router.post('/register', userRoute.register)
router.get('/:id',authMiddleware.verifyToken, userRoute.getDetailUser)
router.put('/:id',authMiddleware.verifyTokenAndUserAuthorization, userRoute.updateUser)
router.delete('/:id', /*authMiddleware.verifyTokenAndAdmin,*/userRoute.deleteUser)
router.get('/',authMiddleware.verifyTokenAndAdmin,userRoute.getAllUser)

// customer_address route
router.get('/address/:id',userRoute.createUserAddress)
router.post('/address/:id/create',userRoute.createUserAddress)

// REFRESH TOKEN
router.post('/refresh-token', userRoute.requestRefreshToken)

//VERIFY EMAIL
router.post('/verify',userRoute.verifyEmail)

module.exports= router;