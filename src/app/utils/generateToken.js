const jwt = require('jsonwebtoken');
module.exports = {
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                isAdmin:user.isAdmin
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "2m" }
        );
    },

    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                isAdmin:user.isAdmin
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "2m" }
        );
    }
}