import { useState, useEffect } from "react";
import api from "../../../config/api";
import { toast } from "react-toastify";

const PostJob = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    experience: "",
    description: "",
  });

  const [jobs, setJobs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Fetch all jobs from backend
    const fetchJobs = async () => {
      try {
        const response = await api.get("/api/jobs/get-all-jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };

    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing job
        await api.put(`/api/jobs/${editingId}`, formData);
        setIsEditing(false);
        setEditingId(null);
        toast.warn("Job Data Updated successfully");
      } else {
        // Create a new job
        await api.post("/api/jobs/post-job", formData);
        toast.success("Post created successfully for job");
      }

      // Reset the form
      setFormData({
        jobTitle: "",
        experience: "",
        description: "",
      });

      // Fetch the updated jobs list
      const response = await api.get("/api/jobs/get-allJob");
      setJobs(response.data);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleEdit = (job) => {
    setIsEditing(true);
    setEditingId(job._id);
    setFormData({
      jobTitle: job.jobTitle,
      experience: job.experience,
      description: job.description,
    });
  };

  const handleDelete = async (jobId) => {
    try {
      await api.delete(`/api/jobs/${jobId}`);
      toast.success("Job Deleted Successfully");
      // Fetch the updated jobs list
      const response = await api.get("/api/jobs/get-allJob");
      setJobs(response.data);
    } catch (error) {
      console.error("Error deleting job", error);
    }
  };

  return (
    <section className="md:ml-60 bg-inherit p-4 pb-8 -mt-4">
      <div
        className="max-w-full overflow-y-auto bg-white p-8 mx-4 rounded-lg shadow-md"
        style={{ height: "600px", color: "green", border: "1px solid white" }}
      >
        <h2 className="text-2xl font-semibold text-gray-500 mb-4">
          {isEditing ? "Update Job" : "Post Job"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Experience</label>
            <input
              type="text"
              name="experience"
              placeholder="Experience"
              value={formData.experience}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-sm font-normal leading-6 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:translate-x-1 transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="col-span-full flex justify-center pt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transform hover:-translate-y-1 transition-transform duration-300"
            >
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </form>

        {/* Display Jobs in a Table */}
        <div className="mt-8">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-slate-300">
              <tr>
                <th className="px-4 py-2 border">S.No</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Experience</th>
                <th className="px-4 py-2 border">Update</th>
                <th className="px-4 py-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr
                  key={job._id}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{job.jobTitle}</td>
                  <td className="px-4 py-2 border">{job.description}</td>
                  <td className="px-4 py-2 border">{job.experience}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleEdit(job)}
                      className="px-4 py-2 bg-yellow-400 text-white rounded-lg shadow-md hover:bg-yellow-500 transform hover:-translate-y-1 transition-transform duration-300"
                    >
                      Update
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transform hover:-translate-y-1 transition-transform duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PostJob;
