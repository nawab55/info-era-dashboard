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
      if (editMode && blogId) {
        // Update existing blog post
        const response = await api.put(`/api/blogs/update/${blogId}`, {
          title,
          description,
          image
        });
        if (response.status === 200) {
          toast.success("Blog post updated successfully!");
          navigate("/hr/blog-list"); // Redirect to blog list
        }
      } else {
        // Create new blog post
      const response = await api.post("/api/blogs/create", {
        title,
        description,
        image
      });

      if (response.status === 201) {
        toast.success("Blog post created successfully!");
        setTitle("");
        setDescription("");
        setImage("");
      }
    }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error(
        `Failed to ${editMode ? "update" : "create"} blog post: ${
          error.message
        }`
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

//incgonito chatgpt
// import { useState } from "react";
// import { JoditEditor } from "jodit-react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const PostBlog = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [editorContent, setEditorContent] = useState("");

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({ ...formData, image: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post("/api/posts", {
//         ...formData,
//         description: editorContent
//       });
//       toast.success("Blog post created successfully!");
//       setFormData({ title: "", description: "", image: "" });
//       setEditorContent(""); // Clear the editor content
//     } catch (err) {
//       toast.error("Failed to create post. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="mb-8 text-3xl font-bold text-center text-gray-900">
//           Create New Blog Post
//         </h1>

//         <form
//           onSubmit={handleSubmit}
//           className="px-8 pt-6 pb-8 mb-4 bg-white border border-gray-300 rounded-lg"
//         >
//           <div className="mb-6">
//             <label className="block mb-2 text-sm font-semibold text-gray-700">
//               Title
//             </label>
//             <input
//               type="text"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block mb-2 text-sm font-semibold text-gray-700">
//               Featured Image
//             </label>
//             <div className="flex items-center justify-center w-full">
//               <label className="flex flex-col w-full h-32 transition-all border-4 border-dashed rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-100">
//                 {formData.image ? (
//                   <img
//                     src={formData.image}
//                     alt="Preview"
//                     className="object-cover w-full h-full rounded-lg"
//                   />
//                 ) : (
//                   <div className="flex flex-col items-center justify-center pt-7">
//                     <svg
//                       className="w-8 h-8 text-gray-400"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       />
//                     </svg>
//                     <p className="pt-1 text-sm text-gray-500">
//                       Upload an image
//                     </p>
//                   </div>
//                 )}
//                 <input
//                   type="file"
//                   onChange={handleImageUpload}
//                   className="opacity-0"
//                   accept="image/*"
//                   required
//                 />
//               </label>
//             </div>
//           </div>

//           <div className="mb-8">
//             <label className="block mb-2 text-sm font-semibold text-gray-700">
//               Content
//             </label>
//             <JoditEditor
//               value={editorContent}
//               onChange={(newContent) => setEditorContent(newContent)}
//               config={{
//                 readonly: false, // Whether the editor is read-only
//                 toolbar: true, // Enable toolbar with various options
//                 toolbarButtons: [
//                   "bold",
//                   "italic",
//                   "underline",
//                   "strikethrough",
//                   "superscript",
//                   "subscript",
//                   "|",
//                   "font",
//                   "fontsize",
//                   "|",
//                   "align",
//                   "list",
//                   "|",
//                   "link",
//                   "image",
//                   "table",
//                   "|",
//                   "undo",
//                   "redo",
//                   "|",
//                   "fullsize"
//                 ],
//                 uploader: {
//                   insertImageAsBase64URI: true,
//                   // Provide your image upload URL to handle image uploads
//                   url: "/api/upload",
//                   format: "json"
//                 },
//                 filebrowser: {
//                   filebrowserUploadUrl: "/api/upload"
//                 },
//                 height: 400
//               }}
//               className="border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <div className="flex items-center">
//                   <svg
//                     className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Publishing...
//                 </div>
//               ) : (
//                 "Publish Post"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostBlog;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Editor } from "@tinymce/tinymce-react";
// import axios from "axios";

// const PostBlog = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");
//   const navigate = useNavigate();

//   // Initialize TinyMCE script
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "/tinymce/tinymce.min.js";
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   // Handle Image Upload (Featured Image)
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImage(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   // Handle Editor Image Upload
//   const handleEditorImageUpload = async (blobInfo) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         resolve(reader.result);
//       };
//       reader.onerror = () => {
//         reject("Failed to read file");
//       };
//       reader.readAsDataURL(blobInfo.blob());
//     });
//   };

//   // Handle Form Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/blogs", {
//         title,
//         description,
//         image
//       });
//       navigate("/blogs");
//     } catch (error) {
//       console.error("Error creating blog:", error);
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
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="block w-full mt-1"
//             required
//           />
//           {image && (
//             <img
//               src={image}
//               alt="Preview"
//               className="object-cover w-64 h-64 mt-2 rounded"
//             />
//           )}
//         </div>

//         {/* Description Editor with Self-hosted Configuration */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Description
//           </label>
//           <Editor
//             value={description}
//             onEditorChange={(content) => setDescription(content)}
//             init={{
//               height: 500,
//               menubar: "file edit view insert format tools table help",
//               plugins: [
//                 "advlist",
//                 "autolink",
//                 "lists",
//                 "link",
//                 "image",
//                 "charmap",
//                 "preview",
//                 "anchor",
//                 "searchreplace",
//                 "visualblocks",
//                 "code",
//                 "fullscreen",
//                 "insertdatetime",
//                 "media",
//                 "table",
//                 "code",
//                 "help",
//                 "wordcount",
//                 "autoresize",
//                 "autosave",
//                 "imagetools",
//                 "codesample"
//               ],
//               toolbar: [
//                 "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify",
//                 "bullist numlist outdent indent | table image link | fullscreen code | removeformat help"
//               ],
//               content_style:
//                 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 14px }',
//               table_default_styles: {
//                 "border-collapse": "collapse",
//                 width: "100%"
//               },
//               table_default_attributes: {
//                 border: "1"
//               },
//               table_class_list: [
//                 { title: "None", value: "" },
//                 { title: "Basic Table", value: "table" },
//                 { title: "Striped", value: "table table-striped" }
//               ],
//               images_upload_handler: handleEditorImageUpload,
//               image_advtab: true,
//               image_title: true,
//               automatic_uploads: true,
//               file_picker_types: "image",
//               branding: false,
//               resize: false,
//               statusbar: true,
//               // Self-hosted configuration
//               base_url: "/tinymce",
//               suffix: ".min",
//               content_css: "/tinymce/skins/content/default/content.min.css",
//               skin_url: "/tinymce/skins/ui/oxide"
//             }}
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full p-2 text-white transition duration-300 bg-blue-600 rounded hover:bg-blue-700"
//         >
//           Submit Blog
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PostBlog;
