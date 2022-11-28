const jwt = require('jsonwebtoken');
module.exports = {
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                _id: user._id,
                isAdmin:user.isAdmin
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: process.env.JWT_ACCESS_TIME }
        );
    },

    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                _id: user._id,
                isAdmin:user.isAdmin
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: process.env.JWT_REFRESH_TIME }
        );
    }
}
