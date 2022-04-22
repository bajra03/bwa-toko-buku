const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');
const { getAllCategories, createCategory } = require('./controller');

/* GET home page. */
router.get('/categories', auth, getAllCategories);

// Create Category
router.post('/categories', auth, createCategory);

module.exports = router;