const jwt = require('jsonwebtoken');
const ErrorHandler = require('../errors/errorHandler')
class authMiddleware {

    verifyToken(req, res, next) {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) throw new ErrorHandler.ForbiddenError('Hết thời gian đăng nhập. Vui lòng đăng nhập lại')
                req.user = user;
                next();
            });
        } else {
            throw new ErrorHandler.ForbiddenError("Vui lòng đăng nhập để thực hiện");
        }
    }
    verifyTokenAndUserAuthorization = (req, res, next) => {
        this.verifyToken(req, res, () => {
            if (req.user._id === req.params.id) {
                next();
            } else {
                throw new ErrorHandler.ForbiddenError("Vui lòng đăng nhập để thực hiện");
            }
        });
    };

    verifyTokenAndAdmin = (req, res, next) => {
        this.verifyToken(req, res, () => {
            if (req.user.id === req.params.id || req.user.isAdmin) {
                next();
            } else {
                throw new ErrorHandler.ForbiddenError("Vui lòng đăng nhập để thực hiện");
            }
        });
    };
}

module.exports = new authMiddleware;
