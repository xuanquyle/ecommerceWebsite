const jwt = require('jsonwebtoken');
const ErrorHandler = require('../errors/errorHandler')
class authMiddleware {

    verifyToken(req, res, next) {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) throw new ErrorHandler.ForbiddenError('Vui lòng đăng nhập lại')
                req.user = user;
                next();
            });
        } else {
            throw new ErrorHandler.ForbiddenError("Vui lòng đăng nhập để thực hiện");
        }
    }
    verifyTokenAndUserAuthorization = (req, res, next) => {
        this.verifyToken(req, res, () => {
            if (req.user && req.user._id === req.params.id) {
                next();
            } else {
                throw new ErrorHandler.ForbiddenError("Không có quyền truy cập");
            }
        });
    };

    verifyTokenAndAdmin = (req, res, next) => {
        this.verifyToken(req, res, () => {
            if (req.user && req.user.isAdmin) {
                next();
            } else {
                throw new ErrorHandler.ForbiddenError("Không có quyền truy cập");
            }
        });
    };
}

module.exports = new authMiddleware;
