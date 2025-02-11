// const Category = require('../../models/product_model/category.model');

// // Add a new category
// exports.addCategory = async (req, res) => {
//   try {
//     const newCategory = new Category(req.body);
//     const savedCategory = await newCategory.save();
//     res.status(201).json({ savedCategory, message: "Category added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding category', error });
//   }
// };

// // Get all categories
// exports.getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.status(200).json({ categories, message: "Categories fetched successfully" });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching categories', error });
//   }
// };

// // Update category
// exports.updateCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
//     if (!updatedCategory) {
//       return res.status(404).json({ message: "Category not found" });
//     }
//     res.status(200).json({ updatedCategory, message: "Category updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating category', error });
//   }
// };

// // Delete category
// exports.deleteCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedCategory = await Category.findByIdAndDelete(id);
//     if (!deletedCategory) {
//       return res.status(404).json({ message: "Category not found" });
//     }
//     res.status(200).json({ message: "Category deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting category', error });
//   }
// };




// claudeAi 
const Category = require('../../models/product_model/category.model');

exports.addCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json({
      savedCategory,
      message: "Category added successfully"
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding category', error });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      categories,
      message: 'Categories fetched successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({
      category: updatedCategory,
      message: 'Category updated successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({
      message: 'Category deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};