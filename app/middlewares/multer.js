// this middleware is for handle file/image upload
const multer = require('multer');

// set the destinations folder to store the image and set the image name
const storage = multer.diskStorage({
  // set the destination where the file/image will be stored
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  // set the file name, give the time format in the front of file name
  // to avoid the same file name
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // set the filter of the type that can be upload
  // other than that type will return false and get the error message
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    // reject the file
    cb(null, false);
  }
}

// set the multer object property
const uploadMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = uploadMiddleware;