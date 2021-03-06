const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');
const { getAllCategories, createCategories, updateCategories, deleteCategories, getCategoriesById } = require('./controller');

/* GET home page. */
router.get('/categories', auth, getAllCategories);
router.get('/categories/:id', auth, getCategoriesById);
// Create Category
router.post('/categories', auth, createCategories);
// update category by id
router.put('/categories/:id', auth, updateCategories);
// delete category by id
router.delete('/categories/:id', auth, deleteCategories)

module.exports = router;