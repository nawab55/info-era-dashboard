import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { ImagePlus, X, Loader2 } from "lucide-react";
import api from "../../config/api";
import { useLocation, useNavigate } from "react-router-dom";

const PostBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [slug, setSlug] = useState("");
  const [keywords, setKeywords] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [publisher, setPublisher] = useState(
    "Info Era Software Services Pvt. Ltd."
  );
  const [author, setAuthor] = useState("Info Era Software Services Pvt. Ltd.");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [blogId, setBlogId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state?.blog;

  // Check for blog data from navigation and populate form
  useEffect(() => {
    if (blog) {
      setEditMode(true);
      setBlogId(blog._id);
      setTitle(blog.title);
      setDescription(blog.description);
      setImage(blog.image);
      setSlug(blog.slug);
      setKeywords(blog.keywords);
      setMetaDescription(blog.metaDescription);
      setPublisher(blog.publisher);
      setAuthor(blog.author);
    }
  }, [blog]);

  // Configure self-hosted TinyMCE
  const editorConfig = {
    selector: "textarea",
    height: 500,
    menubar: "file edit view insert format tools table help",
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "code",
      "help",
      "wordcount",
      "autoresize",
      "autosave",
      "imagetools",
      "codesample"
    ],
    toolbar: [
      "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify",
      "bullist numlist outdent indent | table | image media | fullscreen code"
    ].join(" | "),
    // content_style:
    //   "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
    content_style: `
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: #374151;
        padding: 1rem;
      }
    `,
    skin_url: "/tinymce/skins/ui/oxide",
    content_css: "/tinymce/skins/content/default/content.css",
    images_upload_handler: async (blobInfo) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blobInfo.blob());
        reader.onload = () => resolve(reader.result);
      });
    },
    branding: false,
    promotion: false,
    resize: false,
    min_height: 500,
    max_height: 500,
    autoresize_bottom_margin: 0
  };

  // Convert title to slug format
  const generateSlug = (slug) => {
    return slug
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };
  const handleSlugChange = (e) => {
    const newSlug = e.target.value;
    setSlug(generateSlug(newSlug));
  };

  // Handle featured image upload (Base64)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const blogData = {
        title,
        description,
        image,
        slug,
        keywords,
        metaDescription,
        publisher,
        author
      };
      if (editMode && blogId) {
        // Update existing blog post
        const response = await api.put(`/api/blogs/update/${blogId}`, blogData);
        if (response.status === 200) {
          toast.success("Blog post updated successfully!");
          navigate("/hr/blog-list"); // Redirect to blog list
        }
      } else {
        // Create new blog post
        const response = await api.post("/api/blogs/create", blogData);
        if (response.status === 201) {
          toast.success("Blog post created successfully!");
          setTitle("");
          setDescription("");
          setImage("");
          setSlug("");
          setKeywords("");
          setMetaDescription("");
          setPublisher("Info Era Software Services Pvt. Ltd.");
          setAuthor("Info Era Software Services Pvt. Ltd.");
        }
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error(
        `Failed to ${editMode ? "update" : "create"} blog: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen px-4 py-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto">
          <div className="overflow-hidden bg-white border rounded-2xl">
            <div className="px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600">
              <h1 className="text-3xl font-bold text-white md:text-4xl">
                {editMode ? "Edit Blog Post" : "Create Your Blog Post"}
              </h1>
              <p className="mt-2 text-indigo-100">
                {editMode
                  ? "Update your blog content"
                  : "Share your thoughts with the world"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-6">
                {/* Title Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 transition-all duration-200 border border-gray-200 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:outline-none focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter an engaging title..."
                    required
                    disabled={loading}
                  />
                </div>

                {/* SEO Fields */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={handleSlugChange}
                    className="w-full px-4 py-3 transition-all duration-200 border border-gray-200 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:outline-none focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter a slug for SEO..."
                    required
                    disabled={loading}
                  />
                </div>
                {/* Keywords Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full px-4 py-3 transition-all duration-200 border border-gray-200 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:outline-none focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter keywords separated by commas example: web development, react, javascript..."
                    required
                    disabled={loading}
                  />
                </div>
                {/* Meta Description Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Meta Description
                  </label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="w-full px-4 py-3 transition-all duration-200 border border-gray-200 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:outline-none focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter meta description..."
                    required
                    disabled={loading}
                  />
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Featured Image
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-3 transition-all duration-200 border border-gray-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                        required
                        disabled={loading}
                      />
                      <ImagePlus className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2" />
                    </div>
                    {image && (
                      <div className="relative flex-shrink-0">
                        <img
                          src={image}
                          alt="Preview"
                          className="object-cover w-32 h-32 shadow-lg rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => setImage("")}
                          className="absolute flex items-center justify-center w-6 h-6 text-white transition-colors bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Editor */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <div className="overflow-hidden border border-gray-200 rounded-xl">
                    <Editor
                      init={editorConfig}
                      value={description}
                      onEditorChange={(content) => setDescription(content)}
                      tinymceScriptSrc="/tinymce/tinymce.min.js"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    w-full py-3 px-6 rounded-xl text-white font-semibold
                    transition-all duration-300 flex items-center justify-center
                    ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                    }
                  `}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{editMode ? "Updating..." : "Publishing..."}</span>
                    </div>
                  ) : (
                    <span>{editMode ? "Update Post" : "Publish Post"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostBlog;



// import { useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";
// import { toast } from "react-toastify";
// import api from "../../config/api";

// const PostBlog = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Configure self-hosted TinyMCE
//   const editorConfig = {
//     selector: "textarea",
//     height: 500,
//     menubar: "file edit view insert format tools table help",
//     plugins: [
//       "advlist",
//       "autolink",
//       "lists",
//       "link",
//       "image",
//       "charmap",
//       "preview",
//       "anchor",
//       "searchreplace",
//       "visualblocks",
//       "code",
//       "fullscreen",
//       "insertdatetime",
//       "media",
//       "table",
//       "code",
//       "help",
//       "wordcount",
//       "autoresize",
//       "autosave",
//       "imagetools",
//       "codesample"
//     ],
//     toolbar: [
//       "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify",
//       "bullist numlist outdent indent | table | image media | fullscreen code"
//     ].join(" | "),
//     content_style:
//       "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
//     skin_url: "/tinymce/skins/ui/oxide",
//     content_css: "/tinymce/skins/content/default/content.css",
//     images_upload_handler: async (blobInfo) => {
//       return new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(blobInfo.blob());
//         reader.onload = () => resolve(reader.result);
//       });
//     },
//     branding: false,
//     promotion: false
//   };

//   // Handle featured image upload (Base64)
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setImage(reader.result);
//       reader.readAsDataURL(file);
//     }

//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await api.post("/api/blogs", {
//         title,
//         description,
//         image
//       });

//       if (response.status === 201) {
//         toast.success("Blog post created successfully!");
//         setTitle("");
//         setDescription("");
//         setImage("");
//       }
//     } catch (error) {
//       console.error("Error creating blog:", error);
//       toast.error(`Failed to create blog post. ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container max-w-4xl p-4 mx-auto">
//       <h1 className="mb-6 text-3xl font-bold text-center">Create Blog Post</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Title Input */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Title
//           </label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>

//         {/* Featured Image Input */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Featured Image
//           </label>
//           <div className="flex items-center gap-4 mt-1">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="block w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//               required
//             />
//             {image && (
//               <img
//                 src={image}
//                 alt="Preview"
//                 className="object-cover w-32 h-32 rounded shadow"
//               />
//             )}
//           </div>
//         </div>

//         {/* Editor */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Content
//           </label>
//           <Editor
//             init={editorConfig}
//             value={description}
//             onEditorChange={(content) => setDescription(content)}
//             tinymceScriptSrc="/tinymce/tinymce.min.js"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full p-2 text-white transition duration-300 bg-blue-600 rounded hover:bg-blue-700"
//         >
//           {loading ? "Publishing..." : "Publish Post"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PostBlog;

