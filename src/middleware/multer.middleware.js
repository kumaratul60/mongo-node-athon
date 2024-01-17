import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // cb(null, file.fieldname + '-' + uniqueSuffix);

        // todo: poc on file.originalname & uniqueSuffix
        cb(null, file.originalname);
    }
});

const upload = multer({
    // storage: storage

    // es6
    storage,
});

export default upload;