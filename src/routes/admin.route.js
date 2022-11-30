var express = require('express')
app = express();
const router = express.Router();
const adminController = require('../app/controllers/admin.controler')
const authMiddleware = require('../app/middlewares/auth.middleware')

router.get('/', authMiddleware.verifyTokenAndAdmin, adminController.dashboard)

module.exports = router;
