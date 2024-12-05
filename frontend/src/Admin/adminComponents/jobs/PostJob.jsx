import { useState } from 'react';
import { Plus, Edit2, Trash2, FileText } from 'lucide-react';

const JobPostingInterface = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    experience: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing job
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job._id === editingJobId 
            ? { ...job, ...formData } 
            : job
        )
      );
      setIsEditing(false);
    } else {
      // Add new job
      const newJob = {
        ...formData,
        _id: Date.now().toString()
      };
      setJobs(prevJobs => [...prevJobs, newJob]);
    }
    
    // Reset form
    setFormData({
      jobTitle: '',
      experience: '',
      description: ''
    });
    setEditingJobId(null);
  };

  const handleEdit = (job) => {
    setFormData({
      jobTitle: job.jobTitle,
      experience: job.experience,
      description: job.description
    });
    setIsEditing(true);
    setEditingJobId(job._id);
  };

  const handleDelete = (jobId) => {
    setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
  };

  return (
    <div className="flex-1 px-4 py-8">
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
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Job Listings</h3>
        </div>
        
        {jobs.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No job listings found. Create your first job posting!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">{job.jobTitle}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{job.description}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{job.experience}</td>
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
    </div>
  </div>
  );
};

export default JobPostingInterface;