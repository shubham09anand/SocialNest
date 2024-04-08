const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./socialmedia/src/Assets/images/userProfilePhoto");
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const uploadProfilePhoto = multer({ storage: storage });

module.exports = { uploadProfilePhoto };
