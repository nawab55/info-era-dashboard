import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon, EyeIcon, EditIcon, TrashIcon } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../../config/api";
import PropTypes from "prop-types"


import { X, Upload } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  activities 
}) => {
  const [formData, setFormData] = useState({
    title: activities?.title || "",
    image: activities?.image || null,
  });
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);

  // Update form when activities prop changes
  useEffect(() => {
    setFormData({
      title: activities?.title || "",
      image: activities?.image || null
    });
    setPreview(activities?.image || null);
  }, [activities]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, image: file });
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(e, formData);
    
    // Reset form after submission
    setFormData({ title: "", image: null });
    setPreview(null);
  };

  const resetModal = () => {
    onClose();
    setTimeout(()=>{
      setFormData({ title: "", image: null });
      setPreview(null);
    },200)
  };

  return (
    <div 
    className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity bg-black/40 backdrop-blur-sm animate-fade-in ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onClick={resetModal}
    >
      <div 
        className={`w-full max-w-md mx-4 bg-white rounded-xl shadow-2xl border border-gray-200 relative transition-transform duration-300 ease-in-out hover:shadow-lg ${isOpen ? "scale-100":"scale-95"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={resetModal} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold bg-gradient-to-l from-blue-400 to-indigo-600 text-transparent bg-clip-text mb-6 text-center">
            Update Activity
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="title" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter activity title"
                className="w-full px-4 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
                required
              />
            </div>

            <label
              htmlFor="fileInput"
              className={`
                block w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer 
                transition-all duration-200
                ${dragOver 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-500'
                }
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="fileInput"
                name="image"
                onChange={handleChange}
                className="hidden"
                accept="image/*"
              />
              
              {preview && (
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="mx-auto h-32 w-32 object-cover rounded-lg mb-4" 
                />
              )}
              
              <div className="flex flex-col items-center text-gray-500">
                <Upload className="w-10 h-10 mb-2" />
                <p>Drag and drop an image or click to upload</p>
                <span className="text-xs text-gray-400 mt-1">
                  PNG, JPG up to 10MB
                </span>
              </div>
            </label>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={resetModal}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  activities: PropTypes.object, // Optional prop for existing activity data
}

const Activity = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch activities on component mount
  const fetchActivities = async () => {
    try {
      const response = await api.get("/api/activities/get-all-activities");
      const activitiesData = response.data.activities;

      if (Array.isArray(activitiesData)) {
        setActivities(activitiesData);
      } else {
        console.error("Unexpected data format:", activitiesData);
        toast.error("Unexpected data format");
        setActivities([]);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
      toast.error("Failed to fetch activities");
      setActivities([]);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Delete activity handler
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/activities/delete-activity/${id}`);
      toast.success("Activity deleted successfully");
      fetchActivities();
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error("Failed to delete activity");
    }
  };

  // Modal open and close handlers
  const openModal = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedActivity(null);
    }, 200);
  };

  // Update activity handler
  const handleUpdateActivity = async (e, formData) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    if (selectedActivity.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await api.put(
        `/api/activities/update-activity/${selectedActivity._id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Activity updated successfully");
      fetchActivities();
      closeModal();
    } catch (error) {
      console.error("Error updating activity:", error);
      toast.error("Failed to update activity");
    }
  };

  return (
    <div className="min-h-screen max-w-full flex-1 bg-gray-50 lg:p-6 p-2">
      <div className="max-w-6xl mx-auto bg-white rounded border overflow-hidden">
        {/* Header Section */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h1 className="text-3xl font-semibold text-gray-800">Activities</h1>
          <button
            onClick={() => navigate("/admin/add-activity")}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add New</span>
          </button>
        </div>

        {/* Activities Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="text-nowrap">
                {["#", "Title", "Date", "Image", "Actions"].map((header) => (
                  <th
                    key={header}
                    className="px-4 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activities.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No activities found
                  </td>
                </tr>
              ) : (
                activities.map((activity, index) => (
                  <tr
                    key={activity._id}
                    className="hover:bg-gray-50 border text-nowrap transition-colors"
                  >
                    <td className="px-4 py-3 text-sm border text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm border text-gray-900">
                      {activity.title}
                    </td>
                    <td className="px-4 py-3 text-sm border text-gray-500">
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      {activity.image && (
                        <button
                          onClick={() => window.open(activity.image, "_blank")}
                          className="text-blue-500 mx-auto hover:text-blue-700"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 flex border justify-center gap-4">
                      <button
                        onClick={() => openModal(activity)}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <EditIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(activity._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onSubmit={(e, formData) => handleUpdateActivity(e, formData)}
        onClose={() => setIsModalOpen(false)}
        activities={selectedActivity || {}}
      />
    </div>
  );
};

export default Activity;
