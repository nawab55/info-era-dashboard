const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/product/category.controller');

// Add a new category
router.post('/categories', categoryController.addCategory);

// Get all categories
router.get('/categories', categoryController.getCategories);

// Update category
router.put('/categories/:id', categoryController.updateCategory);

// Delete category
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const categoryController = require('../../controllers/product/category.controller');

// router.post('/categories', categoryController.addCategory);
// router.get('/categories', categoryController.getCategories);
// router.put('/categories/:id', categoryController.updateCategory);
// router.delete('/categories/:id', categoryController.deleteCategory);

// module.exports = router;