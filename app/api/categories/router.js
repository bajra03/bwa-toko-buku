const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');
const { getAllCategories, createCategories, updateCategories } = require('./controller');

/* GET home page. */
router.get('/categories', auth, getAllCategories);
// Create Category
router.post('/categories', auth, createCategories);
// update category by id
router.put('/categories/:id', auth, updateCategories);

module.exports = router;