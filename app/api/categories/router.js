const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');
const { getAllCategories } = require('./controller');

/* GET home page. */
router.get('/categories', auth, getAllCategories);

module.exports = router;