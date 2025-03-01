const Blog = require("../../models/blog/blog.model");

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const { title, description, image, slug, keywords, metaDescription, publisher, author } = req.body;
    // console.log(title, description, image);

    if (!title || !description || !image || !slug || !keywords || !metaDescription) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newBlog = new Blog({ title, description, image, slug, keywords, metaDescription, publisher, author });
    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully!", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// get all blog posts
const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    // console.log('Received params:', { page, limit, search });
    const skip = (page - 1) * limit;

    const query = search
      ? { title: { $regex: search, $options: 'i' } } // Case-insensitive search on title
      : {};
    // console.log("query:", query);

    const totalBlogs = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      blogs,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: parseInt(page),
    });


    // How It Works with Limit:
    // Frontend Request Example: GET /api/blogs/all?search=react&page=1&limit=5
    // Backend Execution Flow:
      //  1. Create search query:
         // { title: { $regex: /react/i } }
      // 2. Calculate skip:
          // skip = (1 - 1) * 5 = 0
      // 3. Execute database query:
     //   Blog.find({ title: /react/i }).skip(0).limit(5)

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs", error: error.message });
  }
};

// Get a single blog post by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog", error: error.message });
  }
};

// Get a single blog post by slug
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog", error: error.message });
  }
};

// Update a blog post by ID
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, slug, keywords, metaDescription, } = req.body;
    if (!title || !description || !image ||!slug || !keywords || !metaDescription ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description, image, slug, keywords, metaDescription },
      { new: true, runValidators: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found!" });
    }
    res.status(200).json({ message: "Blog updated successfully!", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Failed to update blog", error: error.message });
  }
};

// Delete a blog post by ID
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    res.status(200).json({ message: "Blog deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog", error: error.message });
  }
};  

module.exports = { createBlog, getAllBlogs, getBlogById, getBlogBySlug, updateBlog, deleteBlog };
