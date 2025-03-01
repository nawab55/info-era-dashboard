/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import { Search, FileX, Trash2, Edit } from "lucide-react";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import DeleteModal from "../../Components/Modal/DeleteModal";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const limit = 6; // Blogs per page

  const navigate = useNavigate();

  const fetchBlogs = async (pageNum = 1, searchQuery = "") => {
    setLoading(true);
    try {
      const response = await api.get("/api/blogs/all", {
        params: { page: pageNum, limit, search: searchQuery }
      });
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
      setPage(response.data.currentPage);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce function to optimize search calls
  const debouncedFetch = useCallback(
    debounce((searchValue) => {
      fetchBlogs(1, searchValue);
    }, 500), // 500ms delay
    []
  );

  useEffect(() => {
    fetchBlogs(page, search);
  }, [page]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setPage(1);
    debouncedFetch(value);
  };
  // Open delete modal
  const confirmDelete = (blog) => {
    setBlogToDelete(blog);
    setDeleteModal(true);
  };

  // Delete blog function
  const handleDelete = async () => {
    if (!blogToDelete) return;

    try {
      await api.delete(`/api/blogs/delete/${blogToDelete._id}`);
      setBlogs(blogs.filter((b) => b._id !== blogToDelete._id));
      toast.success("Blog post deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog post");
    } finally {
      setDeleteModal(false);
      setBlogToDelete(null);
    }
  };

  // Redirect to edit page with blog data
  const handleEdit = (blog) => {
    navigate(`/hr/add-blog`, { state: { blog } });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <div className="min-h-screen px-4 py-4 bg-gradient-to-br from-gray-50 to-gray-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="p-2 text-4xl font-bold text-transparent text-gray-900 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text">
              Blog Posts List
            </h1>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search blogs by title..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            </div>
          )}

          {/* No Blogs Found */}
          {!loading && blogs.length === 0 && (
            <div className="py-16 text-center">
              <FileX className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-600">No blogs found</p>
            </div>
          )}

          {/* Blog List */}
          {!loading && blogs.length > 0 && (
            <div className="overflow-hidden bg-white border border-gray-200 rounded-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse table-auto">
                  <thead className="bg-indigo-50">
                    <tr className="text-indigo-900 bg-indigo-50">
                      <th className="px-3 py-4 font-semibold">Image</th>
                      <th className="px-3 py-4 font-semibold">Title</th>
                      {/* <th className="px-3 py-4 font-semibold">Content</th> */}
                      <th className="px-3 py-4 font-semibold">Keywords</th>
                      <th className="px-3 py-4 font-semibold text-nowrap">Meta Description</th>
                      <th className="px-3 py-4 font-semibold">Author</th>
                      <th className="px-3 py-4 font-semibold">Date</th>
                      <th className="px-3 py-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {blogs.map((blog) => (
                      <tr
                        key={blog._id}
                        className="transition-colors duration-200 bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-3 py-4">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="object-cover w-16 h-16 rounded-lg shadow-sm"
                          />
                        </td>
                        <td className="px-3 py-4 font-medium text-gray-900">
                          {blog.title}
                        </td>
                        {/* <td className="max-w-md px-6 py-4 text-gray-700 truncate">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: blog.description
                            }}
                          />
                        </td> */}
                        <td className="px-3 py-4 text-gray-500">
                          {blog.keywords}
                        </td>
                        <td className="px-3 py-4 text-gray-500">
                          {blog.metaDescription}
                        </td>
                        <td className="px-3 py-4 text-gray-500">
                          {blog.author}
                        </td>
                        <td className="px-3 py-4 text-gray-500 text-nowrap">
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric"
                            }
                          )}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleEdit(blog)}
                              className="p-2 text-blue-600 transition-all duration-200 rounded-lg hover:bg-blue-100"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => confirmDelete(blog)}
                              className="p-2 text-red-600 transition-all duration-200 rounded-lg hover:bg-red-100"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagination */}
          {!loading && blogs.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  page === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                        page === pageNum
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  page === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
      />
    </>
  );
};

export default BlogList;

// <div className="min-h-screen px-4 py-4 bg-gradient-to-br from-gray-50 to-gray-100 sm:px-6 lg:px-8">
//   <div className="mx-auto max-w-7xl">
//     {/* Header */}
//     <div className="mb-12 text-center">
//       <h1 className="p-2 text-4xl font-bold text-transparent text-gray-900 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text">
//         Blog Posts
//       </h1>
//       <p className="mt-2 text-gray-600">
//         Explore all our latest blog entries
//       </p>
//     </div>

//     {/* Search Bar */}
//     <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-8">
//       <div className="relative">
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search blogs by title..."
//           className="w-full px-4 py-3 pl-12 transition-all duration-200 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:outline-none focus:ring-indigo-500 focus:border-transparent"
//         />
//         <button
//           type="submit"
//           className="absolute transform -translate-y-1/2 left-3 top-1/2"
//         >
//           <Search className="w-5 h-5 text-gray-500" />
//         </button>
//       </div>
//     </form>

//     {/* Loader */}
//     {loading && (
//       <div className="flex items-center justify-center h-64">
//         <div className="relative">
//           <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
//           {/* <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-indigo-200 to-transparent animate-pulse" /> */}
//         </div>
//       </div>
//     )}

//     {/* Blog List */}
//     {!loading && blogs.length === 0 && (
//       <div className="py-16 text-center">
//         <FileX className="w-16 h-16 mx-auto mb-4 text-gray-400" />
//         <p className="text-xl text-gray-600">No blogs found</p>
//       </div>
//     )}

//     {!loading && blogs.length > 0 && (
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="text-indigo-900 bg-indigo-50">
//               <th className="px-6 py-4 font-semibold">Image</th>
//               <th className="px-6 py-4 font-semibold">Title</th>
//               <th className="px-6 py-4 font-semibold">Content</th>
//               <th className="px-6 py-4 font-semibold">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {blogs.map((blog) => (
//               <tr
//                 key={blog._id}
//                 className="transition-colors duration-200 bg-white border-b hover:bg-gray-50"
//               >
//                 <td className="px-6 py-4">
//                   <img
//                     src={blog.image}
//                     alt={blog.title}
//                     className="object-cover w-16 h-16 rounded-lg shadow-sm"
//                   />
//                 </td>
//                 <td className="px-6 py-4 font-medium text-gray-900">
//                   {blog.title}
//                 </td>
//                 <td className="max-w-md px-6 py-4 text-gray-700 truncate">
//                   <div
//                     dangerouslySetInnerHTML={{ __html: blog.description }}
//                   />
//                 </td>
//                 <td className="px-6 py-4 text-gray-500">
//                   {new Date(blog.createdAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     )}

//     {/* Pagination */}
//     {!loading && blogs.length > 0 && (
//       <div className="flex items-center justify-center gap-4 mt-8">
//         <button
//           onClick={() => handlePageChange(page - 1)}
//           disabled={page === 1}
//           className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//             page === 1
//               ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//               : "bg-indigo-600 text-white hover:bg-indigo-700"
//           }`}
//         >
//           Previous
//         </button>

//         <div className="flex gap-2">
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//             (pageNum) => (
//               <button
//                 key={pageNum}
//                 onClick={() => handlePageChange(pageNum)}
//                 className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                   page === pageNum
//                     ? "bg-indigo-600 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {pageNum}
//               </button>
//             )
//           )}
//         </div>

//         <button
//           onClick={() => handlePageChange(page + 1)}
//           disabled={page === totalPages}
//           className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//             page === totalPages
//               ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//               : "bg-indigo-600 text-white hover:bg-indigo-700"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     )}
//   </div>
// </div>
