const express = require('express');
const router = express.Router();
const blogController = require("../../controllers/blog/blog.controller");

// Route to add a new blog post
router.post("/create", blogController.createBlog);

// Route to get all blog posts
router.get("/all", blogController.getAllBlogs);

// Route to delete a blog post by ID
router.delete("/delete/:id", blogController.deleteBlog);

// Route to get a single blog post by ID
// router.get("/:id", blogController.getBlogById);

// Route to get a single blog post by slug
router.get("/:slug", blogController.getBlogBySlug);

// Route to update a blog post by ID
router.put("/update/:id", blogController.updateBlog);



module.exports = router;