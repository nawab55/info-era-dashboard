import { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  FileText,
  Loader,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { API_BASE_URL } from "../../../config/api";
import axios from "axios";
import { toast } from "react-toastify";

const JobPostingInterface = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    experience: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/api/jobs/get-all-jobs`,
          {
            params: { page, limit: 10 },
          }
        );
        const { jobs, totalPages } = response.data;
        setJobs(jobs);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing job
        await axios.put(`${API_BASE_URL}/api/jobs/${editingJobId}`, formData);
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === editingJobId ? { ...job, ...formData } : job
          )
        );
        toast.success("Job updated successfully!");
        setIsEditing(false);
      } else {
        // Add new job
        const response = await axios.post(
          `${API_BASE_URL}/api/jobs/post-job`,
          formData
        );
        setJobs((prevJobs) => [...prevJobs, response.data.job]);
        toast.success("Job created successfully!");
      }

      // Reset form
      setFormData({
        jobTitle: "",
        experience: "",
        description: "",
      });
      setEditingJobId(null);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error submitting job:", error);
    }
  };

  const handleEdit = (job) => {
    setFormData({
      jobTitle: job.jobTitle,
      experience: job.experience,
      description: job.description,
    });
    setIsEditing(true);
    setEditingJobId(job._id);
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/jobs/${jobId}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete job. Please try again.");
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white border">
        {/* Form Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FileText className="mr-3 text-gray-500" size={24} />
              {isEditing ? "Update Job Listing" : "Create Job Listing"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Enter job title"
                  className="w-full px-3 py-2 border border-gray-300 transition-shadow rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Years of experience"
                  className="w-full px-3 py-2 border border-gray-300 transition-shadow rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the job responsibilities"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 resize-none transition-shadow  rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 outline-none focus:ring-2 focus:ring-blue-800 flex items-center"
              >
                <Plus className="mr-2" size={18} />
                {isEditing ? "Update Job" : "Create Job"}
              </button>
            </div>
          </form>
        </div>

        {/* Jobs Table */}
        <div className="lg:p-4 p-2">
          <h3 className="text-lg font-semibold text-gray-800">Job Listings</h3>
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader size={48} className="animate-spin text-gray-500" />
              <span className="ml-4 text-gray-500 text-lg">
                Loading data...
              </span>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No job listings found. Create your first job posting!
            </div>
          ) : (
            <div className="overflow-x-auto pb-10">
              <table className="w-full  bg-white rounded border">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {jobs.map((job) => (
                    <tr key={job._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="font-medium text-gray-900">
                          {job.jobTitle}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {job.description}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {job.experience}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(job)}
                            className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Pagination */}
        <div className="flex justify-between items-center py-4">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className="flex items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <span className="mx-2 text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            className="flex items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPostingInterface;
