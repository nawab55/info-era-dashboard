const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/product/category.controller');

// Add a new category
router.post('/categories', categoryController.addCategory);

// Get all categories
router.get('/categories', categoryController.getCategories);

module.exports = router;
