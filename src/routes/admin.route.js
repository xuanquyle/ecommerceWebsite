var express = require('express')
app = express();
const router = express.Router();
const adminRoute = require('../app/controllers/admin.controler')
const authMiddleware = require('../app/middlewares/auth.middleware')

router.get('/', authMiddleware.verifyTokenAndAdmin, adminRoute.dashboard)

module.exports = router;
