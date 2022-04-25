const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');
const controller = require('./controller');
const upload = require('../../middlewares/multer')

// 'image' is based on body request, it can be any string
router.post('/uploads', auth, upload.single('image'), controller.uploadImage);

module.exports = router;