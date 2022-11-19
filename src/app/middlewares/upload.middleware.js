const path = require('path')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    }, filename: function (req, file, cb) {
        cb(null, new Date() + file.filename + '-' + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ store: storage })
module.exports = upload;
