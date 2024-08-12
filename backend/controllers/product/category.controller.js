const Category = require('../../models/product_model/category.model');

// Add a new category
exports.addCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json({savedCategory, message: "category added in db successfully"});
  } catch (error) {
    res.status(500).json({ message: 'Error adding category', error });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({categories, message: 'fetched category data from db '});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};
